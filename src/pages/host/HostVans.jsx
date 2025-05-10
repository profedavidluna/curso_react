import { Suspense } from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { FaCircleArrowRight } from "react-icons/fa6"
import { requireAuth } from "../../utils/require-auth"
import { hostVanId } from "../../utils/hostVanId"
import { getHostVans } from "../../api"
import Loading from "../../components/Loading"
import PageTitle from "../../components/PageTitle"

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  await requireAuth(request)
  return defer({ vans: getHostVans() })
}

function HostVans() {
  const dataPromise = useLoaderData()

  function renderHostVanElements(vans) {
    const vanList = vans
      .filter((van) => van.hostId === hostVanId)
      .map((van) => {
        return (
          <li key={van.id}>
            <Link
              className="link-button arrow"
              to={van.name.replace(/\s+/g, "-").toLowerCase()}
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
    <>
      <PageTitle title={`Host id.${hostVanId} | Vans | VanLife`} />
      <div className="hosts-container  content-container host-vans-container list-container">
        <h1>Your Listed Vans</h1>
        <Suspense fallback={<Loading title="vans" />}>
          <Await resolve={dataPromise.vans}>{renderHostVanElements}</Await>
        </Suspense>
      </div>
    </>
  )
}

export default HostVans
