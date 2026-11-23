import { useRef, useState, useEffect } from "react";
import { properties } from "./properties";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import BookingSearch from "./BookingSearch";
import Checkout from "./Checkout";

function ContactModal({ onClose }) {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessageSent(true);
  };
  return (
    <div className="contact-overlay">
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <button
          type="button"
          className="contact-close"
          onClick={onClose}
          aria-label="Close contact form"
        >
          ×
        </button>

        <h2 id="contact-title">Get in Touch</h2>

        <p>
          Have a question about a property or your upcoming stay?
          We'd love to hear from you!
        </p>
    {messageSent ? (
  <div className="contact-success" role="status">
    <h3>✓ Message Submitted!</h3>
    <p>
      Thank you for reaching out! This is a demo contact form,
      so no message has actually been sent.
    </p>
    <button
      type="button"
      className="contact-submit"
      onClick={onClose}
    >
      Close
    </button>
  </div>
) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Full name"
            required
          />

          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="contact-message">Your Message</label>
          <textarea
            id="contact-message"
            placeholder="How can we help?"
            rows="4"
            required
          />

          <button type="submit" className="contact-submit">
            Send Message
          </button>
        </form>
        )}
      </div>
    </div>
  );
}

function PropertyGallery({ property }) {
  const images = property.images || [property.image];
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const nextImage = () => {
  setActiveImage((current) => (current + 1) % images.length);
};

const previousImage = () => {
  setActiveImage((current) =>
    (current - 1 + images.length) % images.length
  );
};

useEffect(() => {
  if (!isFullscreen) return;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsFullscreen(false);
    }

    if (event.key === "ArrowRight") {
      setActiveImage((current) => (current + 1) % images.length);
    }

    if (event.key === "ArrowLeft") {
      setActiveImage(
        (current) => (current - 1 + images.length) % images.length
      );
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isFullscreen, images.length]);

  return (
    <div className="property-gallery">
   <div className="gallery-image-container">
<img
  src={images[activeImage]}
  alt={`${property.name} - Photo ${activeImage + 1}`}
  className="gallery-main-image"
  onClick={() => setIsFullscreen(true)}
  style={{ cursor: "zoom-in" }}
/>

  {images.length > 1 && (
    <>
      <button
        type="button"
        className="gallery-arrow gallery-arrow-left"
        onClick={previousImage}
        aria-label="Previous photo"
      >
        &#10094;
      </button>

      <button
        type="button"
        className="gallery-arrow gallery-arrow-right"
        onClick={nextImage}
        aria-label="Next photo"
      >
        &#10095;
      </button>
    </>
  )}
</div>

      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveImage(index)}
            className={activeImage === index ? "active" : ""}
          >
            <img
              src={image}
              alt={`${property.name} thumbnail ${index + 1}`}
            />
          </button>
        ))}
        {isFullscreen && (
  <div
    className="gallery-fullscreen"
    role="dialog"
    aria-modal="true"
    aria-label={`${property.name} photo gallery`}
  >
    <button
      type="button"
      className="fullscreen-close"
      onClick={() => setIsFullscreen(false)}
      aria-label="Close gallery"
    >
      ×
    </button>

    <button
      type="button"
      className="fullscreen-prev"
      onClick={previousImage}
      aria-label="Previous photo"
    >
      &#10094;
    </button>

    <img
      src={images[activeImage]}
      alt={`${property.name} - Photo ${activeImage + 1}`}
      className="fullscreen-image"
    />

    <button
      type="button"
      className="fullscreen-next"
      onClick={nextImage}
      aria-label="Next photo"
    >
      &#10095;
    </button>

    <p className="fullscreen-counter">
      {activeImage + 1} / {images.length}
    </p>
  </div>
)}
      </div>
    </div>
  );
}

