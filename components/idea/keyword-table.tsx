"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { IdeaKeyword } from "@/types/idea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function KeywordTable({ keywords }: { keywords: IdeaKeyword[] }) {
  const columns = useMemo<ColumnDef<IdeaKeyword>[]>(
    () => [
      {
        accessorKey: "keyword",
        header: "Keyword",
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "searchVolume",
        header: () => <span className="text-right">Volume</span>,
        cell: ({ getValue }) => (
          <span className="block text-right tabular-nums">
            {(getValue() as number).toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "growthPercent",
        header: () => <span className="text-right">Growth</span>,
        cell: ({ getValue }) => {
          const v = getValue() as number | null | undefined;
          return (
            <span className="block text-right tabular-nums text-muted-foreground">
              {v == null ? "—" : `${v > 0 ? "+" : ""}${v}%`}
            </span>
          );
        },
      },
      {
        accessorKey: "difficultyScore",
        header: () => <span className="text-right">Difficulty</span>,
        cell: ({ getValue }) => {
          const v = getValue() as number | null | undefined;
          return (
            <span className="block text-right tabular-nums text-muted-foreground">
              {v == null ? "—" : v}
            </span>
          );
        },
      },
      {
        accessorKey: "source",
        header: "Source",
        cell: ({ getValue }) => (
          <span className="text-muted-foreground">{getValue() as string}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: keywords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-border/80">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id} className="whitespace-nowrap">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
