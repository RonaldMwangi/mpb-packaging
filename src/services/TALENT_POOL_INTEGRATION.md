# Talent pool submission integration

The project currently has no recruitment API, storage or email submission system.
`talentPoolService` is deliberately unavailable: it makes no network request and
cannot produce a successful submission. The form states this before collecting input.
Candidate details and files are held only in component memory, not browser storage.

To connect an approved backend, pass its same-origin path to
`createTalentPoolService` in `talentPool.ts`. No component rewrite is needed.

The adapter sends multipart `FormData` with `fullName`, `email`, `phone`,
`location`, `area`, `experience`, `profile`, `qualification`, `linkedin`,
`portfolio`, `consent` (the string `true`) and optional `cv` (the original file).
It accepts success only after a successful HTTP response with JSON:

```json
{ "accepted": true, "reference": "server-generated-reference" }
```

The backend must return that receipt only after securely accepting the profile
into MPB's talent pool. It must independently validate fields, consent, file type,
contents and the 5 MB limit. Access controls, retention and correction/deletion
handling belong in that backend; no secrets or third-party storage are configured
in the frontend. Failed or unconfirmed responses keep the applicant's inputs.

The native page URL is `/careers/talent-pool`. Vite supports direct entry during
development; production hosting must serve the existing SPA entry for this path.
No deployment configuration was changed.
