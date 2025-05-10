import { Suspense } from "react"
import { Link, Outlet, useLoaderData, defer, Await } from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { requireAuth } from "../../utils/require-auth"
import { getHostVans } from "../../api"
import Loading from "../../components/Loading"
import HostVanDetailNav from "../../components/HostVanDetailNav"
import PageTitle from "../../components/PageTitle"
import { hostVanId } from "../../utils/hostVanId"

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params, request }) {
  await requireAuth(request)
  const urlSegment = params.name
  const vanName = urlSegment
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )
  return defer({ vans: getHostVans(vanName) })
}

function HostVanDetail() {
  const dataPromise = useLoaderData()

  function renderHostVanDetail(van) {
    return (
      <>
        <PageTitle
          title={`Host id.${hostVanId} | Vans | ${van.name} Details | VanLife`}
        />
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
        <h1>{van.name}</h1>
        <HostVanDetailNav />
        <Outlet context={{ van }} />
      </>
    )
  }

  return (
    <div className="hosts-container  content-container host-van-detail van-detail-container">
      <div className="back-links">
        <Link
          className="back-link arrow"
          to=".."
          relative="path"
        >
          <FaCircleArrowLeft />
          <span>
            <span className="visually-hidden">Back to </span>Host Vans list
          </span>
        </Link>
      </div>

      <Suspense fallback={<Loading title="van" />}>
        <Await resolve={dataPromise.vans}>{renderHostVanDetail}</Await>
      </Suspense>
    </div>
  )
}

export default HostVanDetail
