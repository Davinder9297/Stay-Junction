import { Button } from 'antd';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uniqueId } from 'uuid';
import MainLayout from '../components/layout';
import Loading from '../components/shared/Loading';

const { publicRuntimeConfig } = getConfig();

function RoomCheckout() {
  const [responsedata, setResponsedata] = useState();
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`${publicRuntimeConfig.API_BASE_URL}/api/v1/get-room-by-id-or-slug-name/${search.get('slug')}`);
        const response = await data.json();
        setResponsedata(response?.result);
      } catch (error) {
      }
    }
    fetchData();
  }, [search]);

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const options = {
        key: 'rzp_test_jmLsdK6FoWIRSe',
        amount: responsedata?.data?.room_price * 100, // Amount in paisa
        currency: 'INR',
        name: 'Stay Junction',
        description: 'Product description',
        image: responsedata?.data?.room_images[1]?.url,
        handler: () => {
          router.push('/profile?tab=booking-history');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '8283929792'
        },
        theme: {
          color: '#3399cc'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  return (
    <MainLayout title='Stay Junction ― Hotels Preview'>
      {!responsedata ? (
        <Loading />
      ) : responsedata?.error ? (
        <div className='error'>
          <h3>{responsedata.error.message || 'No such hotel could be found!'}</h3>
          <Link className='btn-primary' href='/rooms'>
            Back to rooms
          </Link>
        </div>
      ) : (
        <section className='single-room'>
          <div className='single-room-images'>
            <img
              key={uniqueId()}
              src={responsedata?.data?.room_images[0]?.url}
              alt={responsedata?.data?.room_images[0]?.url || 'room-details-img'}
            />
            <img
              key={uniqueId()}
              src={responsedata?.data?.room_images[1]?.url}
              alt={responsedata?.data?.room_images[1]?.url || 'room-details-img'}
            />
          </div>

          <div className='single-room-info'>
            <article className='desc'>
              <h3>Details:</h3>
              <p>{responsedata?.data?.room_description}</p>
            </article>

            <article className='info'>
              <h3>Information:</h3>
              <h6>{`Price : ₹ ${responsedata?.data?.room_price}`}</h6>
              <h6>{`Location : ${responsedata?.data?.room_location}`}</h6>
              <h6>{`Size : ${responsedata?.data?.room_size} SQFT`}</h6>
              <h6>{`Total rooms : ${responsedata?.data?.room_capacity > 1 ? `${responsedata?.data?.room_capacity} rooms` : `${responsedata?.data?.room_capacity} person`}`}</h6>
              <Button
                className='btn-primary'
                type='default'
                size='large'
                onClick={loadRazorpay}
              >
                Pay
              </Button>
            </article>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

export default RoomCheckout;
