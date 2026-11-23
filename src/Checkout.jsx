import { useState } from "react";

function Checkout({ property, bookingDetails, onBack }) {
    const [guestInfo, setGuestInfo] = useState({
  fullName: "",
  email: "",
  phone: "",
});
const [isConfirmed, setIsConfirmed] = useState(false);
const isFormValid =
  guestInfo.fullName.trim() !== "" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email.trim()) &&
  guestInfo.phone.replace(/\D/g, "").length >= 10;
    const start = new Date(`${bookingDetails.checkIn}T00:00:00Z`);
const end = new Date(`${bookingDetails.checkOut}T00:00:00Z`);

const nights = Math.max(
  0,
  (end - start) / (1000 * 60 * 60 * 24)
);

const rentalSubtotal = nights * property.nightlyRate;
if (isConfirmed) {
  return (
    <section className="checkout-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">
  ✓
</div>
        <h1>Reservation Confirmed!</h1>

        <p>Thank you, {guestInfo.fullName}!</p>

       <p>
  Your demo reservation at <strong>{property.name}</strong>{" "}
  has been successfully completed.
</p>

        <h2>Your Reservation Details</h2>

        <p>Property: {property.name}</p>
       <p>
  Check-in:{" "}
  {new Date(`${bookingDetails.checkIn}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  )}
</p>

<p>
  Check-out:{" "}
  {new Date(`${bookingDetails.checkOut}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  )}
</p>
        <p>Guests: {bookingDetails.guests}</p>
        <p>Nights: {nights}</p>

        <h3>
          Rental Total: ${rentalSubtotal.toLocaleString()}
        </h3>

        <p>
          This is a demonstration booking.
          No payment has been collected.
        </p>

        <button type="button" onClick={onBack}>
          Back to Property
        </button>
      </div>
    </section>
  );
} 
  return (
    <section className="checkout-page">
      <button type="button" onClick={onBack}>
        ← Back to Property
      </button>

      <h1>Complete Your Reservation</h1>
    <div className="checkout-layout">
      <div className="checkout-summary">
        <h2>{property.name}</h2>

       <p>
  Check-in:{" "}
  {new Date(`${bookingDetails.checkIn}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  )}
</p>

<p>
  Check-out:{" "}
  {new Date(`${bookingDetails.checkOut}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  )}
</p>
        <p>Guests: {bookingDetails.guests}</p>

        <p>Nightly rate: ${property.nightlyRate}</p>
        <p>Number of nights: {nights}</p>

<p className="checkout-total">
  Rental subtotal: ${rentalSubtotal.toLocaleString()}
</p>
      </div>
      <div className="guest-form">
  <h2>Guest Information</h2>

  <label htmlFor="fullName">Full Name</label>
  <input
    type="text"
    id="fullName"
    placeholder="Enter your full name"
    value={guestInfo.fullName}
    onChange={(e) =>
      setGuestInfo({
        ...guestInfo,
        fullName: e.target.value,
      })
    }
  />

  <label htmlFor="email">Email Address</label>
  <input
    type="email"
    id="email"
    placeholder="Enter your email"
    value={guestInfo.email}
    onChange={(e) =>
      setGuestInfo({
        ...guestInfo,
        email: e.target.value,
      })
    }
  />

  <label htmlFor="phone">Phone Number</label>
  <input
    type="tel"
    id="phone"
    placeholder="Enter your phone number"
    value={guestInfo.phone}
    onChange={(e) =>
      setGuestInfo({
        ...guestInfo,
        phone: e.target.value,
      })
    }
  />
 <button
  type="button"
  className="confirm-button"
  disabled={!isFormValid}
  onClick={() => setIsConfirmed(true)}
>
  Confirm Reservation
</button>
</div>
</div>
    </section>
  );
}

export default Checkout;