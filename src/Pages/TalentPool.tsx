import "./TalentPool.css";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionMotif from "../components/common/SectionMotif";
import {
  siteFadeLeft,
  siteFadeRight,
  siteStaggerContainer,
} from "../utils/animations";
import { contact } from "../data/contact";
import {
  areasOfInterest,
  experienceLevels,
  emptyTalentPoolFields,
  PROFILE_LIMIT,
  validateTalentPool,
  type TalentPoolErrors,
  type TalentPoolFields,
} from "../data/talentPool";
import {
  talentPoolService,
  type TalentPoolService,
} from "../services/talentPool";

function Field({
  id,
  label,
  required,
  error,
  hint,
  wide,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`talent-field${wide ? " talent-field-wide" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <span className="talent-optional"> (optional)</span>
        )}
      </label>
      {hint && (
        <p className="talent-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="talent-error" id={`${id}-error`}>
          Error: {error}
        </p>
      )}
    </div>
  );
}

export default function TalentPool({
  service = talentPoolService,
}: {
  service?: TalentPoolService;
}) {
  const [values, setValues] = useState<TalentPoolFields>(emptyTalentPoolFields);
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<TalentPoolErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error" | "success"
  >("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    const title = document.title;
    document.title = "Join Our Talent Pool | MPB Packaging Limited";
    return () => {
      document.title = title;
      request.current?.abort();
      request.current = null;
    };
  }, []);
  useEffect(() => {
    if (status === "error") feedbackRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update<K extends keyof TalentPoolFields>(
    key: K,
    value: TalentPoolFields[K],
  ) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key])
      setErrors((previous) => ({
        ...previous,
        [key]: validateTalentPool({ ...next, cv })[key],
      }));
  }

  function inputProps(key: keyof TalentPoolFields, hint = false) {
    return {
      id: `talent-${key}`,
      name: key,
      "aria-invalid": errors[key] ? (true as const) : undefined,
      "aria-describedby":
        [
          hint ? `talent-${key}-hint` : "",
          errors[key] ? `talent-${key}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined,
      onBlur: () =>
        setErrors((previous) => ({
          ...previous,
          [key]: validateTalentPool({ ...values, cv })[key],
        })),
    };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const profile = { ...values, cv };
    const validation = validateTalentPool(profile);
    setErrors(validation);
    const first = Object.keys(validation)[0];
    if (first) {
      (
        formRef.current?.elements.namedItem(first) as HTMLElement | null
      )?.focus();
      return;
    }
    busy.current = true;
    setStatus("submitting");
    setMessage("");
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const receipt = await service.submit(profile, controller.signal);
      if (controller.signal.aborted)
        throw new Error(
          "Submission timed out. Your details remain below. Please try again later.",
        );
      if (receipt.accepted !== true || !receipt.reference)
        throw new Error(
          "We couldn't confirm receipt of your profile. Please try again later.",
        );
      setStatus("success");
      // Remove candidate data from component memory only after confirmed receipt.
      setValues(emptyTalentPoolFields);
      setCv(null);
    } catch (error) {
      if (request.current !== controller) return;
      setMessage(
        controller.signal.aborted
          ? "Submission timed out. Your details remain below. Please try again later."
          : service.available
            ? "We couldn't confirm your submission. Your details remain below. Please try again later."
            : error instanceof Error
              ? error.message
              : "Online submissions are not available yet. Your profile has not been sent.",
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      busy.current = false;
    }
  }

  return (
    <main className="talent-page print-motif-section" id="talent-pool">
      <SectionMotif variant="registration" />
      <div className="container talent-layout">
        <motion.div
          className="talent-intro"
          variants={siteStaggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            className="talent-back"
            href="/#careers"
            variants={siteFadeLeft}
          >
            Back to Careers
          </motion.a>
          <motion.span className="eyebrow" variants={siteFadeLeft}>
            JOIN OUR TALENT POOL
          </motion.span>
          <motion.h1 variants={siteFadeLeft}>
            Build Your Future With MPB
          </motion.h1>
          <motion.p variants={siteFadeLeft}>
            We’re always interested in meeting people who can contribute to the
            future of packaging. Share your profile with us, and when a suitable
            opportunity arises, our team may get in touch.
          </motion.p>

          <motion.div className="talent-areas" variants={siteFadeLeft}>
            <h2>Where you could contribute</h2>
            <ul>
              {areasOfInterest.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="talent-panel"
          variants={siteFadeRight}
          initial="hidden"
          animate="visible"
        >
          {status === "success" ? (
            <div className="talent-success" ref={successRef} tabIndex={-1}>
              <CheckCircle2 size={40} aria-hidden="true" />
              <h2>Thank you for your interest in MPB Packaging Limited.</h2>
              <p>
                We’ve received your profile and added it to our talent pool.
                This is not an application to a current vacancy and does not
                guarantee an interview or employment. If a suitable opportunity
                arises, our team may contact you.
              </p>
              <a href="/#careers" className="btn-primary">
                Back to Careers <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          ) : (
            <>
              <h2>Tell us about yourself</h2>
              <p className="talent-form-note">
                Fields marked * are required. A CV is strongly encouraged.
              </p>
              {!service.available && (
                <p className="talent-availability">
                  Online talent pool submissions are not available yet. Please
                  check back later. No profile or CV will be sent until
                  submissions open.
                </p>
              )}
              <form
                ref={formRef}
                onSubmit={submit}
                noValidate
                aria-label="Talent pool expression of interest"
                aria-busy={status === "submitting"}
              >
                <fieldset
                  disabled={status === "submitting"}
                  className="talent-fields"
                >
                  <legend className="visually-hidden">Your profile</legend>
                  <Field
                    id="talent-fullName"
                    label="Full Name"
                    required
                    error={errors.fullName}
                    wide
                  >
                    <input
                      {...inputProps("fullName")}
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={values.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-email"
                    label="Email Address"
                    required
                    error={errors.email}
                  >
                    <input
                      {...inputProps("email")}
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-phone"
                    label="Phone Number"
                    required
                    error={errors.phone}
                  >
                    <input
                      {...inputProps("phone")}
                      type="tel"
                      autoComplete="tel"
                      required
                      maxLength={40}
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-location"
                    label="Current Location / County"
                    required
                    error={errors.location}
                    wide
                  >
                    <input
                      {...inputProps("location")}
                      autoComplete="address-level2"
                      required
                      maxLength={120}
                      value={values.location}
                      onChange={(e) => update("location", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-area"
                    label="Area of Interest"
                    required
                    error={errors.area}
                  >
                    <select
                      {...inputProps("area")}
                      required
                      value={values.area}
                      onChange={(e) => update("area", e.target.value)}
                    >
                      <option value="">Select an area</option>
                      {areasOfInterest.map((area) => (
                        <option key={area}>{area}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id="talent-experience"
                    label="Experience Level"
                    required
                    error={errors.experience}
                  >
                    <select
                      {...inputProps("experience")}
                      required
                      value={values.experience}
                      onChange={(e) => update("experience", e.target.value)}
                    >
                      <option value="">Select experience</option>
                      {experienceLevels.map((level) => (
                        <option key={level}>{level}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id="talent-profile"
                    label="Short Profile"
                    required
                    error={errors.profile}
                    wide
                    hint="Tell us briefly about your skills, experience and the kind of opportunity you are interested in."
                  >
                    <textarea
                      {...inputProps("profile", true)}
                      required
                      rows={5}
                      maxLength={PROFILE_LIMIT}
                      value={values.profile}
                      onChange={(e) => update("profile", e.target.value)}
                    />
                    <p className="talent-count">
                      {values.profile.length} / {PROFILE_LIMIT} characters
                    </p>
                  </Field>
                  <Field
                    id="talent-qualification"
                    label="Highest Qualification"
                    error={errors.qualification}
                    wide
                  >
                    <input
                      {...inputProps("qualification")}
                      maxLength={160}
                      value={values.qualification}
                      onChange={(e) => update("qualification", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-linkedin"
                    label="LinkedIn Profile URL"
                    error={errors.linkedin}
                    wide
                  >
                    <input
                      {...inputProps("linkedin")}
                      type="url"
                      autoCapitalize="none"
                      spellCheck={false}
                      maxLength={500}
                      value={values.linkedin}
                      onChange={(e) => update("linkedin", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-portfolio"
                    label="Portfolio / Website URL"
                    error={errors.portfolio}
                    wide
                  >
                    <input
                      {...inputProps("portfolio")}
                      type="url"
                      autoCapitalize="none"
                      spellCheck={false}
                      maxLength={500}
                      value={values.portfolio}
                      onChange={(e) => update("portfolio", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="talent-cv"
                    label="CV / Resume"
                    hint="Strongly encouraged. PDF, DOC or DOCX, up to 5 MB. No need to repeat your full employment history here."
                    error={errors.cv}
                    wide
                  >
                    <input
                      id="talent-cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      aria-invalid={errors.cv ? true : undefined}
                      aria-describedby={`talent-cv-hint${errors.cv ? " talent-cv-error" : ""}`}
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        setCv(file);
                        setErrors((previous) => ({
                          ...previous,
                          cv: validateTalentPool({ ...values, cv: file }).cv,
                        }));
                      }}
                    />
                  </Field>
                  <div className="talent-consent talent-field-wide">
                    <label htmlFor="talent-consent">
                      <input
                        {...inputProps("consent")}
                        type="checkbox"
                        required
                        checked={values.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                      />
                      <span>
                        I consent to MPB Packaging Limited using the information
                        I provide to assess my suitability for current or future
                        employment opportunities and to contact me where a
                        relevant opportunity arises. *
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="talent-error" id="talent-consent-error">
                        Error: {errors.consent}
                      </p>
                    )}
                  </div>
                  <p className="talent-privacy talent-field-wide">
                    Information is collected for recruitment and talent
                    consideration, for access only by appropriate MPB personnel.
                    Submitting does not guarantee an interview or employment.
                    You may{" "}
                    <a
                      href={`${contact.emailHref}?subject=Talent%20pool%20information%20request`}
                    >
                      request correction or deletion of your information
                    </a>
                    .
                  </p>
                  <button
                    className="btn-primary btn-lg talent-submit"
                    type="submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Submitting your profile…"
                      : "Join Talent Pool"}
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </fieldset>
                {status === "error" && (
                  <div
                    className="talent-feedback"
                    ref={feedbackRef}
                    tabIndex={-1}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <span className="visually-hidden" role="status">
                  {status === "submitting"
                    ? "Submitting your profile. Please wait."
                    : ""}
                </span>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
