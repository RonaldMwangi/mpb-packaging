# Customer satisfaction survey

Direct route: `/customer-satisfaction-survey`. This page is intentionally absent
from public navigation, site search and homepage calls to action. It follows the
existing native path routing and does not change deployment configuration.

The supplied PDF was checked against all 22 question strings in
`data/customerSurvey.ts`; the original wording, including “efficieny”, is retained.
The questionnaire is divided into eight steps. Respondent name, designation,
date and comments are optional; the date defaults to the local calendar date.

Answers are held in React memory across steps. No browser storage is used, so
refreshing starts a new draft. Draft state is not backend storage.

`buildSurveySubmission` validates and groups answers as `customer`,
`productsTaken`, `factory`, `documentationDeliveries`, `sales`,
`recommendation`, `comments`, `respondent` and `date`. Every rating is a numeric
1–5 value under its stable question ID.

`customerSurveyService` currently throws `SurveyNotConnectedError` without
sending anything. The page displays “Survey submission is not yet connected.”
and keeps the answers. To connect the approved backend later, implement the
`SurveyService.submit(payload, signal)` interface. Independently validate on the
server and return `{ received: true, reference: "server-receipt" }` only after
the response is saved. The prepared success component is gated on that receipt.
No API, credentials, email or third-party service has been configured.
