import axios from "axios";

const BASE_URL = "http://interview.surya-digital.in/get-electronics";

export const step1 = async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}`);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const newData = data.map((item) => ({
      product_id: item.productId ?? null,
      product_name: item.productName ?? null,
      brand_name: item.brandName ?? null,
      category_name: item.category ?? null,
      description_text: item.description ?? null,
      price: item.price ?? null,
      currency: item.currency ?? null,
      processor: item.processor ?? null,
      memory: item.memory ?? null,
      release_date: item.releaseDate ?? null,
      average_rating: item.averageRating ?? null,
      rating_count: item.ratingCount ?? null,
    }));

    return res.status(200).json(newData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const step2 = async (req, res) => {
  try {
    const { release_date_start, release_date_end } = req.query;
    const { data } = await axios.get(`${BASE_URL}`);

    let filtered = data;

    if (release_date_start && release_date_end) {
      filtered = data.filter(
        (item) =>
          item.releaseDate >= release_date_start &&
          item.releaseDate <= release_date_end
      );
    } else if (release_date_end) {
      filtered = data.filter((item) => item.releaseDate <= release_date_end);
    } else if (release_date_start) {
      filtered = data.filter((item) => item.releaseDate >= release_date_start);
    }

    return res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const step3 = async (req, res) => {
  try {
    const { brands, release_date_start } = req.query;
    if (!brands) {
      return res.status(400).json({ message: "Please provide brand(s)" });
    }

    const arr = brands.split(",");
    const { data } = await axios.get(`${BASE_URL}`);

    let filtered = [];

    arr.forEach((brand) => {
      filtered = [
        ...filtered,
        ...data.filter(
          (item) =>
            item.brandName === brand &&
            (!release_date_start || item.releaseDate >= release_date_start)
        ),
      ];
    });

    return res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const step4 = async (req, res) => {
  try {
    const { release_date_start, brands, page_size, page_number } = req.query;
    const { data } = await axios.get(`${BASE_URL}`);

    if (!page_number || !page_size) {
      return res
        .status(400)
        .json({ message: "page_number and page_size are required" });
    }

    let filtered = data;

    if (release_date_start) {
      filtered = filtered.filter(
        (item) => item.releaseDate >= release_date_start
      );
    }
    if (brands) {
      const arr = brands.split(",");
      filtered = filtered.filter((item) => arr.includes(item.brandName));
    }

    const startIdx = (parseInt(page_number) - 1) * parseInt(page_size);
    const endIdx = startIdx + parseInt(page_size);
    const paginated = filtered.slice(startIdx, endIdx);

    if (paginated.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found." });
    }

    return res.status(200).json(paginated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const step5 = async (req, res) => {
  try {
    const resp1 = await axios.get(BASE_URL);
    const resp2 = await axios.get("http://interview.surya-digital.in/get-electronics-brands");

    const products = resp1.data || [];
    const brands = resp2.data || [];

    
    const brandLookup = {};
    for (let b of brands) {
      const addr = b.address;
      const fullAddress = [
        addr.street,
        addr.city,
        addr.state,
        addr.postalCode,
        addr.country,
      ].filter(Boolean).join(", ");

      brandLookup[b.name] = {
        name: b.name,
        year_founded: b.yearFounded,
        company_age: new Date().getFullYear() - (b.yearFounded || 0),
        address: fullAddress
      };
    }

    const result = products.map(p => {
      let brandInfo = brandLookup[p.brandName] || null;
      return {
        product_id: p.productId,
        product_name: p.productName,
        brand: brandInfo,
        category_name: p.category,
        description_text: p.description,
        price: p.price,
        currency: p.currency,
        processor: p.processor,
        memory: p.memory,
        release_date: p.releaseDate,
        average_rating: p.averageRating,
        rating_count: p.ratingCount
      };
    });

    res.json(result);
  } catch (err) {
    console.error("step5 error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

