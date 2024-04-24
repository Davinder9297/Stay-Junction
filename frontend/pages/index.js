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

function Home() {
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
      <Featured />
      <CitiesHostel />
      <Services />
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