function PropertyDetails({ property, bookingDetails, onBack, onReserve }) { 
  const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00Z`);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};
const calculateStay = () => {
  if (!bookingDetails?.checkIn || !bookingDetails?.checkOut) {
    return null;
  }

  const start = new Date(`${bookingDetails.checkIn}T00:00:00Z`);
  const end = new Date(`${bookingDetails.checkOut}T00:00:00Z`);

  const nights = (end - start) / (1000 * 60 * 60 * 24);

  if (nights <= 0) return null;

  return {
    nights,
    subtotal: nights * property.nightlyRate,
  };
};

const stay = calculateStay();
  return (
    <section className="property-details">
      <button type="button" onClick={onBack}>
        ← Back to Properties
      </button>

      <h1>{property.name}</h1>

   <PropertyGallery property={property} />
   <div className="property-content-layout">
  <div className="property-content-main">
   <div className="property-overview"> 
  <div>👥 {property.maxGuests} Guests</div>
  <div>🛏️ {property.beds}</div>
  {property.bathrooms && (
    <div>🛁 {property.bathrooms} Bathroom</div>
  )}
</div>
   {property.description && (
  <div className="property-description">
    <h2>About This Property</h2>
    <p>{property.description}</p>
  </div>
)}

     <p className="property-highlight">{property.feature}</p>

      {property.amenities && (
  <div className="property-amenities">
    <h2>What This Property Offers</h2>

    <ul>
      {property.amenities.map((amenity) => (
        <li key={amenity}>✓ {amenity}</li>
      ))}
    </ul>
  </div>
)}
</div>
  <div className="property-booking-card">
      <h2>${property.nightlyRate} / night</h2>
      {(!bookingDetails?.checkIn || !bookingDetails?.checkOut) && (
  <p className="booking-prompt">
    Select your check-in and check-out dates on the homepage
    to view your stay total and reserve this property.
  </p>
)}
      {bookingDetails?.checkIn && bookingDetails?.checkOut && (
        
  <div className="booking-summary">
    <h3>Your Stay</h3>

  <p>Check-in: {formatDate(bookingDetails.checkIn)}</p>
<p>Check-out: {formatDate(bookingDetails.checkOut)}</p>
<p>Guests: {bookingDetails.guests}</p>
{stay && (
  <>
    <p>
      Number of nights: {stay.nights}
    </p>

   <p className="booking-subtotal">
  <span>Rental subtotal</span>
  <strong>${stay.subtotal.toLocaleString()}</strong>
</p>
  </>
)}
{stay && (
 <button
  type="button"
  className="reserve-button"
  onClick={onReserve}
>
  Reserve Your Stay
</button>
)}
  </div>
)}
</div>
</div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const galleryRef = useRef(null);
 const [bookingDetails, setBookingDetails] = useState(null); 
 const [selectedProperty, setSelectedProperty] = useState(null);
 const [showCheckout, setShowCheckout] = useState(false);
 const [contactOpen, setContactOpen] = useState(false);
 const calculateTotal = (property) => {
  if (!bookingDetails?.checkIn || !bookingDetails?.checkOut) {
    return null;
  }

  const start = new Date(`${bookingDetails.checkIn}T00:00:00Z`);
  const end = new Date(`${bookingDetails.checkOut}T00:00:00Z`);

  const nights = (end - start) / (1000 * 60 * 60 * 24);

  if (nights <= 0) return null;

  return property.nightlyRate * nights;
};

const filteredProperties = properties.filter((property) => {
  return (
    bookingDetails === null ||
    property.maxGuests >= bookingDetails.guests
  );
});

  const scrollGallery = (direction) => {
  if (!galleryRef.current) return;

  const gallery = galleryRef.current;

  gallery.scrollBy({
    left: direction * gallery.clientWidth,
    behavior: "smooth",
  });
};

if (showCheckout && selectedProperty && bookingDetails) {
  return (
    <Checkout
      property={selectedProperty}
      bookingDetails={bookingDetails}
      onBack={() => setShowCheckout(false)}
    />
  );
}
if (selectedProperty) {
  return (
    <PropertyDetails
      property={selectedProperty}
      bookingDetails={bookingDetails}
      onBack={() => setSelectedProperty(null)}
      onReserve={() => setShowCheckout(true)}
    />
  );
}

  return (
    <>
      {/* Navigation */}
      <header className="bar">
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="panel"
        >
          ☰ Menu
        </button>

        <a className="brand" href="#top">
          Sunset Properties
        </a>

        <button
  type="button"
  className="book-btn"
  onClick={() => setContactOpen(true)}
>
  Contact Us
</button>
      </header>
      {contactOpen && (
  <ContactModal onClose={() => setContactOpen(false)} />
)}

      {/* Slide-out menu */}
      <nav
        className={`panel ${menuOpen ? "open" : ""}`}
        id="panel"
        aria-label="Main"
      >
        <button
          className="x"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>

        <a href="#cottages" onClick={() => setMenuOpen(false)}>
          Cottages
        </a>

        <a href="#houses" onClick={() => setMenuOpen(false)}>
          Houses
        </a>

        <a href="#estates" onClick={() => setMenuOpen(false)}>
          Estates
        </a>

        <a href="#guests" onClick={() => setMenuOpen(false)}>
          Guest Stories
        </a>
      </nav>

      {/* Hero */}
      <main id="top">
        <section
          className="hero photo"
          style={{
            "--g":
              "linear-gradient(160deg, #3d5a58, #8a7a5c 55%, #2b2a26)",
          }}
        >
          <h1>Sunset Properties</h1>

          <p>
            Discover beautiful vacation rentals along the water.
            From cozy cottages to spacious lakefront homes,
            find your perfect getaway.
          </p>
        </section>
      <BookingSearch onSearch={setBookingDetails} />
        {/* Introduction */}
<section className="intro">
  <h2>
    Close to the water, <br />
    far from <em>the usual</em>
  </h2>

  <p>
    Discover thoughtfully selected vacation homes designed
    for unforgettable stays along the shoreline.
  </p>
</section>

{/* Property navigation */}
<nav className="tabs" aria-label="Stay types">
  <a href="#cottages">Cottages</a>
  <a href="#houses">Houses</a>
  <a href="#estates">Estates</a>
</nav>

{/* Cottages */}
{filteredProperties.some((property) => property.category === "cottage") && (
  <section className="group" id="cottages">
    <h2><em>Cottages,</em> made for two</h2>
    <p>Cozy retreats for peaceful mornings and relaxing getaways.</p>

    <div className="grid">
      {filteredProperties
        .filter((property) => property.category === "cottage")
        .map((property) => (
   <PropertyCard
  key={property.id}
  property={property}
  calculateTotal={calculateTotal}
  onSelect={setSelectedProperty}
/>
        ))}
    </div>
  </section>
)}

{/* Houses */}
{filteredProperties.some((property) => property.category === "house") && (
<section className="group" id="houses">
  <h2><em>Houses,</em> room for everyone</h2>
  <p>Beautiful homes with space for family and friends.</p>

  <div className="grid">
  {filteredProperties
  .filter((property) => property.category === "house")
  .map((property) => (
 <PropertyCard
  key={property.id}
  property={property}
  calculateTotal={calculateTotal}
  onSelect={setSelectedProperty}
/>
      ))}
  </div>
</section>
)}

{/* Estates */}
{filteredProperties.some((property) => property.category === "estate") && (
<section className="group" id="estates">
  <h2><em>Estates,</em> for the long stay</h2>
  <p>Spacious retreats for memorable gatherings and extended stays.</p>

  <div className="grid">
    {filteredProperties
  .filter((property) => property.category === "estate")
  .map((property) => (
<PropertyCard
  key={property.id}
  property={property}
  calculateTotal={calculateTotal}
  onSelect={setSelectedProperty}
/>
      ))}
  </div>
</section>
)}
{filteredProperties.length === 0 && (
  <div className="no-results">
    <h2>No Properties Found</h2>
    <p>
      We couldn't find any properties that accommodate your group.
      Try searching with fewer guests.
    </p>
  </div>
)}

<section className="gallery" id="gallery">
  <h2>Life on the Lakeshore</h2>
  <div className="gallery-controls">
  <button
    type="button"
    onClick={() => scrollGallery(-1)}
    aria-label="Scroll gallery left"
  >
    ←
  </button>

  <button
    type="button"
    onClick={() => scrollGallery(1)}
    aria-label="Scroll gallery right"
  >
    →
  </button>
</div>

 <div className="track" ref={galleryRef}>
    <div className="slide">
      <img src="/images/hammock.jpg" alt="Hammock" />
    </div>

    <div className="slide">
      <img src="/images/wave.jpg" alt="Wave" />
    </div>

    <div className="slide">
      <img src="/images/lifeguard.jpg" alt="Lifeguard" />
    </div>

    <div className="slide">
   <img src="/images/boat.jpg" alt="Boat" />
    </div>
    <div className="slide">
   <img src="/images/shoreline.jpg" alt="shoreline" />
    </div>
  </div>
</section>
<section className="quote" id="testimonials">
  <blockquote>
    “The best memories are made by the water.”
  </blockquote>
  <cite>— Life on the Lake Michigan Shoreline</cite>
</section>
<footer id="contact">
  <div className="footer-content">
    <div className="footer-left">
      <h2>Stay a Little Longer.</h2>

      <p>
        Discover your perfect getaway with
        Sunset Properties.
      </p>
    </div>

    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebookF />
      </a>

      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram />
      </a>

      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <FaTiktok />
      </a>

      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <FaYoutube />
      </a>
    </div>
  </div>

  <p className="footer-copyright">
    © 2026 Sunset Properties. All rights reserved.
  </p>
</footer>
      </main>
    </>
  );
}

function PropertyCard({ property, calculateTotal, onSelect }) {
  return (
   <button
  className="card"
  type="button"
  onClick={() => onSelect(property)}
>
      <span
  className="photo"
  style={{
    "--g": `linear-gradient(150deg, ${property.colors})`,
    "--img": property.image
      ? `url("${property.image}")`
      : "none",
  }}
/>

      <div>
        <h3>{property.name}</h3>

        <span className="meta">
          <span>{property.guests}</span>
          <span>{property.size}</span>
          <span>{property.beds}</span>
          <span>{property.feature}</span>
        </span>
        <p className="property-price">
  <strong>${property.nightlyRate}</strong>
  <span> / night</span>
</p>
{calculateTotal(property) !== null && (
  <p className="rental-total">
    Rental subtotal: ${calculateTotal(property).toLocaleString()}
  </p>
)}
      </div>
    </button>
  );
}

export default App;