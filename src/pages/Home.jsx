import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="landing-container">

      {/* Hero Section */}
      <section className="hero-section">
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
            <button className="shop-btn">Shop Now</button>
            <button className="explore-btn">Explore</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="glow-circle"></div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="shopping"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Premium Quality</h3>
          <p>
            Carefully selected products with world-class quality and modern
            aesthetics.
          </p>
        </div>

        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>
            Quick and secure delivery experience designed for customer
            satisfaction.
          </p>
        </div>

        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>
            Trusted payment methods with complete security and reliability.
          </p>
        </div>
      </section>

      {/* Collection Section */}
      <section className="collection-section">
        <h2>Trending Collections</h2>

        <div className="collection-grid">

            <div className="collection-card">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt="Shoes"
            />
            <div className="overlay">
              <h3>Luxury Sneakers</h3>
            </div>
          </div>

          <div className="collection-card">
            <img
              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
              alt="Camera"
            />
            <div className="overlay">
              <h3>Modern Gadgets</h3>
            </div>
          </div>

          <div className="collection-card">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Headphones"
            />
            <div className="overlay">
              <h3>Premium Audio</h3>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home