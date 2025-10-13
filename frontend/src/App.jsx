import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = () => {
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("text", reviewText);

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setReviewText(""); // Clear the textarea
        fetchData(); // Refresh the data
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Product Reviews</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Reviews:</h2>
        <ul className="list-disc list-inside mb-4">
          {data.reviews.map((review, index) => (
            <li key={index} className="text-gray-700">
              {review}
            </li>
          ))}
        </ul>

        <div className="flex justify-between mb-6">
          <span className="text-green-600 font-semibold">
            Positive: {data.positive}
          </span>
          <span className="text-red-600 font-semibold">
            Negative: {data.negative}
          </span>
        </div>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <textarea
              name="text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 mt-5 rounded-2xl text-white cursor-pointer py-2 px-4 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;