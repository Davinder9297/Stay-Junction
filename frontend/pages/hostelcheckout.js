import { Button } from 'antd';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import { useSearchParams } from 'next/navigation';
import MainLayout from '../components/layout';
import Loading from '../components/shared/Loading';

const { publicRuntimeConfig } = getConfig();

function HostelCheckout() {
  const [responsedata, setResponsedata] = useState();
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`${publicRuntimeConfig.API_BASE_URL}/api/v1/get-hostel-by-id-or-slug-name/${search.get('slug')}`);
        const response = await data.json();
        setResponsedata(response?.result);
      } catch (error) {
        console.log(error);
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
        amount: (responsedata?.data?.hostel_price * 100*search.get('days')).toFixed(2),
        currency: 'INR',
        name: 'Stay Junction',
        description: 'Product description',
        image: responsedata?.data?.hostel_images[1]?.url,
        handler(response) {
          router.push('/profile?tab=hostel-booking-history');
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
    <MainLayout title='Stay Junction ― Hostels Preview'>
      {!responsedata ? (
        <Loading />
      ) : responsedata?.error ? (
        <div className='error'>
          <h3>{responsedata.error.message || 'No such hostel could be found!'}</h3>
          <Link className='btn-primary' href='/rooms'>
            Back to hostels
          </Link>
        </div>
      ) : (
        <section className='single-room'>
          <div className='single-room-images'>
            <img
              key={uniqueId()}
              src={responsedata?.data?.hostel_images[0]?.url}
              alt={responsedata?.data?.hostel_images[0]?.url || 'hostel-details-img'}
              className='h-[300px]'
            />
            <img
              key={uniqueId()}
              src={responsedata?.data?.hostel_images[1]?.url}
              alt={responsedata?.data?.hostel_images[1]?.url || 'hostel-details-img'}
              className='h-[300px]'
            />
          </div>

          <div className='single-room-info'>
            <article className='desc'>
              <h3>Details:</h3>
              <p>{responsedata?.data?.hostel_description}</p>
            </article>

            <article className='info'>
              <h3>Information:</h3>
              <h6>{`Total Price : ₹ ${(responsedata?.data?.hostel_price*search.get('days')).toFixed(2)}`}</h6>
              <h6>{`Location : ${responsedata?.data?.hostel_location}`}</h6>
              <h6>{`Size : ${responsedata?.data?.hostel_size} SQFT`}</h6>
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

export default HostelCheckout;
