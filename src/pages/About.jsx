import { Link } from "react-router-dom"
import PageTitle from "../components/PageTitle"

function About() {
  return (
    <>
      <PageTitle title="Curso de React" />
      <div className="about-page-container content-container">
        <div className="about-page-content">
          <h1>Sobre el Curso</h1>
          <p>
          El presente curso tiene por finalidad ser la guía fácil y moderna para aprender React desde cero hasta convertirte en un analista y programador React profesional. Por tal motivo es un curso React basado en programación funcional y Hooks.
          </p>

          <h2>
            <span>Aprendamos Juntos</span>
          </h2>
          <Link
            className="link-button"
            to="/recursos"
          >
            Recursos
          </Link>
        </div>
      </div>
    </>
  )
}

export default About
