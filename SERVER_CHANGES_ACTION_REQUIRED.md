# Server Security Update — Required Changes for Website & App

## What changed on the server

A security hardening pass was applied. The following endpoints and behaviors changed.

---

## Website Changes Required

### 1. `/forgot-password` — response shape changed

**Old behavior:** Returns `404` if the email is not found.  
**New behavior:** Always returns `200` with the same message regardless of whether the email exists (prevents user enumeration).

**Action:** Remove any frontend logic that treats a 404 on `/forgot-password` as "email not found". Always show the same neutral message, e.g.:

> "If an account with that email exists, we've sent reset instructions."

---

### 2. Rate limiting — handle `429 Too Many Requests`

The following endpoints now return `429` after too many requests:

| Endpoint | Window | Limit |
|---|---|---|
| `POST /login` | 15 min | 10 attempts |
| `POST /register` | 15 min | 10 attempts |
| `POST /reset-password` | 15 min | 10 attempts |
| `POST /forgot-password` | 1 hour | 5 attempts |

**Action:** Any form that calls these endpoints should handle a `429` response and display a user-friendly message such as:

> "Too many attempts. Please wait a few minutes and try again."

The `429` body is: `{ success: false, error: "Too many attempts, please try again later." }`

---

### 3. `/test-db` — now requires admin auth

`GET /test-db` now requires the `x-api-key` admin header. Remove any public health-check UI that called this endpoint.  
Use `GET /` (the root endpoint) for public health checks — it still returns `200` with no auth.

---

## App (Electron) Changes Required

### 1. Credit purchase requires a login JWT — not a session JWT

**Context:** When a user opens the app with a license key + email (via `/open-session`), they receive a *session JWT* that carries `{ email }`. Account owners who log in with email + password receive a *login JWT* that carries `{ userId }`.

**Change:** `POST /credits/purchase-checkout` now returns `403` with `error: "login_required"` for any session-JWT caller:

```json
{
  "success": false,
  "error": "login_required",
  "message": "Credit purchases require an account login. Please log in with your email and password."
}
```

**Action:**
- Hide or disable the "Buy Credits" / "Purchase AI credits" UI for users authenticated only via session JWT (i.e., users who have no `userId` in their token, or equivalently users who authenticated via license key + email rather than via the login screen).
- If you can detect the token type client-side (e.g., by whether `userId` is present in the JWT payload), use that. Otherwise, handle the `403 login_required` response by prompting the user to log into their account.

---

### 2. Seat holders cannot purchase credits (pre-existing, now explicit)

Seat holders on a team/enterprise license have never been able to purchase credits — only the license owner can. The server already enforced this via `isLicenseOwner`. This is now layered with the session-JWT check above.

**Recommended UX:** After a successful `/credits/balance` or `/user/me` call, check `isLicenseOwner` in the response. If `false`, hide the purchase UI entirely.

---

### 3. Owner's email can no longer be removed from their license

`POST /remove-license-email` now returns `400` if the email being removed belongs to the license owner:

```json
{ "success": false, "error": "Cannot remove the license owner's own email" }
```

**Action:** In the seat management UI, disable the "Remove" button (or hide it) for the row that corresponds to the owner's own email.

---

### 4. `/forgot-password` — neutral response (same as website above)

If the app has a "Forgot password" flow, the same change applies: always show a neutral success message regardless of the server's response, since the server no longer distinguishes between known and unknown emails.

---

## Database Notes (no schema changes required)

- **Password hashes** are being silently migrated from SHA-256 to bcrypt on each successful login. No schema change needed — existing users log in normally and their hash is upgraded transparently.
- **Password reset tokens** are now stored as SHA-256 hashes of the random token. Any tokens that were stored in plaintext before this deploy will be invalidated — users with a pending reset request issued before the deploy will need to request a new one.
- **Reseller lifetime licenses** now correctly store `locked_app_version` at purchase time. Reseller lifetime licenses created before this deploy do not have a `locked_app_version` and will have it set on the customer's first heartbeat after the free-updates year expires (same auto-lock behavior as direct purchases).
