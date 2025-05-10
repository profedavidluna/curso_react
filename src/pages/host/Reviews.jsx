import reviewsGraph from "../../assets/images/reviews-graph.png"
import { BsStarFill } from "react-icons/bs"
import PageTitle from "../../components/PageTitle"
import { hostVanId } from "../../utils/hostVanId"
function Reviews() {
  const reviewsData = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2024",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 5,
      name: "Sandy",
      date: "December 12, 2023",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ]
  return (
    <>
      <PageTitle title={`Host id.${hostVanId} | Reviews | VanLife`} />
      <section className="hosts-container  content-container hosts-reviews">
        <h2>Reviews</h2>
        <p>
          Last <span>30 days</span>
        </p>
        <img
          className="graph"
          src={reviewsGraph}
          alt="Review graph"
          width="986"
          loading="lazy"
        />
        <h3>Reviews (2)</h3>
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="review"
          >
            {[...Array(review.rating)].map((_, i) => (
              <BsStarFill
                className="review-star"
                key={i}
                aria-hidden="true"
              />
            ))}
            <p className="visually-hidden">Rating: {review.rating} stars</p>
            <ul>
              <li>{review.name}</li>
              <li>{review.date}</li>
            </ul>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default Reviews
