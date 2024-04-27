import React, { useEffect, useState } from 'react';
import Title from '../home/Title';

export default function HostelFilter({ ourRooms, setOurFilteredRooms }) {
  const [checkboxes, setCheckboxes] = useState({
    allowBreakfast: false,
    allowLunch: false,
    allowDinner: false,
    mess: false,
    allowPets: false,
    cities: {
      Delhi: false,
      Mumbai: false,
      Kolkata: false,
      Bangalore: false,
      Bareilly: false,
      Chennai: false,
    },
  });
  const [priceRange, setPriceRange] = useState([6000, 50000]); // Default price range

  // Function to filter rooms based on checkboxes and price range
  const filterRooms = () => {
    let filteredRooms = [...ourRooms];

    // Filter by price range
    filteredRooms = filteredRooms.filter((room) => room.hostel_price >= priceRange[0] && room.hostel_price <= priceRange[1]);

    // Filter by selected checkboxes
    filteredRooms = filteredRooms.filter((room) => {
      const { allowBreakfast, allowLunch, allowDinner, mess, allowPets, cities } = checkboxes;
      if (allowBreakfast && !room.provide_breakfast) return false;
      if (allowLunch && !room.provide_lunch) return false;
      if (allowDinner && !room.provide_dinner) return false;
      if (mess && !room.mess) return false;
      if (allowPets && !room.allow_pets) return false;

      const selectedCities = Object.keys(cities).filter((city) => cities[city]);
      if (selectedCities.length > 0 && !selectedCities.includes(room.hostel_location)) return false;

      return true;
    });

    // Update filtered rooms state
    setOurFilteredRooms(filteredRooms);
  };

  // useEffect to trigger filtering whenever any checkbox state or price range changes
  useEffect(() => {
    filterRooms();
  }, [checkboxes, priceRange]);

  return (
    <section className='filter-container'>
      <Title title='Filter Hostels' />

      <form className='filter-form'>
        {/* room price start */}
        <div className='form-group'>
          <label htmlFor='price'>Started Price ₹{priceRange[0]}</label>
          <input
            className='form-control'
            type='range'
            name='price'
            id='price'
            min={6000}
            max={50000}
            defaultValue={50000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([6000, parseInt(e.target.value, 10)])}
          />
          <span>₹{priceRange[1]}</span>
        </div>
        {/* room price end */}

        {/* Extras start */}
        <div className='form-group'>
          {/* Breakfast checked */}
          <div className='single-extra'>
            <input
              name='breakfast'
              type='checkbox'
              id='breakfast'
              checked={checkboxes.allowBreakfast}
              onChange={() => setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, allowBreakfast: !prevCheckboxes.allowBreakfast }))}
            />
            <label htmlFor='breakfast'>Breakfast</label>
          </div>

          <div className='single-extra'>
            <input
              name='lunch'
              type='checkbox'
              id='lunch'
              checked={checkboxes.allowLunch}
              onChange={() => setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, allowLunch: !prevCheckboxes.allowLunch }))}
            />
            <label htmlFor='lunch'>Lunch</label>
          </div>

          <div className='single-extra'>
            <input
              name='dinner'
              type='checkbox'
              id='dinner'
              checked={checkboxes.allowDinner}
              onChange={() => setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, allowDinner: !prevCheckboxes.allowDinner }))}
            />
            <label htmlFor='dinner'>Dinner</label>
          </div>

          <div className='single-extra'>
            <input
              name='mess'
              type='checkbox'
              id='mess'
              checked={checkboxes.mess}
              onChange={() => setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, mess: !prevCheckboxes.mess }))}
            />
            <label htmlFor='mess'>Mess</label>
          </div>

          <div className='single-extra'>
            <input
              name='pets'
              type='checkbox'
              id='pets'
              checked={checkboxes.allowPets}
              onChange={() => setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, allowPets: !prevCheckboxes.allowPets }))}
            />
            <label htmlFor='pets'>Pets</label>
          </div>
        </div>

        <div className='form-group'>
          {/* City checkboxes */}
          {Object.keys(checkboxes.cities).map((city) => (
            <div key={city} className='single-extra'>
              <input
                type='checkbox'
                id={city}
                checked={checkboxes.cities[city]}
                onChange={() => setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, cities: { ...prevCheckboxes.cities, [city]: !prevCheckboxes.cities[city] } }))}
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
