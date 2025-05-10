import { Link } from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6"
import PageTitle from "../components/PageTitle"

function PageNotFound() {
  return (
    <>
      <PageTitle title="404 | Page not found | VanLife" />
      <div className="content-container page-not-found-container">
        <h1>Page Not Found</h1>
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

export default PageNotFound
