import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', inStock: true });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', inStock: true });
  const [showProducts, setShowProducts] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchProducts();
    // eslint-disable-next-line
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          inStock: form.inStock,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add product");
      }
      setForm({ name: '', description: '', price: '', inStock: true });
      fetchProducts();
      setShowAddModal(false);
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete product");
      }
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          price: parseFloat(editForm.price),
          inStock: editForm.inStock,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update product");
      }
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelEdit = () => setEditingId(null);

  if (loading) {
    return (
      <div className="centered-container">
        <h1>Welcome to your Dashboard!</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-container">
        <h1>Welcome to your Dashboard!</h1>
        <p>Error loading products: {error}</p>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  if (!showProducts) {
    return (
      <div className="centered-container">
        <h1>Welcome to your Dashboard!</h1>
        <p>You are logged in. 🎉</p>
        <button className="btn btn-primary" onClick={() => setShowProducts(true)}>See Products</button>
        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        <h1 className="dashboard-title">Products Dashboard</h1>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Product</button>
        </div>

        {showAddModal && (
          <>
            <div className="modal-overlay" onClick={() => setShowAddModal(false)} />
            <div className="modal">
              <h2>Add Product</h2>
              <form onSubmit={handleAddProduct} className="form-column">
                <input
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                  min="0"
                  step="0.01"
                />
                <label className="checkbox-label">
                  <input
                    name="inStock"
                    type="checkbox"
                    checked={form.inStock}
                    onChange={handleFormChange}
                  /> In Stock
                </label>
                <div className="form-buttons">
                  <button type="button" className="btn btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={adding}>{adding ? "Adding..." : "Add Product"}</button>
                </div>
                {addError && <p className="error-text">{addError}</p>}
              </form>
            </div>
          </>
        )}

        <hr />
        <h2 className="section-title">Products ({products.length})</h2>

        {products.length === 0 ? (
          <p>No products found. Add some products to your database!</p>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                {editingId === product._id ? (
                  <form onSubmit={handleEditProduct} className="form-column">
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                      required
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditFormChange}
                      required
                    />
                    <input
                      name="price"
                      type="number"
                      value={editForm.price}
                      onChange={handleEditFormChange}
                      required
                      min="0"
                      step="0.01"
                    />
                    <label className="checkbox-label">
                      <input
                        name="inStock"
                        type="checkbox"
                        checked={editForm.inStock}
                        onChange={handleEditFormChange}
                      /> In Stock
                    </label>
                    <div>
                      <button className="btn btn-primary" type="submit">Save</button>
                      <button className="btn btn-cancel" type="button" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="product-name">{product.name}</h3>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}</p>
                    <button className="btn btn-edit" onClick={() => startEdit(product)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
