import PropTypes from "prop-types"
import { FaVanShuttle } from "react-icons/fa6"
import Nav from "./Nav"

function Header({ title }) {
  return (
    <header className="site-header">
      <p className="site-header--h1">
        <FaVanShuttle /> <span>{title}</span>
      </p>
      <Nav />
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
