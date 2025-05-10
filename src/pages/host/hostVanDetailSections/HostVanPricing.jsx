import { useOutletContext } from "react-router-dom"
import { hostVanId } from "../../../utils/hostVanId"
import PageTitle from "../../../components/PageTitle"

function HostVanPricing() {
  const { van } = useOutletContext()
  return (
    <>
      <PageTitle
        title={`Host id.${hostVanId} | Vans | ${van.name} Pricing | VanLife`}
      />
      <section className="host-vans-section">
        <h2 className="visually-hidden">Prices</h2>
        <ul className="text-list">
          <li>
            <p>&#36;{van.price}/day</p>
          </li>
        </ul>
      </section>
    </>
  )
}

export default HostVanPricing
