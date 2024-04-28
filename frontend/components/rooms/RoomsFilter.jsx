import React, { useEffect, useState } from 'react';
import Title from '../home/Title';
import Link from 'next/link';

export default function RoomFilter({ ourRooms, setOurFilteredRooms }) {
  const [allowBreakfast, setAllowBreakfast] = useState(false);
  const [allowPets, setAllowPets] = useState(false);
  const [cities, setCities] = useState({
    Delhi: false,
    Mumbai: false,
    Kolkata: false,
    Bangalore: false,
    Bareilly: false,
    Chennai: false,
  });
  const [priceRange, setPriceRange] = useState([800, 5000]); // Default price range

  // Function to filter rooms based on checkboxes and price range
  const filterRooms = () => {
    let filteredRooms = [...ourRooms];

    // Filter by price range
    filteredRooms = filteredRooms.filter((room) => room.room_price >= priceRange[0] && room.room_price <= priceRange[1]);

    // Filter by breakfast availability
    if (allowBreakfast) {
      filteredRooms = filteredRooms.filter((room) => room.provide_breakfast);
    }

    // Filter by pet allowance
    if (allowPets) {
      filteredRooms = filteredRooms.filter((room) => room.allow_pets);
    }

    // Filter by selected cities
    const selectedCities = Object.keys(cities).filter((city) => cities[city]);
    if (selectedCities.length > 0) {
      filteredRooms = filteredRooms.filter((room) => selectedCities.includes(room.room_city));
    }

    // Update filtered rooms state
    setOurFilteredRooms(filteredRooms);
  };

  // useEffect to trigger filtering whenever any checkbox state or price range changes
  useEffect(() => {
    filterRooms();
  }, [allowBreakfast, allowPets, cities, priceRange]);
const [city, setCity] = useState('')
  return (
    <section className='filter-container'>
      <Title title='Filter Hotels' />
      <div className="searchfeatured">
        <input className='border ' value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search hotels by city.." />
        <Link href={`/searched?city=${city}`} className="searchbutton ">Search</Link>
      </div>
      <form className='filter-form'>
        {/* Price range */}
        <div className='form-group'>
          <label htmlFor='price'>Price Range</label>
          <input
            className='form-control'
            type='range'
            name='price'
            id='price'
            min={800}
            max={5000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
          />
          <span>₹{priceRange[0]} - ₹{priceRange[1]}</span>
        </div>

        {/* Extras start */}
        <div className='form-group'>
          {/* Breakfast checked */}
          <div className='single-extra'>
            <input
              name='breakfast'
              type='checkbox'
              id='breakfast'
              checked={allowBreakfast}
              onChange={() => setAllowBreakfast(!allowBreakfast)}
            />
            <label htmlFor='breakfast'>Breakfast</label>
          </div>

          {/* Pets checked */}
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={allowPets}
              onChange={() => setAllowPets(!allowPets)}
            />
            <label htmlFor='pets'>Pets</label>
          </div>
        </div>

        <div className='form-group'>
          {/* City checkboxes */}
          {Object.keys(cities).map((city) => (
            <div key={city} className='single-extra'>
              <input
                type='checkbox'
                id={city}
                checked={cities[city]}
                onChange={() => setCities((prevCities) => ({ ...prevCities, [city]: !prevCities[city] }))}
              />
              <label htmlFor={city}>{city}</label>
            </div>
          ))}
        </div>
        {/* Extras end */}
      </form>
    </section>
  );
}
