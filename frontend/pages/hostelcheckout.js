import { Button } from 'antd';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import { useSearchParams } from 'next/navigation';
import MainLayout from '../components/layout';
import Loading from '../components/shared/Loading';
import { useRouter } from 'next/router';
const { publicRuntimeConfig } = getConfig();

function HostelCheckout(props) {
  const [bookingModal, setBookingModal] = useState({ open: false, roomId: null });
  const [responsedata, setresponsedata] = useState()
//   const token = getSessionToken();
//   const user = getSessionUser();
  const router = useRouter();
  const search=useSearchParams()

  useEffect(() => {
  async function Fetchdata(){
   try {
    // console.log(`${publicRuntimeConfig.API_BASE_URL}/api/v1/get-room-by-id-or-slug-name/${search.get('slug')}`);
    const data=await fetch(`${publicRuntimeConfig.API_BASE_URL}/api/v1/get-hostel-by-id-or-slug-name/${search.get('slug')}`)
    const response=await data.json()
    // console.log(response);
    setresponsedata(response?.result)
   } catch (error) {
    console.log(error);
   }
  }
  Fetchdata()
  }, [])
  
  // function to handle place booking order
//   const handleOrder = () => {
//     if (!token && !user) {
//       notificationWithIcon('error', 'ERROR', 'Please Registration/Login first to place an order.');
//       router.push('/auth/login');
//     } else {
//       setBookingModal((prevState) => (
//         { ...prevState, open: true, roomId: responsedata?.data?.id }
//       ));
//     }
//   };

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const options = {
        // key: 'rzp_test_ovrL1ExhTWhDv2',
        key: 'rzp_test_jmLsdK6FoWIRSe',
        amount: responsedata?.data?.hostel_price*100, // Amount in paisa
        currency: 'INR',
        name: 'Stay Junction',
        description: 'Product description',
        image: responsedata?.data?.hostel_images[1]?.url,
        handler: function(response) {
          router.push('/profile?tab=booking-history')
          // Handle success
          // alert(response.razorpay_payment_id);
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
    <>
      <MainLayout title='Stay Junction ― Hostels Preview'>
        {!responsedata?(
          <Loading />
        ) : responsedata?.error ? (
          <div className='error'>
            <h3>{props?.error?.message || 'No such hotel could be found!'}</h3>
            <Link className='btn-primary' href='/rooms'>
              Back to hostels
            </Link>
          </div>
        ) : (
          <>
            {/* <StyledHero>
              <Banner title={`${responsedata?.data?.room_name} room`}>
                <Link className='btn-primary' href='/rooms'>
                  Back to hotels
                </Link>
              </Banner>
            </StyledHero> */}

            <section className='single-room'>
              <div className='single-room-images'>
                  <img
                    key={uniqueId()}
                    src={responsedata?.data?.hostel_images[0]?.url}
                    alt={responsedata?.data?.hostel_images[0]?.url || 'hostel-details-img'}
                  />
                  <img
                    key={uniqueId()}
                    src={responsedata?.data?.hostel_images[1]?.url}
                    alt={responsedata?.data?.hostel_images[1]?.url || 'room-details-img'}
                  />
              </div>

              <div className='single-room-info'>
                <article className='desc'>
                  <h3>Details:</h3>
                  <p>{responsedata?.data?.hostel_description}</p>
                </article>

                <article className='info'>
                  <h3>Information:</h3>
                  <h6>
                    {`Price : ₹ ${responsedata?.data?.hostel_price}`}
                  </h6>
                  <h6>
                    {`Location : ${responsedata?.data?.hostel_location}`}
                  </h6>
                  <h6>
                    {`Size : ${responsedata?.data?.hostel_size} SQFT`}
                  </h6>
                  {/* <h6>
                    Total rooms :
                    {' '}
                    {responsedata?.data?.hostel_capacity > 1
                      ? `${responsedata?.data?.room_capacity} rooms`
                      : `${responsedata?.data?.room_capacity} person`}
                  </h6> */}
                  {/* <h6>{responsedata?.data?.allow_pets ? 'pets allowed' : 'no pets allowed'}</h6> */}
                  {/* <h6>{responsedata?.data?.provide_breakfast && 'free breakfast included'}</h6> */}

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

              {/* room reviews list */}
              {/* <div className='single-room-images'>
                {responsedata?.data?.id && (
                  <RoomReviewList roomId={responsedata?.data?.id} />
                )}
              </div> */}
            </section>
          </>
        )}
      </MainLayout>


    </>
  );
}

// export async function getServerSideProps(ctx) {
//   try {
//     // Fetch data from the server-side API
//     const response = await axios.get(
//       `${publicRuntimeConfig.API_BASE_URL}/api/v1/get-room-by-id-or-slug-name/${ctx.query.slug}`
//     );
//     const room = response?.data?.result;

//     return {
//       props: {
//         room,
//         error: null
//       }
//     };
//   } catch (err) {
//     return {
//       props: {
//         room: null,
//         error: err?.data
//       }
//     };
//   }
// }

export default HostelCheckout;
