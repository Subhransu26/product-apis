import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Step3() {
  const [api, setApi] = useState([]);
  const [apifilter, setApiFilter] = useState([]);

  const [searchParams] = useSearchParams();

  const brandName = searchParams.get("brands");
  const releaseDateStart = searchParams.get("release_date_start");
  const releaseDateEnd = searchParams.get("release_date_end");

  const fetchApi = async () => {
    try {
      const response = await axios.get(
        "http://interview.surya-digital.in/get-electronics"
      );
      setApi(response.data);
    } catch (err) {
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

  const applyAllFilters = (items) => {
    if (!isValidDate(releaseDateStart) || !isValidDate(releaseDateEnd)) {
      return [];
    }

    let filtered = items;

    if (releaseDateStart || releaseDateEnd) {
      filtered = filtered.filter((product) => {
        const productDate = new Date(product.releaseDate);

        const startDate = releaseDateStart ? new Date(releaseDateStart) : null;
        const endDate = releaseDateEnd ? new Date(releaseDateEnd) : null;

        //    start date
        if (startDate && productDate < startDate) {
          return false;
        }

        //    end date
        if (endDate && productDate > endDate) {
          return false;
        }

        return true;
      });
    }

    if (brandName) {
      const brandList = brandName
        .split(",")
        .filter((brand) => brand.length > 0);
      
      if (brandList.length > 0) {
        filtered = filtered.filter((item) =>
          brandList.some(
            (brand) =>
              brand &&
              item.brandName &&
              item.brandName.toLowerCase() === brand.toLowerCase()
          )
        );
      }
    }

    return filtered;
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (api.length > 0) {
      const filtered = applyAllFilters(api);
      setApiFilter(filtered);
    }
  }, [api, brandName, releaseDateStart, releaseDateEnd]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Step 3: Add Brand Filters</h1>
      
      {apifilter.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No products found.</div>
      ) : (
        <ul className="space-y-4">
          {apifilter.map((item) => (
            <li key={item.productId}>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}