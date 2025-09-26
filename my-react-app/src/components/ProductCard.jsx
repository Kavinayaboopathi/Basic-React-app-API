import React from 'react';

function ProductCard({ name, price, description, onEdit, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      width: '220px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>{name}</h3>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Price: ${price}</p>
        {description && <p style={{ margin: '5px 0', color: '#555' }}>{description}</p>}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button
          style={{ flex: 1, background: '#007bff', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          style={{ flex: 1, background: '#dc3545', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
