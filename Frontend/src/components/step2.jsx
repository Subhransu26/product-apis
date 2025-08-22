/* 
Step 2: Add Release Date Filters
For the second step, please create an API endpoint called /step2 that extends the functionality from Step 1 by adding date filtering capabilities. This endpoint should accept optional query parameters release_date_start and release_date_end. Note that the date filters are inclusive of both dates.

API Usage Examples:

/step2?release_date_start=2025-01-31&release_date_end=2025-03-18: Returns all products whose release date is between 31 January and 18 March, 2025 (inclusive of both dates)
/step2?release_date_start=2024-12-19: Returns all products whose release date is on or after 19th December, 2024
/step2?release_date_end=2025-02-10: Returns all products released on or before 10th February 2025
/step2: Returns all products exactly the same way as the /step1 API from the previous step
Requirements:

Use the same JSON response structure as Step 1
Handle query parameter errors (such as incorrect date formats, etc.) with a 400 status code and descriptive error message
Both query parameters are optional and can be used independently
If there are no items found in the response for a given date filter range, return an empty array to the caller

{
    "productId": "SKU-LPTP-001",
    "productName": "Innovatech ProBook X1",
    "brandName": "Innovatech",
    "category": "Laptops",
    "description": "A high-performance laptop for professionals, featuring a powerful processor and a sleek, durable design for productivity on the go.",
    "price": 1299.99,
    "currency": "USD",
    "discountPercentage": 5,
    "stockQuantity": 85,
    "warehouseLocation": "Warehouse C, Sector 2",
    "sku": "INVT-PBX1-2025-512",
    "processor": "Innovatech Fusion Z1",
    "memory": "16GB DDR5",
    "storageCapacity": "512GB SSD",
    "displaySize": "14 inches",
    "isAvailable": true,
    "releaseDate": "2025-01-20",
    "lastUpdated": "2024-08-01T10:00:00Z",
    "averageRating": 4.7,
    "ratingCount": 312,
    "warrantyDurationMonths": 24,
    "weight_kg": 1.4
  },
*/

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Step2() {
  const [api, setApi] = useState([]);
  const [releaseDateStart, setReleaseDateStart] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");

  const { releaseDate, lastUpdated } = useParams();

  const fetchApi = async () => {
    const response = await axios.get(
      "http://interview.surya-digital.in/get-electronics"
    );
    setApi(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Data</h1>
      <ul className="space-y-2">
        {api.map((item) => (
          <li key={item.id}>
            <h2 className="text-xl font-semibold">{item.productName}</h2>
            <p>Brand: {item.brandName}</p>
            <p>Category: {item.categoryName}</p>
            <p>Description: {item.descriptionText}</p>
            <p>Price: {item.price} {item.currency}</p>
            <p>Processor: {item.processor}</p>
            <p>Memory: {item.memory}</p>
            <p>Release Date: {item.releaseDate}</p>
            <p>Average Rating: {item.averageRating}</p>
            <p>Rating Count: {item.ratingCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
