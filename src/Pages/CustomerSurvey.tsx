import "./CustomerSurvey.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import logo from "../assets/Images/logo.png";
import RatingScale from "../components/common/RatingScale";
import SurveySuccess from "../components/common/SurveySuccess";
import {
  buildSurveySubmission,
  createSurveyDraft,
  deliveryQuestions,
  factoryQuestions,
  salesQuestions,
  surveyQuestions,
  surveySteps,
  validateSurvey,
  validateSurveyStep,
  type QuestionId,
  type Rating,
  type SurveyDraft,
  type SurveyErrors,
} from "../data/customerSurvey";
import {
  customerSurveyService,
  SurveyNotConnectedError,
  type SurveyService,
} from "../services/customerSurvey";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CustomerSurvey({
  service = customerSurveyService,
}: {
  service?: SurveyService;
}) {
  const [draft, setDraft] = useState<SurveyDraft>(createSurveyDraft);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [changing, setChanging] = useState(false);
  const [errors, setErrors] = useState<SurveyErrors>({});
  const [summary, setSummary] = useState<ReturnType<typeof validateSurvey>>([]);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "unavailable" | "error" | "success"
  >("idle");
  const heading = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const moving = useRef(false);
  const pendingFocus = useRef<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Customer Satisfaction Survey | MPB Packaging Limited";
    return () => {
      document.title = previousTitle;
      request.current?.abort();
      request.current = null;
    };
  }, []);
  useEffect(() => {
    if (status === "unavailable" || status === "error")
      statusRef.current?.focus();
    if (status === "success")
      document.getElementById("survey-success-title")?.focus();
  }, [status]);

  function focusField(field: string) {
    const group = document.getElementById(`question-${field}`);
    const control =
      group?.querySelector<HTMLInputElement>("input:checked, input") ??
      document.getElementById(`survey-${field}`);
    control?.focus();
    (group ?? control)?.scrollIntoView({
      block: "center",
      behavior: "instant",
    });
  }
  function clearError(field: string) {
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      return next;
    });
    setSummary((previous) => previous.filter((item) => item.field !== field));
    if (status !== "idle") setStatus("idle");
  }
  function rate(id: QuestionId, rating: Rating) {
    setDraft((previous) => ({
      ...previous,
      ratings: { ...previous.ratings, [id]: rating },
    }));
    clearError(id);
  }
  function goTo(next: number, field?: string) {
    if (moving.current || busy.current) return;
    if (next === step) {
      if (field) focusField(field);
      return;
    }
    moving.current = true;
    setChanging(true);
    setDirection(next > step ? 1 : -1);
    pendingFocus.current = field ?? "heading";
    setStep(next);
    setStatus("idle");
  }
  function finishTransition() {
    moving.current = false;
    setChanging(false);
    if (pendingFocus.current === "heading") {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (pendingFocus.current) focusField(pendingFocus.current);
    pendingFocus.current = null;
  }
  async function continueSurvey(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || moving.current) return;
    if (step < surveySteps.length - 1) {
      const validation = validateSurveyStep(draft, step);
      setErrors(validation);
      const first = Object.keys(validation)[0];
      if (first) {
        focusField(first);
        return;
      }
      goTo(step + 1);
      return;
    }
    const missing = validateSurvey(draft);
    setSummary(missing);
    if (missing.length) {
      setErrors(
        Object.fromEntries(missing.map((item) => [item.field, item.message])),
      );
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    busy.current = true;
    setStatus("submitting");
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const receipt = await service.submit(
        buildSurveySubmission(draft),
        controller.signal,
      );
      if (request.current !== controller) return;
      if (
        controller.signal.aborted ||
        receipt.received !== true ||
        !receipt.reference?.trim()
      )
        throw new Error("Unconfirmed submission");
      setStatus("success");
    } catch (error) {
      if (request.current === controller)
        setStatus(
          error instanceof SurveyNotConnectedError ? "unavailable" : "error",
        );
    } finally {
      window.clearTimeout(timeout);
      busy.current = false;
    }
  }
  function textField(
    field:
      | "customer"
      | "productsTaken"
      | "comments"
      | "respondentName"
      | "designation"
      | "date",
    label: string,
    options: {
      required?: boolean;
      textarea?: boolean;
      max?: number;
      hint?: string;
    } = {},
  ) {
    const value =
      field === "respondentName"
        ? draft.respondent.name
        : field === "designation"
          ? draft.respondent.designation
          : draft[field];
    const attributes = {
      id: `survey-${field}`,
      name: field,
      value,
      required: options.required,
      maxLength: options.max,
      "aria-invalid": errors[field] ? (true as const) : undefined,
      "aria-describedby":
        [
          options.hint ? `${field}-hint` : "",
          errors[field] ? `${field}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        const value = event.target.value;
        setDraft((previous) =>
          field === "respondentName" || field === "designation"
            ? {
                ...previous,
                respondent: {
                  ...previous.respondent,
                  [field === "respondentName" ? "name" : "designation"]: value,
                },
              }
            : { ...previous, [field]: value },
        );
        clearError(field);
      },
    };
    return (
      <div className="survey-field">
        <label htmlFor={attributes.id}>
          {label}
          {!options.required && <span> (optional)</span>}
        </label>
        {options.hint && (
          <p className="survey-hint" id={`${field}-hint`}>
            {options.hint}
          </p>
        )}
        {options.textarea ? (
          <textarea {...attributes} rows={4} />
        ) : (
          <input
            {...attributes}
            type={field === "date" ? "date" : "text"}
            autoComplete={
              field === "customer"
                ? "organization"
                : field === "respondentName"
                  ? "name"
                  : field === "designation"
                    ? "organization-title"
                    : undefined
            }
          />
        )}
        {errors[field] && (
          <p className="survey-error" id={`${field}-error`}>
            {errors[field]}
          </p>
        )}
      </div>
    );
  }
  const complete = (questions: readonly { id: QuestionId }[]) =>
    `${questions.filter((q) => draft.ratings[q.id]).length} / ${questions.length}`;

  return (
    <div className="survey-page">
      <header className="survey-header">
        <div className="survey-container survey-header-inner">
          <a href="/" aria-label="Return to MPB website">
            <img
              src={logo}
              width={56}
              height={56}
              alt="MPB Packaging Limited"
            />
          </a>
          <h1>Customer Satisfaction Survey</h1>
          <a className="survey-home-link" href="/">
            Back to MPB website
          </a>
        </div>
      </header>
      <main className="survey-container survey-main">
        {step === 0 && status !== "success" && (
          <div className="survey-intro">
            <p className="eyebrow">CUSTOMER FEEDBACK</p>
            <h2>Help Us Serve You Better</h2>
            <p>
              Your feedback helps us improve our products, service and customer
              experience. This survey should take only a few minutes.
            </p>
            <div className="survey-intro-meta">
              <span>1 = Lowest rating · 5 = Highest rating</span>
              <span>Estimated time: 3–5 minutes</span>
            </div>
          </div>
        )}
        <div className="survey-panel">
          {status === "success" ? (
            <SurveySuccess />
          ) : (
            <form
              onSubmit={continueSurvey}
              noValidate
              aria-label="Customer satisfaction survey"
              aria-busy={status === "submitting"}
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={step}
                  className="survey-step"
                  custom={direction}
                  variants={{
                    enter: (travel: number) => ({
                      opacity: 0,
                      x: reduceMotion ? 0 : travel * 16,
                    }),
                    visible: { opacity: 1, x: 0 },
                    exit: (travel: number) => ({
                      opacity: 0,
                      x: reduceMotion ? 0 : travel * -12,
                    }),
                  }}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                  onAnimationComplete={(definition) => {
                    if (definition === "visible") finishTransition();
                  }}
                >
                  <h2 ref={heading} id="survey-step-title" tabIndex={-1}>
                    {surveySteps[step].title}
                  </h2>
                  <p className="survey-step-note">
                    {step === 0
                      ? "Both fields are required."
                      : step === 7
                        ? "Respondent details are optional. Please review before submitting."
                        : "Please rate each question before continuing."}
                  </p>
                  {summary.length > 0 && step === 7 && (
                    <div
                      className="survey-error-summary"
                      ref={summaryRef}
                      tabIndex={-1}
                      role="alert"
                    >
                      <h3>Please complete these responses</h3>
                      <ul>
                        {summary.map((item) => (
                          <li key={item.field}>
                            <button
                              type="button"
                              onClick={() => goTo(item.step, item.field)}
                            >
                              {surveyQuestions.find(
                                (question) => question.id === item.field,
                              )?.text ??
                                (
                                  {
                                    customer: "Name of Customer",
                                    productsTaken: "Products Taken",
                                    comments:
                                      "Additional Comments / Recommendations",
                                    respondentName: "Name",
                                    designation: "Designation",
                                    date: "Date",
                                  } as Record<string, string>
                                )[item.field]}{" "}
                              — {item.message}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <fieldset
                    className="survey-step-fields"
                    disabled={changing || status === "submitting"}
                    aria-labelledby="survey-step-title"
                  >
                    {step === 0 && (
                      <>
                        {textField("customer", "Name of Customer", {
                          required: true,
                          max: 160,
                        })}
                        {textField("productsTaken", "Products Taken", {
                          required: true,
                          max: 500,
                        })}
                      </>
                    )}
                    {surveySteps[step].questions.map((question) => (
                      <RatingScale
                        key={question.id}
                        question={question}
                        value={draft.ratings[question.id]}
                        error={errors[question.id]}
                        onChange={(rating) => rate(question.id, rating)}
                      />
                    ))}
                    {step === 6 &&
                      textField(
                        "comments",
                        "Additional Comments / Recommendations",
                        {
                          textarea: true,
                          max: 2000,
                          hint: "Tell us what we are doing well or where we can improve.",
                        },
                      )}
                    {step === 7 && (
                      <>
                        <div className="survey-respondent">
                          {textField("respondentName", "Name", { max: 100 })}
                          {textField("designation", "Designation", {
                            max: 120,
                          })}
                          {textField("date", "Date")}
                        </div>
                        <section
                          className="survey-review"
                          aria-labelledby="survey-review-title"
                        >
                          <h3 id="survey-review-title">Review your feedback</h3>
                          <dl>
                            <div>
                              <dt>Customer / company</dt>
                              <dd>{draft.customer || "Not provided"}</dd>
                            </div>
                            <div>
                              <dt>Products taken</dt>
                              <dd>{draft.productsTaken || "Not provided"}</dd>
                            </div>
                            <div>
                              <dt>Factory</dt>
                              <dd>{complete(factoryQuestions)} answered</dd>
                            </div>
                            <div>
                              <dt>Documentation & Deliveries</dt>
                              <dd>{complete(deliveryQuestions)} answered</dd>
                            </div>
                            <div>
                              <dt>Sales</dt>
                              <dd>{complete(salesQuestions)} answered</dd>
                            </div>
                            <div>
                              <dt>Recommendation rating</dt>
                              <dd>
                                {draft.ratings.recommendation_rating
                                  ? `${draft.ratings.recommendation_rating} / 5`
                                  : "Not provided"}
                              </dd>
                            </div>
                          </dl>
                          <details>
                            <summary>Edit responses</summary>
                            <div className="survey-edit-links">
                              {surveySteps.slice(0, 7).map((section, index) => (
                                <button
                                  type="button"
                                  key={section.title}
                                  onClick={() => goTo(index)}
                                >
                                  {section.title}
                                </button>
                              ))}
                            </div>
                          </details>
                        </section>
                      </>
                    )}
                  </fieldset>
                </motion.div>
              </AnimatePresence>
              {(status === "unavailable" || status === "error") && (
                <div
                  className="survey-feedback"
                  role="status"
                  ref={statusRef}
                  tabIndex={-1}
                >
                  {status === "unavailable"
                    ? "Survey submission is not yet connected."
                    : "We couldn't confirm receipt of your feedback. Your answers are still here. Please try again later."}
                </div>
              )}
              <div className="survey-actions-shell">
                <div className="survey-progress">
                  <span>
                    Step {step + 1} of {surveySteps.length}
                  </span>
                  <progress
                    value={step + 1}
                    max={surveySteps.length}
                    aria-label="Survey progress"
                  />
                </div>
                <div className="survey-actions">
                  <button
                    className="btn-outline"
                    type="button"
                    disabled={step === 0 || changing || status === "submitting"}
                    onClick={() => goTo(step - 1)}
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back
                  </button>
                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={changing || status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Submitting…"
                      : step === 7
                        ? "Submit Feedback"
                        : "Continue"}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
                <span className="visually-hidden" role="status">
                  {status === "submitting"
                    ? "Submitting feedback. Please wait."
                    : ""}
                </span>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
