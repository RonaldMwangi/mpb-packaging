import type { SurveySubmission } from "../data/customerSurvey";

export type SurveyReceipt = { received: true; reference: string };
export interface SurveyService {
  submit: (submission: SurveySubmission, signal: AbortSignal) => Promise<SurveyReceipt>;
}
export class SurveyNotConnectedError extends Error {
  constructor() { super("Survey submission is not yet connected."); }
}

// Replace this adapter with the approved backend integration when available.
// Only return a receipt after the backend confirms persistence of the response.
// No network calls, browser storage, email or credentials are used here.
export const customerSurveyService: SurveyService = {
  async submit() { throw new SurveyNotConnectedError(); },
};
