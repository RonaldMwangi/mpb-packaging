import { CheckCircle2 } from "lucide-react";

export default function SurveySuccess() {
  return <section className="survey-success" aria-labelledby="survey-success-title">
    <CheckCircle2 size={40} aria-hidden="true" />
    <h2 id="survey-success-title" tabIndex={-1}>Thank you for sharing your feedback.</h2>
    <p>Your feedback helps us continue improving our products, service and customer experience.</p>
    <a className="btn-primary" href="/">Return to MPB Website</a>
  </section>;
}
