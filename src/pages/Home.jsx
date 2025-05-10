import { Link } from "react-router-dom"
import PageTitle from "../components/PageTitle"

function Home() {
  return (
    <>
      <PageTitle title="Inicio" />
      <div className="home-container  content-container">
        <h1>
          Mi Pagina de Inicio
        </h1>
        <p>
         Es Sobre la Forma de Aprender React
        </p>
        <Link
          to="recursos"
          className="link-button"
        >
          Recursos
        </Link>
      </div>
    </>
  )
}

export default Home
