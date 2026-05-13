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

      {/* Testimonial / Brand Statement */}
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
            <p className="quote-author">— The Facinova Manifesto</p>
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
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="footer-section">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <h2 className="footer-logo">FACINOVA</h2>
              <p>Maison de Couture Est. 2024</p>
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
            <p>© 2026 Facinova. All rights reserved.</p>
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