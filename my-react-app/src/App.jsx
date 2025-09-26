import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Edit form state
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // 🔹 Search state
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, price: newPrice, description: newDesc })
    });
    setNewName('');
    setNewPrice('');
    setNewDesc('');
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  // Start editing a product
  const startEdit = (product) => {
    setEditId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditDesc(product.description);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditPrice('');
    setEditDesc('');
  };

  // Save edited product
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, price: editPrice, description: editDesc })
    });
    cancelEdit();
    fetchProducts();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Products</h1>

      {/* 🔹 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '250px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />
        {/* <button type="submit">Add</button> */}
         <button
          style={{ flex: 1, background: '#007bff', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
          onClick={handleAddProduct}
        >
          ADD
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && products.length === 0 && <p>No products found</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {products
          // 🔹 Filter products before mapping
          .filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase())
          )
          .map(p => (
            <div key={p._id} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 5 }}>
              {editId === p._id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEdit}>Cancel</button>
                </form>
              ) : (
                <>
                  <ProductCard
                    name={p.name}
                    price={p.price}
                    description={p.description}
                    onEdit={() => startEdit(p)}
                    onDelete={() => handleDelete(p._id)}
                  />
                  {/* <button onClick={() => startEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button> */}
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
