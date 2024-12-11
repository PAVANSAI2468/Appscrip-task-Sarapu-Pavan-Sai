import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Categories = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    men: false,
    women: false,
    kids: false,
    occasion: "all",
    work: "all",
    fabric: "all",
    segment: "all",
    suitableFor: "all",
    rawMaterial: "all",
    pattern: "all",
  });

  const [sortOption, setSortOption] = useState("newest");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from the provided API based on selected filters
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products", {
          params: {
            category: filters.men
              ? "men"
              : filters.women
              ? "women"
              : filters.kids
              ? "kids"
              : undefined,
            occasion: filters.occasion !== "all" ? filters.occasion : undefined,
            work: filters.work !== "all" ? filters.work : undefined,
            fabric: filters.fabric !== "all" ? filters.fabric : undefined,
            segment: filters.segment !== "all" ? filters.segment : undefined,
            suitableFor:
              filters.suitableFor !== "all" ? filters.suitableFor : undefined,
            sort: sortOption,
          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially show the fetched products
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchFilteredProducts();
  }, [filters, sortOption]); // Rerun fetch when filters or sortOption change

  // Apply the filter to the fetched products
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      // Filter by category (Men, Women, Kids)
      if (filters.men) {
        filtered = filtered.filter((product) =>
          product.category.toLowerCase().includes("men")
        );
      }
      if (filters.women) {
        filtered = filtered.filter((product) =>
          product.category.toLowerCase().includes("women")
        );
      }
      if (filters.kids) {
        filtered = filtered.filter((product) =>
          product.category.toLowerCase().includes("kids")
        );
      }

      // Filter by other criteria (Occasion, Work, etc.)
      if (filters.occasion !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.occasion?.toLowerCase() === filters.occasion.toLowerCase()
        );
      }

      if (filters.work !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.work?.toLowerCase() === filters.work.toLowerCase()
        );
      }

      if (filters.fabric !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.fabric?.toLowerCase() === filters.fabric.toLowerCase()
        );
      }

      if (filters.segment !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.segment?.toLowerCase() === filters.segment.toLowerCase()
        );
      }

      if (filters.suitableFor !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.suitableFor?.toLowerCase() ===
            filters.suitableFor.toLowerCase()
        );
      }

      // Sorting products
      if (sortOption === "price-low-high") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price-high-low") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }

      if (sortOption === "newest") {
        filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      // Update the filtered products list
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, sortOption, products]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="categories-container">
      <button
        className="filter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`categories-section ${showFilters ? "show" : ""}`}>
        <h2>Categories</h2>
        <div className="checkbox-group">
          <h3>Ideal For</h3>
          <label>
            <input
              type="checkbox"
              name="men"
              checked={filters.men}
              onChange={handleCheckboxChange}
            />{" "}
            Men
          </label>
          <label>
            <input
              type="checkbox"
              name="women"
              checked={filters.women}
              onChange={handleCheckboxChange}
            />{" "}
            Women
          </label>
          <label>
            <input
              type="checkbox"
              name="kids"
              checked={filters.kids}
              onChange={handleCheckboxChange}
            />{" "}
            Kids
          </label>
        </div>

        <div className="checkbox-group">
          <h3>Occasion</h3>
          <select
            name="occasion"
            value={filters.occasion}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        <div className="checkbox-group">
          <h3>Work Type</h3>
          <select
            name="work"
            value={filters.work}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="office">Office</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="checkbox-group">
          <h3>Fabric</h3>
          <select
            name="fabric"
            value={filters.fabric}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="cotton">Cotton</option>
            <option value="wool">Wool</option>
          </select>
        </div>

        <div className="checkbox-group">
          <h3>Segment</h3>
          <select
            name="segment"
            value={filters.segment}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="premium">Premium</option>
            <option value="budget">Budget</option>
          </select>
        </div>

        <div className="checkbox-group">
          <h3>Suitable For</h3>
          <select
            name="suitableFor"
            value={filters.suitableFor}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
          </select>
        </div>
      </div>

      <div className="recommended-section">
        <h3>Recommended Products</h3>
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="recommended-items">
          {filteredProducts.length === 0 ? (
            <p>No products found with the selected filters</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
