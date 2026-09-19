/**
 * Use Case 5: Help users understand options and potential next steps
 * Provides structured diagnostic decision flows, statutory rights summaries,
 * and formal legal demand letter generators for common disputes.
 */
import { DisputeScenario } from '@/types/legal';
import { DISPUTE_SCENARIOS } from '@/lib/sample-documents';

export function getDisputeOptionsAndNextSteps(scenarioId?: string): {
  scenarios: DisputeScenario[];
  selectedScenario: DisputeScenario;
} {
  const selected = DISPUTE_SCENARIOS.find(s => s.id === scenarioId) || DISPUTE_SCENARIOS[0];
  return {
    scenarios: DISPUTE_SCENARIOS,
    selectedScenario: selected,
  };
}
