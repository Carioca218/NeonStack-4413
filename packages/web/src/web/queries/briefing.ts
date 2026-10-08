import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useCreateBriefing() {
  return useMutation(orpc.briefing.create.mutationOptions());
}
