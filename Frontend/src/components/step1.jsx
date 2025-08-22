/*
product_id: [ID_FROM_API_HERE],
product_name: [NAME_FROM_API_HERE],
brand_name: [BRAND_FROM_API_HERE],
category_name: [CATEGORY_FROM_API_HERE],
description_text: [DESCRIPTION_FROM_API_HERE],
price: [PRICE_FROM_API_HERE],
currency: [CURRENCY_FROM_API_HERE],
processor: [PROCESSOR_FROM_API_HERE],
memory: [MEMORY_FROM_API_HERE],
release_date: [RELEASE_DATE_FROM_API_HERE],
average_rating: [AVERAGE_RATING_FROM_API_HERE],
rating_count: [RATING_COUNT_FROM_API_HERE],
*/

import { useState, useEffect } from "react";
import axios from "axios";

export default function Step1() {
  const [api, setApi] = useState([]);

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
          <div className="text-lg">
            <p>product_id: {item.productId}</p>
            <p>product_name: {item.productName}</p>
            <p>brand_name: {item.brandName}</p>
            <p>category_name: {item.category}</p>
            <p>description_text: {item.description}</p>
            <p>price: {item.price} </p>
            <p>currency: {item.currency}</p>
            <p>processor: {item.processor}</p>
            <p>memory: {item.memory}</p>
            <p>release_date: {item.releaseDate}</p>
            <p>average_rating: {item.averageRating}</p>
            <p>rating_count: {item.ratingCount}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
