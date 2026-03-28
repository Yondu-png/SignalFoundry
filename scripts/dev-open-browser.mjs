// Starts next dev and opens the default browser when the server is ready (npm run dev:open).
import { exec, spawn } from "node:child_process";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT ?? "3000";
const url = `http://127.0.0.1:${port}`;
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextCli, "dev"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env },
});

let childExited = false;

let opened = false;

function probe() {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function openBrowserOnce() {
  if (opened) return;
  opened = true;
  if (process.platform === "win32") {
    exec(`start "" "${url}"`);
  } else if (process.platform === "darwin") {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
}

async function waitLoop() {
  while (!childExited) {
    if (await probe()) {
      await openBrowserOnce();
      return;
    }
    await new Promise((r) => setTimeout(r, 400));
  }
}

waitLoop().catch(() => {});

function forwardSignal(sig) {
  process.on(sig, () => {
    child.kill(sig);
  });
}
forwardSignal("SIGINT");
forwardSignal("SIGTERM");

child.on("exit", (code, signal) => {
  childExited = true;
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
