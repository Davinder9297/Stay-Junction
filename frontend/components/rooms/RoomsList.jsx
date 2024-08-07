import React from 'react';
import { v4 as uniqueId } from 'uuid';
import Room from '../shared/Room';

export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no hotels matched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className='rooms-list'>
      <div className='flex flex-col gap-y-10'>
        {rooms.map((room) => (
          <Room key={uniqueId()} room={room} />
        ))}
      </div>
    </section>
  );
}
