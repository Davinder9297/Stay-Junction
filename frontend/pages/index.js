import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React from 'react';
import Banner from '../components/home/Banner';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import MainLayout from '../components/layout';
import Featured from '../components/home/Allcities';
import CitiesHostel from '../components/home/Citiesforhostels';

const { publicRuntimeConfig } = getConfig();

function Home(props) {
  return (
    <MainLayout title='Stay Junction ― Home'>
      <Hero>
        <Banner
          title='luxurious hotels'
          subtitle='deluxe hotel starting at ₹1000'
        >
          <Link href='/rooms' className='btn-primary'>
            our hotels
          </Link>
        </Banner>
      </Hero>
      

      <Featured/>
      <CitiesHostel/>
      <Services />
      {/* featured rooms */}
      {/* <Skeleton loading={!props?.featuredRooms && !props?.error} paragraph={{ rows: 5 }} active>
        {props?.featuredRooms?.data?.rows?.length === 0 ? (
          <Empty
            className='mt-10'
            description={(<span>Sorry! Any data was not found.</span>)}
          />
        ) : props?.error ? (
          <Result
            title='Failed to fetch'
            subTitle={props?.error?.message || 'Sorry! Something went wrong. App server error'}
            status='error'
          />
        ) : (
          <FeaturedRooms
            featuredRoom={props?.featuredRooms?.data?.rows}
          />
        )}
      </Skeleton>
      <Skeleton loading={!props?.featuredHostel && !props?.error} paragraph={{ rows: 5 }} active>
        {props?.featuredHostel?.data?.rows?.length === 0 ? (
          <Empty
            className='mt-10'
            description={(<span>Sorry! Any data was not found.</span>)}
          />
        ) : props?.error ? (
          <Result
            title='Failed to fetch'
            subTitle={props?.error?.message || 'Sorry! Something went wrong. App server error'}
            status='error'
          />
        ) : (
          <FeaturedHostels
            featuredRoom={props?.featuredHostel?.data?.rows}
          />
        )}
      </Skeleton> */}
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from the server-side API
    const response = await axios.get(`${publicRuntimeConfig.API_BASE_URL}/api/v1/featured-rooms-list`);
    const response1 = await axios.get(`${publicRuntimeConfig.API_BASE_URL}/api/v1/featured-hostel-list`);
    const featuredRooms = response?.data?.result;
    const featuredHostel = response1?.data?.result;

    return {
      props: {
        featuredRooms,
        featuredHostel,
        error: null
      }
    };
  } catch (err) {
    return {
      props: {
        featuredRooms: null,
        featuredHostel: null,
        error: err?.data
      }
    };
  }
}

export default Home;
