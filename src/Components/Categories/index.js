import React, { useState, useEffect } from "react";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json))
      .catch((error) => console.log(error));
  }, []);

  // Fetch products based on selected category and sort option
  useEffect(() => {
    const fetchProducts = () => {
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : "https://fakestoreapi.com/products";

      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          let sortedProducts = json;
          if (sortOption === "price-low-to-high") {
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
          } else if (sortOption === "price-high-to-low") {
            sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
          }
          setProducts(sortedProducts);
        })
        .catch((error) => console.log(error));
    };

    fetchProducts();
  }, [selectedCategory, sortOption]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="categories-container">
      <div className="categories-section">
        <h3>Select Category</h3>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="filter-sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            className="sort-dropdown"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
