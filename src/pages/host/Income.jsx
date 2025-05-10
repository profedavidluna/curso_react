import incomeGraph from "../../assets/images/income-graph.png"
import PageTitle from "../../components/PageTitle"
import { hostVanId } from "../../utils/hostVanId"
function Income() {
  const transactionsData = [
    { amount: "720.00", date: "03.01.24", id: "1" },
    { amount: "1,650.00", date: "11.12.23", id: "2" },
    { amount: "2,725.00", date: "18.11.23", id: "3" },
    { amount: "3,000.00", date: "05.10.23", id: "4" },
    { amount: "1,285.00", date: "07.09.23", id: "5" },
    { amount: "4,000.00", date: "30.08.23", id: "36" },
  ]
  return (
    <>
      <PageTitle title={`Host id.${hostVanId} | Income | VanLife`} />

      <section className="hosts-container  content-container hosts-income">
        <h2>Income</h2>
        <p>
          Last 6 months: <b>&#36;9,780.00</b>
        </p>
        <img
          className="graph"
          src={incomeGraph}
          alt="Income graph"
          width="986"
          loading="lazy"
        />
        <table>
          <caption>Transaction history</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount (&#36;)</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Income
