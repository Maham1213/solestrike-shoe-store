import React, { useState } from 'react';
import './App.css';

const initialShoes = [
  { id: 1, name: "Air Max Pro Kicks", category: "Sneakers", price: 3950, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\.png"},
  { id: 2, name: "Premium Office Loafers", category: "Formal", price: 3950, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 122017.png" },
  { id: 3, name: "Alpha Track Joggers", category: "Sports", price: 3400, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 122110.png" },
  { id: 4, name: "Retro White High-Tops", category: "Sneakers", price: 2900, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 121906.png" },
  { id: 5, name: "Classic Suede Oxfords", category: "Formal", price: 3600, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 121833.png" },
  { id: 6, name: "HyperLight Running Shoes", category: "Sports", price: 3400, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 121753.png" },
  { id: 7, name: "Urban Skater Sneaker", category: "Sneakers", price: 3200, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 121716.png" },
  { id: 8, name: "Executive Dress Shoes", category: "Formal", price: 3800, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 121609.png" },
  { id: 9, name: "Pro-Trainer Slip-Ons", category: "Sports", price: 3950, img: "c:\Users\DELL\OneDrive\Pictures\Screenshots\Screenshot 2026-10-31 121458.png" }
];

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  
  // Client Order Details States
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const addToCart = (shoe) => {
    const existing = cart.find(item => item.id === shoe.id);
    if (existing) {
      setCart(cart.map(item => item.id === shoe.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...shoe, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientAddress) {
      return alert("Please fill all fields to complete your order!");
    }
    
    alert(`🎉 Success! Thank you ${clientName}. Your order for ${cart.reduce((a, b) => a + b.qty, 0)} items has been placed successfully via Cash on Delivery.`);
    
    // Clear cart and form after order placement
    setCart([]);
    setClientName('');
    setClientPhone('');
    setClientAddress('');
  };

  const filteredShoes = activeTab === "All" 
    ? initialShoes 
    : initialShoes.filter(shoe => shoe.category === activeTab);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div>
      {/* Branded Logo Header Area */}
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo-icon">SS</div>
          <div className="logo-text">SOLESTRIKE LABS</div>
        </div>
        <div className="cart-counter">
          🛒 System Cart: {cart.reduce((a, b) => a + b.qty, 0)}
        </div>
      </nav>

      <div className="tabs-container">
        {["All", "Sneakers", "Formal", "Sports"].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredShoes.map(shoe => (
          <div key={shoe.id} className="product-card">
            <img src={shoe.img} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>Rs. {shoe.price}</p>
            <button className="btn" onClick={() => addToCart(shoe)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Shopping Cart and Professional Checkout Order Module */}
      <div className="cart-section">
        <h2>📦 Order Checkout Console</h2>
        {cart.length === 0 ? <p style={{color: '#94a3b8'}}>Your workspace cart is empty.</p> : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name} (x{item.qty})</h4>
                  <p style={{color: '#00f2fe'}}>Rs. {item.price * item.qty}</p>
                </div>
                <button className="btn" style={{ background: '#ef4444', color: 'white', width: 'auto' }} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <h3 style={{ marginTop: '20px', color: '#00f2fe' }}>Total Amount: Rs. {cartTotal}</h3>

            {/* Professional Order Form Submission */}
            <div className="order-form-container">
              <h3 style={{color: '#fff', marginBottom: '20px'}}>✨ Complete Your Order (Cash on Delivery)</h3>
              <form onSubmit={handlePlaceOrder}>
                <input type="text" placeholder="Full Name" className="form-input" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                <input type="text" placeholder="Phone Number" className="form-input" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
                <textarea placeholder="Complete Delivery Address" className="form-input" rows="3" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} style={{resize: 'none'}}></textarea>
                <button type="submit" className="btn" style={{marginTop: '10px'}}>Confirm & Place Order</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
