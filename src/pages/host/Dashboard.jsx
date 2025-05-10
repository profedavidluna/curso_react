import { Suspense } from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { FaCircleArrowRight } from "react-icons/fa6"
import { MdOutlineStar } from "react-icons/md"
import { requireAuth } from "../../utils/require-auth"
import { hostVanId } from "../../utils/hostVanId"
import { getHostVans } from "../../api"
import Loading from "../../components/Loading"

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  await requireAuth(request)
  return defer({ vans: getHostVans() })
}

// Award yourself:
const stars = []
const starsNum = 2
const starsTotal = 2
for (let i = 0; i < starsNum; i++) {
  stars.push(
    <MdOutlineStar
      key={i}
      className="review-star"
    />
  )
}

function Dashboard() {
  const dataPromise = useLoaderData()

  function renderHostVanElements(vans) {
    const vanList = vans
      .filter((van) => van.hostId === hostVanId)
      .map((van) => {
        return (
          <li key={van.id}>
            <Link
              className="link-button arrow"
              to={`host-vans/${van.name.replace(/\s+/g, "-").toLowerCase()}`}
              aria-label={`View details for ${van.name}, 
                             priced at &#36;${van.price} per day`}
            >
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
              <div>
                <p>{van.name}</p>
                <ul className="van-footer">
                  <li>
                    <span className="visually-hidden">Price: </span>${van.price}
                    /day
                  </li>
                </ul>
                <FaCircleArrowRight aria-hidden="true" />
              </div>
            </Link>
          </li>
        )
      })

    return <ul className="van-list">{vanList}</ul>
  }

  return (
    <div className="hosts-container content-container  host-vans-container list-container dashboard-container">
      <h1>Welcome Host ID.{hostVanId}</h1>
      <section className="income">
        <h2>Income</h2>
        <p>
          Income last <span>6 months</span>
        </p>
        <p className="dashboard-info">$9,780.00</p>
        <Link
          to="reviews"
          className="arrow info-link"
        >
          <span className="visually-hidden">Income </span>Details
          <FaCircleArrowRight
            aria-hidden="true"
            className="arrow info-link"
          />
        </Link>
      </section>
      <section className="reviews">
        <h2>Review Score</h2>
        <div className="review-stars">{stars}</div>

        <p className="dashboard-info">{`${starsNum}/${starsTotal}`}</p>
        <Link
          to="reviews"
          className="arrow info-link"
        >
          <span className="visually-hidden">Reviews </span>Details
          <FaCircleArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section className="vans">
        <h2>Listed Vans</h2>
        <Link
          to="/vans"
          className="arrow info-link"
        >
          View all <span className="visually-hidden">Vans </span>
          <FaCircleArrowRight aria-hidden="true" />
        </Link>
        <Suspense fallback={<Loading title="vans" />}>
          <Await resolve={dataPromise.vans}>{renderHostVanElements}</Await>
        </Suspense>
      </section>
    </div>
  )
}

export default Dashboard
