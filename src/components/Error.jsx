import { Link } from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { useRouteError } from "react-router-dom"
import PageTitle from "./PageTitle"

export default function Error() {
  const error = useRouteError()

  return (
    <>
      <PageTitle title={`Error: ${error.message}`} />
      <div className="content-container page-not-found-container">
        <h1>Error: {error.message}</h1>
        <ul className="error-info">
          {error.status && (
            <li>
              Status: {error.status}
              {error.statusText && `, ${error.statusText}`}
            </li>
          )}
        </ul>

        <Link
          to="/"
          className="back-link arrow"
        >
          <FaCircleArrowLeft />
          <span>Back to the home page</span>
        </Link>
      </div>
    </>
  )
}
