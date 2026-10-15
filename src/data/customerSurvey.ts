export type Rating = 1 | 2 | 3 | 4 | 5;

// Wording verified against Customer Satisfaction Survey MPB.pdf.
export const factoryQuestions = [
  { id: "factory_product_quality", text: "How do you rate the quality of the products you receive from Mombasa Polythene Bags Ltd?" },
  { id: "factory_product_appearance", text: "How do you rate the overall appearance of the product?" },
  { id: "factory_product_performance", text: "Are you happy with the overall performance of the products you received from MPB?" },
] as const;
export const deliveryQuestions = [
  { id: "delivery_correct_documentation", text: "Are deliveries accompanied by correct documentation (e.g. invoice, delivery notes, etc)?" },
  { id: "delivery_invoice_accuracy", text: "Are invoices/statements correct?" },
  { id: "delivery_on_time", text: "Are orders delivered on time as required?" },
  { id: "delivery_condition", text: "Are products delivered in good condition?" },
  { id: "delivery_vehicle_cleanliness", text: "Please rate the cleanliness of the delivery vehicle" },
  { id: "delivery_personnel_hygiene", text: "Please rate the presentation/hygiene of the delivery personnel" },
  { id: "delivery_order_personnel_efficiency", text: "Please rate the efficieny of order personnel" },
  { id: "delivery_personnel_efficiency", text: "Please rate the efficiency of delivery personnel" },
  { id: "delivery_accounts_department", text: "Please rate the debtors/accounts department" },
] as const;
export const salesQuestions = [
  { id: "sales_regular_visits", text: "Do the sales personnel visit you regularly?" },
  { id: "sales_regular_calls", text: "Do the sales personnel call you regularly?" },
  { id: "sales_friendliness", text: "Are the sales personnel friendly?" },
  { id: "sales_knowledge", text: "Are the sales personnel helpful/knowledgeable?" },
  { id: "sales_requirements_met", text: "Are order requirements normally met?" },
  { id: "sales_feedback_followup", text: "Are any additional efforts made to promote customer service following your feedback?" },
  { id: "sales_enquiry_efficiency", text: "Are enquiries handled efficiently and in a timely manner?" },
  { id: "sales_complaint_efficiency", text: "Are complaints handled efficiently and in a timely manner?" },
  { id: "sales_overall_company_rating", text: "Overall rating of the Company?" },
] as const;
export const recommendationQuestion = { id: "recommendation_rating", text: "How likely would you recommend our Company to others?" } as const;
export const surveyQuestions = [...factoryQuestions, ...deliveryQuestions, ...salesQuestions, recommendationQuestion] as const;
export type QuestionId = typeof surveyQuestions[number]["id"];
export type SurveyQuestion = { id: QuestionId; text: string };
export const surveySteps: { title: string; questions: readonly SurveyQuestion[] }[] = [
  { title: "Customer Information", questions: [] },
  { title: "Factory", questions: factoryQuestions },
  { title: "Documentation & Deliveries — Part 1", questions: deliveryQuestions.slice(0, 5) },
  { title: "Documentation & Deliveries — Part 2", questions: deliveryQuestions.slice(5) },
  { title: "Sales — Part 1", questions: salesQuestions.slice(0, 5) },
  { title: "Sales — Part 2", questions: salesQuestions.slice(5) },
  { title: "Recommendation & Additional Feedback", questions: [recommendationQuestion] },
  { title: "Respondent Details + Review", questions: [] },
];
export interface SurveyDraft {
  customer: string;
  productsTaken: string;
  ratings: Partial<Record<QuestionId, Rating>>;
  comments: string;
  respondent: { name: string; designation: string };
  date: string;
}
export interface SurveySubmission {
  customer: string;
  productsTaken: string;
  factory: Record<typeof factoryQuestions[number]["id"], Rating>;
  documentationDeliveries: Record<typeof deliveryQuestions[number]["id"], Rating>;
  sales: Record<typeof salesQuestions[number]["id"], Rating>;
  recommendation: { recommendation_rating: Rating };
  comments: string;
  respondent: { name: string; designation: string };
  date: string;
}
export type SurveyErrors = Record<string, string>;
export function createSurveyDraft(): SurveyDraft {
  const today = new Date();
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return { customer: "", productsTaken: "", ratings: {}, comments: "", respondent: { name: "", designation: "" }, date };
}
export function validateSurveyStep(draft: SurveyDraft, step: number): SurveyErrors {
  const errors: SurveyErrors = {};
  if (step === 0) {
    if (!draft.customer.trim()) errors.customer = "Enter the name of your company or customer.";
    else if (draft.customer.length > 160) errors.customer = "Use no more than 160 characters for the customer name.";
    if (!draft.productsTaken.trim()) errors.productsTaken = "Enter the products you take from MPB.";
    else if (draft.productsTaken.length > 500) errors.productsTaken = "Use no more than 500 characters for products taken.";
  }
  for (const question of surveySteps[step].questions) {
    if (![1, 2, 3, 4, 5].includes(draft.ratings[question.id] ?? 0)) errors[question.id] = "Choose a rating from 1 to 5 for this question.";
  }
  if (step === 6 && draft.comments.length > 2000) errors.comments = "Keep additional comments to 2,000 characters or fewer.";
  if (step === 7) {
    if (draft.respondent.name.length > 100) errors.respondentName = "Use no more than 100 characters for your name.";
    if (draft.respondent.designation.length > 120) errors.designation = "Use no more than 120 characters for your designation.";
    if (draft.date && (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || Number.isNaN(Date.parse(draft.date)) || new Date(draft.date).toISOString().slice(0, 10) !== draft.date)) errors.date = "Enter a valid date, or leave this optional field blank.";
  }
  return errors;
}
export function validateSurvey(draft: SurveyDraft) {
  return surveySteps.flatMap((_, step) => Object.entries(validateSurveyStep(draft, step)).map(([field, message]) => ({ step, field, message })));
}
export function buildSurveySubmission(draft: SurveyDraft): SurveySubmission {
  if (validateSurvey(draft).length) throw new Error("Complete the required survey responses before submitting.");
  function ratings<T extends readonly SurveyQuestion[]>(questions: T): Record<T[number]["id"], Rating> {
    return Object.fromEntries(questions.map(q => [q.id, draft.ratings[q.id]])) as Record<T[number]["id"], Rating>;
  }
  return {
    customer: draft.customer.trim(), productsTaken: draft.productsTaken.trim(),
    factory: ratings(factoryQuestions), documentationDeliveries: ratings(deliveryQuestions), sales: ratings(salesQuestions),
    recommendation: { recommendation_rating: draft.ratings.recommendation_rating! },
    comments: draft.comments.trim(), respondent: { name: draft.respondent.name.trim(), designation: draft.respondent.designation.trim() }, date: draft.date,
  };
}
