import {
  useActionData,
  useLoaderData,
  useNavigation,
  Form,
  redirect,
} from "react-router-dom"
import { loginUser } from "../api"
import { LOGGEDIN_KEY } from "../utils/localStorageKeys"
import PageTitle from "../components/PageTitle"

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host"
  try {
    await loginUser({ email, password })
    localStorage.setItem(LOGGEDIN_KEY, true)
    const response = redirect(pathname)
    Object.defineProperty(response, "body", { value: true })

    return response
  } catch (err) {
    return err.message
  }
}

function toggleAria() {
  const details = document.getElementById("details")
  const summary = document.getElementById("summary")
  const summaryStatus = document.getElementById("summary-status")

  // Allow the `details.open` property to update
  setTimeout(() => {
    if (details.open) {
      summary.setAttribute("aria-expanded", "true")
      summaryStatus.textContent = "Close"
    } else {
      summary.setAttribute("aria-expanded", "false")
      summaryStatus.textContent = "Open"
    }
  }, 0)
}

function closeDetails() {
  const details = document.getElementById("details")
  const summary = document.getElementById("summary")
  const summaryStatus = document.getElementById("summary-status")

  details.removeAttribute("open")
  summary.setAttribute("aria-expanded", "false")
  summaryStatus.textContent = "Open"
}

function Login() {
  const message = useLoaderData()
  const errorMessage = useActionData()
  const submission = useNavigation()

  return (
    <>
      <PageTitle title="Login | VanLife" />
      <div className="login-container content-container">
        <h1>Log in to your host account</h1>
        <details
          id="details"
          className="login-details"
          onClick={toggleAria}
        >
          <summary
            aria-controls="#details"
            id="summary"
            className="summary"
            aria-expanded="false"
          >
            <span
              id="summary-status"
              className="visually-hidden"
            >
              Open
            </span>{" "}
            (Mock) login credentials
          </summary>
          <div className="details">
            <ul>
              <li>
                Email: <span>c@n.com</span>
              </li>
              <li>
                Password: <span>p123</span>
              </li>
            </ul>
            <button
              onClick={closeDetails}
              type="button"
              className="link-button"
            >
              Close
            </button>
          </div>
        </details>
        <ul className="error-messages">
          {message && <li>{message}</li>}
          {errorMessage && (
            <li className="login-error-message">{errorMessage}</li>
          )}
        </ul>
        <Form
          method="post"
          className="login-form"
          replace
        >
          <div>
            <div className="login-input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
              />
            </div>
            <div className="login-input">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="link-button"
            disabled={submission.state === "submitting"}
          >
            {submission.state === "submitting" ? "Logging in..." : "Log in"}
          </button>
        </Form>
      </div>
    </>
  )
}

export default Login
