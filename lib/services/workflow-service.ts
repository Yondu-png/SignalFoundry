/** AI workflow runs; structured JSON outputs in Phase 3. */
export const WorkflowService = {
  async enqueue(
    _userId: string,
    _ideaId: string,
    _workflowType: string
  ): Promise<{ id: string }> {
    throw new Error("WorkflowService not implemented");
  },
};
