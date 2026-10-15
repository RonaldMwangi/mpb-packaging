export const areasOfInterest = ["Manufacturing", "Design & Prepress", "Sales & Business", "Graduate Opportunities", "Other"] as const;
export const experienceLevels = ["Student / Graduate", "Entry Level", "1–3 Years", "4–7 Years", "8+ Years"] as const;
export const PROFILE_LIMIT = 1500;
export const CV_LIMIT = 5 * 1024 * 1024;

export interface TalentPoolFields {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  area: string;
  experience: string;
  profile: string;
  qualification: string;
  linkedin: string;
  portfolio: string;
  consent: boolean;
}
export interface TalentPoolSubmission extends TalentPoolFields { cv: File | null }
export type TalentPoolErrors = Partial<Record<keyof TalentPoolSubmission, string>>;

export const emptyTalentPoolFields: TalentPoolFields = {
  fullName: "", email: "", phone: "", location: "", area: "", experience: "",
  profile: "", qualification: "", linkedin: "", portfolio: "", consent: false,
};

export function validateTalentPool(values: TalentPoolSubmission): TalentPoolErrors {
  const errors: TalentPoolErrors = {};
  const required = ["fullName", "email", "phone", "location", "area", "experience", "profile"] as const;
  for (const key of required) if (!values[key].trim()) errors[key] = "Please complete this field.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (values.phone && (!/^[+\d\s().-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15)) errors.phone = "Enter a valid phone number, including your country code where needed.";
  if (values.area && !areasOfInterest.some(area => area === values.area)) errors.area = "Choose an area of interest.";
  if (values.experience && !experienceLevels.some(level => level === values.experience)) errors.experience = "Choose your experience level.";
  const limits = { fullName: 100, email: 254, phone: 40, location: 120, profile: PROFILE_LIMIT, qualification: 160, linkedin: 500, portfolio: 500 };
  for (const [key, limit] of Object.entries(limits)) {
    if (String(values[key as keyof TalentPoolFields]).length > limit) errors[key as keyof TalentPoolFields] = `Use no more than ${limit} characters.`;
  }
  for (const key of ["linkedin", "portfolio"] as const) {
    if (!values[key].trim()) continue;
    try {
      const url = new URL(values[key].trim());
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password) throw new Error();
    } catch { errors[key] = "Enter a complete website address starting with https:// or http://."; }
  }
  if (values.cv) {
    const extension = values.cv.name.split(".").at(-1)?.toLowerCase();
    const formats: Record<string, string[]> = {
      pdf: ["application/pdf"], doc: ["application/msword"],
      docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    };
    if (!extension || !formats[extension] || (values.cv.type && values.cv.type !== "application/octet-stream" && !formats[extension].includes(values.cv.type))) errors.cv = "Choose a PDF, DOC or DOCX file.";
    else if (values.cv.size > CV_LIMIT) errors.cv = "Your CV must be 5 MB or smaller.";
    else if (!values.cv.size) errors.cv = "This file is empty. Choose a valid CV.";
  }
  if (!values.consent) errors.consent = "Please give your consent before submitting.";
  return errors;
}
