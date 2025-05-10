import { useOutletContext } from "react-router-dom"

function HostVanInfo() {
  const { van } = useOutletContext()
  return (
    <section className="host-vans-section">
      <h2 className="visually-hidden">Details</h2>
      <ul className="text-list">
        <li>
          <span>Type</span>:{" "}
          <span className={`van-type ${van.type}`}>{van.type}</span>
        </li>
        <li>
          <span>Description</span>: <p>{van.description}</p>
        </li>
        <li>
          <span>Visibility</span>: Public
        </li>
      </ul>
    </section>
  )
}

export default HostVanInfo
