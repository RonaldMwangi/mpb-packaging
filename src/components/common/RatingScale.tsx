import { Check } from "lucide-react";
import type { Rating, SurveyQuestion } from "../../data/customerSurvey";
import "./RatingScale.css";

export default function RatingScale({ question, value, onChange, error }: {
  question: SurveyQuestion; value?: Rating; onChange: (value: Rating) => void; error?: string;
}) {
  return <fieldset className="survey-rating" id={`question-${question.id}`} aria-describedby={error ? `${question.id}-error` : undefined}>
    <legend>{question.text}</legend>
    <div className="survey-rating-options">
      {([1, 2, 3, 4, 5] as const).map(rating => <label key={rating} className="survey-rating-option">
        <input id={`${question.id}-${rating}`} type="radio" name={question.id} value={rating} checked={value === rating} onChange={() => onChange(rating)} required aria-invalid={error ? true : undefined} aria-describedby={error ? `${question.id}-error` : undefined} />
        <span className="survey-rating-face"><span>{rating}</span><Check size={12} className="survey-rating-check" aria-hidden="true" /></span>
      </label>)}
    </div>
    {error && <p className="survey-error" id={`${question.id}-error`}>{error}</p>}
  </fieldset>;
}
