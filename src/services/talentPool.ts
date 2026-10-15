import type { TalentPoolSubmission } from "../data/talentPool";

export interface TalentPoolReceipt { accepted: true; reference: string }
export interface TalentPoolService {
  available: boolean;
  submit: (profile: TalentPoolSubmission, signal: AbortSignal) => Promise<TalentPoolReceipt>;
}

// Connect only to an approved same-origin endpoint. No candidate data is stored locally.
export function createTalentPoolService(endpoint?: string): TalentPoolService {
  if (endpoint && (!endpoint.startsWith("/") || endpoint.startsWith("//"))) throw new Error("Use an approved same-origin submission endpoint.");
  return {
    available: Boolean(endpoint),
    async submit(profile, signal) {
      if (!endpoint) throw new Error("Online talent pool submissions are not available yet. Your profile has not been sent. Please check back later.");
      const body = new FormData();
      for (const [key, value] of Object.entries(profile)) {
        if (key !== "cv") body.append(key, typeof value === "string" ? value.trim() : String(value));
      }
      if (profile.cv) body.append("cv", profile.cv, profile.cv.name);
      const response = await fetch(endpoint, { method: "POST", body, signal, credentials: "same-origin" });
      if (!response.ok) throw new Error("We couldn't confirm your submission. Your details remain below. Please try again later.");
      const receipt: unknown = await response.json();
      if (!receipt || typeof receipt !== "object" || !("accepted" in receipt) || receipt.accepted !== true || !("reference" in receipt) || typeof receipt.reference !== "string" || !receipt.reference.trim()) {
        throw new Error("We couldn't confirm receipt of your profile. Your details remain below. Please try again later.");
      }
      return { accepted: true, reference: receipt.reference };
    },
  };
}

// No recruitment backend exists in this project. Keep unavailable until connected.
export const talentPoolService = createTalentPoolService();
