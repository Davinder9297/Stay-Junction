import Link from 'next/link';
import React from 'react';

function Hostel({ room }) {
  return (<>
  <div className='flex h-[170px] w-[60%] mx-auto border shadow-sm rounded-lg'>
      <img src={room?.hostel_images[0]?.url || '/images/jpeg/room-1.jpeg'} className='w-[35%] h-full rounded-l-lg'/>
      <div className='w-full px-2 flex flex-col justify-between'>
        <div className='gap-y-3 flex flex-col'>
        <div className='flex justify-between w-full '>
            <div className='font-semibold text-xl max-w-[80%]'>{room?.hostel_name}</div>
            <div className=' text-xl'>₹ {room?.hostel_price}</div>
          </div>          <div className='flex justify-between w-full text-sm text-blue-700'>
              <div>{room?.hostel_location}</div>
              <div>15.3 km from centre</div>
          </div>
        </div>

        <div className='flex justify-between pb-2 items-center'>
            <div className='w-[60%] text-gray-500 text-sm'>
              {room?.hostel_description.slice(0,70)}...
            </div>
            <Link
          className=' h-9 w-20 border border-[#af9a7d] text-[#af9a7d] flex justify-center items-center rounded hover:bg-[#af9a7d] hover:text-white'
          href={`/hostels/${room?.hostel_slug}`}
        >
          Explore
        </Link>

        </div>
      </div>
  </div>
  </>
    
    // <article className='room bg-black border'>
    //   <div className='img-container border'>
    //     <img
    //       src={room?.room_images[0]?.url || '/img/jpeg/room-1.jpeg'}
    //       alt='single hotel'
    //     />

    //     <div className='price-top border'>
    //       <h6>{`₹ ${room?.room_price}`}</h6>
    //       <p>per night</p>
    //     </div>

    //     <Link
    //       className='btn-primary room-link'
    //       href={`/rooms/${room?.room_slug}`}
    //     >
    //       Feature
    //     </Link>
    //   </div>

    //   <p className='room-info'>
    //     {room?.room_name}
    //   </p>
    // </article>
  );
}

export default Hostel;
