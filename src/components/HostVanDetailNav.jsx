import { NavLink } from "react-router-dom"

function HostVanDetailNav() {
  return (
    <>
      <nav className="site-navigation hosts-nav hosts-sub-nav">
        <ul>
          <li>
            <NavLink
              to="."
              end
            >
              Details
            </NavLink>
          </li>
          <li>
            <NavLink to="pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="photos">Photos</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default HostVanDetailNav
