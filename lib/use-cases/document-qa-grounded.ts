/**
 * Use Case 4: Answer questions based on provided legal documents
 * Provides hallucination-free document Q&A with verbatim clause citations,
 * anchored references, and refusal guardrails when requested information is absent.
 */
import { ContractHealthReport, ChatMessage } from '@/types/legal';
import { answerDocumentQuestion } from '@/lib/legal-engine';
import { sanitizeQueryInput, wrapWithPromptSafetyGuard } from '@/lib/security';

export function answerDocumentQuestionGrounded(
  question: string,
  document: ContractHealthReport
): ChatMessage {
  const cleanQuestion = sanitizeQueryInput(question);
  return answerDocumentQuestion(cleanQuestion, document);
}
