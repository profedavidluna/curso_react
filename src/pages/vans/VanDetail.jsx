import { Suspense } from "react"
import {
  useLocation,
  Link,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { getVans } from "../../api"
import Loading from "../../components/Loading"
import PageTitle from "../../components/PageTitle"

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  const urlSegment = params.name
  const vanName = urlSegment
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )

  return defer({ vans: getVans(vanName) })
}

function VanDetail() {
  const location = useLocation()
  const dataPromise = useLoaderData()

  const search = location.state?.search || ""
  const type = location.state?.type

  function renderVanDetail(van) {
    return (
      <>
        <PageTitle title={`Vans | ${van.name} | VanLife`} />
        <h1>{van.name}</h1>
        <picture>
          <source
            srcSet={van.imageUrlWebp}
            type="image/webp"
          />
          <img
            className="van-image"
            src={van.imageUrlPng}
            alt={`The ${van.name} van`}
            loading="lazy"
            width="881"
            height="881"
          />
        </picture>
        <p>{van.description}</p>

        <ul className="van-footer text-list">
          <li>
            <span className="visually-hidden">Price: </span>${van.price}/day
          </li>
          <li>
            <span className="visually-hidden">Type: </span>
            <span className={`van-type ${van.type}`}>{van.type}</span>
          </li>
        </ul>
      </>
    )
  }

  return (
    <div className="van-detail-container  content-container">
      <div className="back-links">
        {type && (
          <>
            <Link
              className="back-link arrow"
              to={`..${search}`}
              relative="path"
            >
              <FaCircleArrowLeft />{" "}
              <span>
                <span className="visually-hidden">Back to </span>
                all {type} vans
              </span>
            </Link>
          </>
        )}
        <Link
          className="back-link arrow"
          to=".."
          relative="path"
        >
          <FaCircleArrowLeft />
          <span>
            <span className="visually-hidden">Back to </span>all vans
          </span>
        </Link>
      </div>

      <Suspense fallback={<Loading title="van" />}>
        <Await resolve={dataPromise.vans}>{renderVanDetail}</Await>
      </Suspense>
    </div>
  )
}

export default VanDetail
