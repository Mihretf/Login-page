import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to your Dashboard!</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to your Dashboard!</h1>
        <p>Error loading products: {error}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to your Dashboard!</h1>
      <p>You are logged in. 🎉</p>
      
      <h2>Products ({products.length})</h2>
      {products.length === 0 ? (
        <p>No products found. Add some products to your database!</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          {products.map((product) => (
            <div key={product._id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={handleLogout} style={{ marginTop: "2rem" }}>Logout</button>
    </div>
  );
}
