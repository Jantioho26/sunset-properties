import { useState } from "react";

function BookingSearch({ onSearch }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const calculateNights = () => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);

  const difference = end - start;

  return Math.max(0, difference / (1000 * 60 * 60 * 24));
};

const nights = calculateNights();

  return (
    <section className="booking-search">
      <h2>Find Your Perfect Stay</h2>
      <p>Choose your dates and discover your next lakeshore getaway.</p>

      <div className="search-fields">
        <div className="search-field">
          <label htmlFor="check-in">Check-in</label>
          <input
            type="date"
            id="check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="check-out">Check-out</label>
          <input
            type="date"
            id="check-out"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="search-field">
  <label htmlFor="guests">Guests</label>
  <select
    id="guests"
    value={guests}
    onChange={(e) => setGuests(Number(e.target.value))}
  >
    {Array.from({ length: 16 }, (_, i) => i + 1).map((number) => (
      <option key={number} value={number}>
        {number} {number === 1 ? "Guest" : "Guests"}
      </option>
    ))}
  </select>
</div>
<button
  type="button"
  className="search-button"
  onClick={() => onSearch({ checkIn, checkOut, guests })}
>
  Search Properties
</button>
      </div>
      {nights > 0 && (
  <p className="stay-summary">
    Your stay: <strong>{nights} {nights === 1 ? "night" : "nights"}</strong>
  </p>
)}
    </section>
  );
}

export default BookingSearch;