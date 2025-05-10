import { NavLink, Outlet } from "react-router-dom"
import PageTitle from "../components/PageTitle"
import { hostVanId } from "../utils/hostVanId"

function LayoutHost() {
  return (
    <>
      <PageTitle title={`Host id.${hostVanId} | Dashboard | VanLife`} />
      <nav className="site-navigation hosts-nav">
        <ul>
          <li>
            <NavLink
              to="."
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="income">Income</NavLink>
          </li>
          <li>
            <NavLink to="host-vans">Vans</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </nav>
      {<Outlet />}
    </>
  )
}

export default LayoutHost
