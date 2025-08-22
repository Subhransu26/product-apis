import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Step2() {
  const [api, setApi] = useState([]);
  const [apifilter, setApiFilter] = useState([]);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();

  const releaseDateStart = searchParams.get("release_date_start");
  const releaseDateEnd = searchParams.get("release_date_end");

  const fetchApi = async () => {
    try {
      setError(null);
      const response = await axios.get(
        "http://interview.surya-digital.in/get-electronics"
      );
      setApi(response.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("API Error:", err);
    }
  };

  const isValidDate = (dateString) => {
    if (!dateString) return true;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return (
      date instanceof Date &&
      !isNaN(date) &&
      date.toISOString().slice(0, 10) === dateString
    );
  };

  const filterByDateRange = (products) => {
    if (!isValidDate(releaseDateStart) || !isValidDate(releaseDateEnd)) {
      setError("Invalid date format. Please use YYYY-MM-DD format.");
      return [];
    }

    // incase nofilter, return all product
    if (!releaseDateStart && !releaseDateEnd) {
      return products;
    }

    return products.filter((product) => {
      const productDate = new Date(product.releaseDate);

      const startDate = releaseDateStart ? new Date(releaseDateStart) : null;
      const endDate = releaseDateEnd ? new Date(releaseDateEnd) : null;

      //   start date
      if (startDate && productDate < startDate) {
        return false;
      }

      //    end date
      if (endDate && productDate > endDate) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (api.length > 0) {
      const filtered = filterByDateRange(api);
      setApiFilter(filtered);
    }
  }, [api, releaseDateStart, releaseDateEnd]);

  if (error) {
    return (
      <div className="p-4">
        <div className="text-4xl text-red-400 py-2">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Step 2: Add Release Date Filters
      </h1>

      {apifilter.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No products found for the specified date range.
        </div>
      ) : (
        <ul className="space-y-4">
          {apifilter.map((item, index) => (
            <li key={item.productId || index}>
              <h2 className="text-xl font-bold text-blue-600">
                {item.productName}
              </h2>
              <div className="text-lg">
                <p>product_id: {item.productId}</p>
                <p>Brand: {item.brandName}</p>
                <p>Category: {item.category}</p>
                <p>Description: {item.description}</p>
                <p>Price: {item.price} {item.currency}</p>
                <p>Processor: {item.processor}</p>
                <p>Memory: {item.memory}</p>
                <p>Release Date: {item.releaseDate}</p>
                <p>Average Rating: {item.averageRating}</p>
                <p>Rating Count: {item.ratingCount}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
