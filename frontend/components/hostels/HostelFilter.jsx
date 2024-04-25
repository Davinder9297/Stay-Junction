import React, { useEffect, useState } from 'react';
import Title from '../home/Title';

export default function HostelFilter({ ourRooms, setOurFilteredRooms }) {
  const [allowBreakfast, setAllowBreakfast] = useState(false);
  const [allowLunch, setAllowLunch] = useState(false);
  const [allowDinner, setAllowDinner] = useState(false);
  const [mess, setMess] = useState(false);

  // function to handle `room_price` filed filtering
  const roomPriceFiltering = (value) => {
    const filteredRooms = ourRooms.filter((room) => room.hostel_price <= parseInt(value, 10));
    setOurFilteredRooms(filteredRooms);
  };

  // function to handle `provide_breakfast` filed filtering
  useEffect(() => {
    if (allowBreakfast) {
      const filteredRooms = ourRooms.filter((room) => room.provide_breakfast === allowBreakfast);
      setOurFilteredRooms(filteredRooms);
    } else {
      setOurFilteredRooms(ourRooms);
    }
  }, [allowBreakfast]);

  useEffect(() => {
    if (allowLunch) {
      const filteredRooms = ourRooms.filter((room) => room.provide_lunch === allowLunch);
      setOurFilteredRooms(filteredRooms);
    } else {
      setOurFilteredRooms(ourRooms);
    }
  }, [allowLunch]);

  useEffect(() => {
    if (allowDinner) {
      const filteredRooms = ourRooms.filter((room) => room.provide_dinner === allowDinner);
      setOurFilteredRooms(filteredRooms);
    } else {
      setOurFilteredRooms(ourRooms);
    }
  }, [allowDinner]);

  // function to handle `allow_pets` filed filtering
  useEffect(() => {
    if (mess) {
      const filteredRooms = ourRooms.filter((room) => room.mess === mess);
      setOurFilteredRooms(filteredRooms);
    } else {
      setOurFilteredRooms(ourRooms);
    }
  }, [mess]);

  return (
    <section className='filter-container'>
      <Title title='Filter Hostels' />

      <form className='filter-form'>
        {/* room price start */}
        <div className='form-group'>
          <label htmlFor='price'>Started Price ₹6000</label>
          <input
            className='form-control'
            type='range'
            name='price'
            id='price'
            min={6000}
            max={50000}
            defaultValue={6000}
            onChange={(e) => roomPriceFiltering(e.target.value)}
          />
        </div>
        {/* room price end */}

        {/* extras start */}
        <div className='form-group'>
          {/* breakfast checked */}
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

          <div className='single-extra'>
            <input
              name='lunch'
              type='checkbox'
              id='lunch'
              checked={allowLunch}
              onChange={() => setAllowLunch(!allowLunch)}
            />
            <label htmlFor='lunch'>Lunch</label>
          </div>

          <div className='single-extra'>
            <input
              name='dinner'
              type='checkbox'
              id='dinner'
              checked={allowDinner}
              onChange={() => setAllowDinner(!allowDinner)}
            />
            <label htmlFor='dinner'>Dinner</label>
          </div>
          <div className='single-extra'>
            <input
              name='mess'
              type='checkbox'
              id='mess'
              checked={mess}
              onChange={() => setMess(!mess)}
            />
            <label htmlFor='mess'>Mess</label>
          </div>
        </div>
        {/* extras end */}
      </form>
    </section>
  );
}
