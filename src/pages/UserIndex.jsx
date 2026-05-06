import React, { useEffect, useState } from "react";
import "./UserIndex.css";

/* ------------------ SLIDER DATA ------------------ */
const slides = [
  {
    image: "/pngtree-gadgets-in-a-striking-3d-dim-environment-picture-image_7276667.jpg",
    title: "Top Tech Gear for Your Lifestyle",
    desc: "Explore the latest gadgets & accessories.",
    btn: "Shop Now",
    className: "slide1",
  },
  {
    image: "/0d8c0b01a9cc6cb914035d9f1ad4206c.jpg",
    title: "Premium Headphones Collection",
    desc: "Experience sound like never before.",
    btn: "Explore",
    className: "slide2",
  },
  {
    image: "/26c7e76d05c9a6a92fe63898f3a72dc0.jpg",
    title: "Smart Watches & Wearables",
    desc: "Stay connected in style.",
    btn: "Buy Now",
    className: "slide3",
  },
  {
    image: "/680c7c50b31eb8c696353913499727bf.jpg",
    title: "Latest Audio Systems",
    desc: "Special discount up to 20%",
    btn: "Shop Deals",
    className: "slide4",
  },
  {
    image: "/landscapelogo.png",
    title: "Upgrade Your Setup",
    desc: "Modern tech for modern life.",
    btn: "Discover",
    className: "slide5",
  },
];


/* ------------------ PRODUCT DATA ------------------ */
const products = [
  { image: "/e171759e7d467cdfb6d71dab95bc717d.jpg", name: "Ear Buds", price: "₹2,999" },
  { image: "/0afdaedd901ba200ba2bc743826fe39b.jpg", name: "Amplifier", price: "₹4,499" },
  { image: "/493b0ef3cc78b862833466a8dcee9177.jpg", name: "Microphone", price: "₹1,999" },
  { image: "/dd28a7f9625c4aed8bd404292eefb993.jpg", name: "Gaming Mouse", price: "₹1,299" },
  { image: "/59d27209abef2f51779cd8e4d56b2bc0.jpg", name: "Mechanical Keyboard", price: "₹3,499" },
];

function UserIndex() {
  const [current, setCurrent] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* NEXT */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  /* PREVIOUS */
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* HERO SLIDER */}
      <div className="hero">
        <button className="nav left" onClick={prevSlide}>
          ❮
        </button>

        <button className="nav right" onClick={nextSlide}>
          ❯
        </button>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${slide.className} ${
              index === current ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="overlay"></div>

            <div className="content">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <button>{slide.btn}</button>
            </div>
          </div>
        ))}
      </div>


      {/* PRODUCT SCROLLER */}
      <div className="product-section">
        <h2 className="section-title">Featured Products</h2>

        <div className="card-wrapper">
          <div className="card-track">
            {[...products, ...products].map((item, index) => (
              <div className="product-card" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <button className="product-card-button">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserIndex;