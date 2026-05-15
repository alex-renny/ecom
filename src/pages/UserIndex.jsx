import React, { useEffect, useState, useRef } from "react";
import "./UserIndex.css";

/* ------------------ SLIDER DATA ------------------ */
const slides = [
  {
    image: "/6c28aa638948b773cdd601b7b4000aa3.jpg",
    title: "Top Tech Gear",
    subtitle: "FOR YOUR LIFESTYLE",
    desc: "Explore the latest gadgets & accessories curated for modern living.",
    btn: "Shop Now",
    badge: "New Collection",
  },
  {
    image: "/ba6b0d98e478d4479280dfa188c892fc.jpg",
    title: "Premium Audio",
    subtitle: "EXPERIENCE PERFECTION",
    desc: "Immerse yourself in crystal-clear sound with our premium headphone collection.",
    btn: "Explore",
    badge: "Best Seller",
  },
  {
    image: "/26c7e76d05c9a6a92fe63898f3a72dc0.jpg",
    title: "Smart Watches",
    subtitle: "STAY CONNECTED",
    desc: "Elegant wearables that blend style with cutting-edge technology.",
    btn: "Buy Now",
    badge: "Trending",
  },
  {
    image: "/680c7c50b31eb8c696353913499727bf.jpg",
    title: "Audio Systems",
    subtitle: "LIMITED OFFER",
    desc: "Transform your space with immersive sound. Special discount up to 20%",
    btn: "Shop Deals",
    badge: "20% OFF",
  },
  {
    image: "/landscapelogo.png",
    title: "Upgrade Setup",
    subtitle: "MODERN LIVING",
    desc: "Discover technology that enhances your daily life and workflow.",
    btn: "Discover",
    badge: "Featured",
  },
];

/* ------------------ CATEGORIES DATA ------------------ */
const categories = [
  { icon: "🎧", name: "Audio", count: "124 Products" },
  { icon: "⌚", name: "Wearables", count: "86 Products" },
  { icon: "🎮", name: "Gaming", count: "203 Products" },
  { icon: "📱", name: "Mobile", count: "167 Products" },
  { icon: "💻", name: "Laptops", count: "92 Products" },
  { icon: "📷", name: "Cameras", count: "54 Products" },
];

/* ------------------ PRODUCT DATA ------------------ */
const products = [
  { 
    image: "/e171759e7d467cdfb6d71dab95bc717d.jpg", 
    name: "Premium Ear Buds", 
    price: "₹2,999", 
    rating: 4.8,
    badge: "Hot",
    category: "Audio"
  },
  { 
    image: "/0afdaedd901ba200ba2bc743826fe39b.jpg", 
    name: "Studio Amplifier", 
    price: "₹4,499", 
    rating: 4.6,
    badge: "New",
    category: "Audio"
  },
  { 
    image: "/493b0ef3cc78b862833466a8dcee9177.jpg", 
    name: "Pro Microphone", 
    price: "₹1,999", 
    rating: 4.9,
    badge: "Sale",
    category: "Audio"
  },
  { 
    image: "/dd28a7f9625c4aed8bd404292eefb993.jpg", 
    name: "Gaming Mouse", 
    price: "₹1,299", 
    rating: 4.7,
    badge: "",
    category: "Gaming"
  },
  { 
    image: "/59d27209abef2f51779cd8e4d56b2bc0.jpg", 
    name: "Mechanical Keyboard", 
    price: "₹3,499", 
    rating: 4.8,
    badge: "Best",
    category: "Gaming"
  },
];

function UserIndex() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrollY, setScrollY] = useState(0);
  const productsRef = useRef(null);

  /* AUTO SLIDE */
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  /* SCROLL TRACKING */
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* NEXT SLIDE */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  /* PREVIOUS SLIDE */
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="premium-index">
      {/* HERO SLIDER */}
      <section 
        className="hero-slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
              <span className="hero-badge">{slide.badge}</span>
              <h1 className="hero-title">
                {slide.title}
                <span className="hero-subtitle">{slide.subtitle}</span>
              </h1>
              <p className="hero-desc">{slide.desc}</p>
              <button className="hero-btn">
                <span>{slide.btn}</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="hero-decor">
              <div className="decor-circle circle-1"></div>
              <div className="decor-circle circle-2"></div>
              <div className="decor-line line-1"></div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button className="slider-nav prev" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Indicators */}
        <div className="slide-progress">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            >
              <span className="dot-fill"></span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="features-strip">
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>Fast Delivery</h4>
            <p>2-3 business days</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>Secure Payment</h4>
            <p>100% protected</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>Easy Returns</h4>
            <p>30-day policy</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>24/7 Support</h4>
            <p>Always here</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-label">Browse</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-desc">Find exactly what you're looking for</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-info">
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </div>
              <div className="category-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-section">
        <div className="section-header">
          <span className="section-label">Featured</span>
          <h2 className="section-title">Premium Products</h2>
          <p className="section-desc">Handpicked for quality and performance</p>
        </div>

        <div className="product-scroll-container">
          <div className="product-track">
            {[...products, ...products].map((item, index) => (
              <div key={index} className="product-card">
                <div className="product-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  {item.badge && (
                    <span className="product-badge">{item.badge}</span>
                  )}
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                    <div className="product-actions">
                      <button className="action-btn wishlist">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="action-btn cart">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(item.rating) ? 'filled' : ''}`}>★</span>
                      ))}
                    </div>
                    <span className="rating-number">{item.rating}</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="newsletter-cta">
        <div className="cta-content">
          <div className="cta-text">
            <span className="cta-label">Stay Updated</span>
            <h2>Get Exclusive Deals</h2>
            <h5>Connect With Us</h5>
            <p>facinova@gmail.com</p>
          </div>
        </div>
        <div className="cta-decoration">
          <div className="cta-circle c1"></div>
          <div className="cta-circle c2"></div>
          <div className="cta-circle c3"></div>
        </div>
      </section>
    </div>
  );
}

export default UserIndex;