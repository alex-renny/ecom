import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate=useNavigate()
  
  const handleshop=()=>{
    navigate('/Login')
  }

  const [activeCategory, setActiveCategory] = useState('all');

  // const categories = ['All', 'New Arrivals', 'Best Sellers', 'Accessories', 'Footwear'];
  
  const products = [
    { id: 1, name: 'Classic Leather Watch', price: 299.99, rating: 4.8, image: '⌚', badge: 'New' },
    { id: 2, name: 'Premium Sunglasses', price: 189.99, rating: 4.6, image: '🕶️', badge: 'Hot' },
    { id: 3, name: 'Designer Handbag', price: 459.99, rating: 4.9, image: '👜', badge: 'Sale' },
    { id: 4, name: 'Luxury Footwear', price: 349.99, rating: 4.7, image: '👞', badge: 'New' },
  ];

  return (
    <div className="landing-container">

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <p className="tagline">PREMIUM SHOPPING EXPERIENCE</p>

          <h1>
            Welcome to <span>FACINOVA</span>
          </h1>

          <p className="hero-description">
            Discover luxury fashion, premium gadgets, and modern lifestyle
            essentials crafted for people who love elegance and style.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn" onClick={handleshop}>Shop Now</button>
            <button className="explore-btn" onClick={handleshop}>Explore</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="glow-circle"></div>

          <img
            src="/cf4cb43e-ba1d-4968-886c-fec76063d92f-Photoroom.png"
            alt="shopping"
          />
        </div>

        {/* <div className="hero-visual">
          <div className="floating-card card1">
            <span className="card-emoji">👗</span>
            <p>Exclusive Designs</p>
          </div>
          <div className="floating-card card2">
            <span className="card-emoji">💎</span>
            <p>Premium Quality</p>
          </div>
          <div className="floating-card card3">
            <span className="card-emoji">🚀</span>
            <p>Fast Delivery</p>
          </div>
        </div> */}

      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Premium Materials</h3>
              <p>We source only the finest, sustainable fabrics from heritage mills across Italy and Japan.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Timeless Design</h3>
              <p>Pieces that transcend seasons. Designed to be worn, loved, and passed down.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3>Crafted with Care</h3>
              <p>Every stitch, seam, and finish is meticulously checked by our artisans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}

      <section className="categories-section" id="shop">
        <div className="section-header">
          <p className="section-subtitle">Curated For You</p>
          <h2 className="section-title">Trending Categories</h2>
          <p className="section-description">
            Explore our handpicked collections designed for the discerning taste
          </p>
        </div>
        
        {/* <div className="category-filters">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeCategory === cat.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.toLowerCase())}
            >
              {cat}
            </button>
          ))}
        </div> */}

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
                <span className="product-badge">{product.badge}</span>
                {/* <div className="product-overlay">
                  <button className="add-to-cart">Add to Cart</button>
                  <button className="wishlist-btn">♡</button>
                </div> */}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  <span>Starting From..</span>
                </div>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Statement */}

      <section className="quote-section">
        <div className="container">
          <div className="quote-content">
            <svg className="quote-mark" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <blockquote>
              Style is a way to say who you are without having to speak. 
              At Facinova, we believe in the quiet confidence of impeccable taste.
            </blockquote>
            <p className="quote-author">— The Facinova </p>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-text">
              <h2>Join the Inner Circle</h2>
              <p>Receive exclusive access to new arrivals, private sales, and style inspiration.</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subs-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="footer-section" id="foot">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <h2 className="footer-logo">FACINOVA</h2>
              <p>Your Satisfaction is our Consern</p><br />
              <h6>Connect with us: </h6>
              <p>facinova@gmail.com</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Explore</h4>
                <ul>
                  <li><a href="#">New In</a></li>
                  <li><a href="#">Women</a></li>
                  <li><a href="#">Men</a></li>
                  <li><a href="#">Accessories</a></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>About</h4>
                <ul>
                  <li><a href="#">Our Story</a></li>
                  <li><a href="#">Craftsmanship</a></li>
                  <li><a href="#">Sustainability</a></li>
                  <li><a href="#">Stores</a></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <ul>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">Returns</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            {/* <p>© 2026 Facinova. All rights reserved.</p> */}
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}

export default Home