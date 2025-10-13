import { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error:", err));
  }, []);

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

        <div className="flex justify-between">
          <span className="text-green-600 font-semibold">
            Positive: {data.positive}
          </span>
          <span className="text-red-600 font-semibold">
            Negative: {data.negative}
          </span>
        </div>
        <div className=" flex">
          <form>
            <textarea name="text"></textarea>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
