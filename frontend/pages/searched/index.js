import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/home/Banner';
import Hero from '../../components/home/Hero';
import MainLayout from '../../components/layout';
import RoomFilter from '../../components/rooms/RoomsFilter';
import RoomList from '../../components/rooms/RoomsList';
import { useSearchParams } from 'next/navigation'
const { publicRuntimeConfig } = getConfig();

function Searched() {
  const [ourRooms, setOurRooms] = useState([]);
  const [ourFilteredRooms, setOurFilteredRooms] = useState([]);
  const search=useSearchParams()
const [responsedata, setresponsedata] = useState()

  // if props rooms exists to setOurRooms
  useEffect(() => {
    async function Fetchdata(){
        try {
    
            const data1=await fetch(`${publicRuntimeConfig.API_BASE_URL}/api/v1/all-rooms-list-by-city?keyword=${search?.get('city')}`)
            const response=await data1.json()
            // console.log(response);
            setresponsedata(response?.result)
            setOurFilteredRooms(response?.result?.data?.rows)
            setOurRooms(response?.result?.data?.rows)
          } catch (error) {
            console.log(error);
          }
    }
  Fetchdata()
  }, [search?.get('city')]);

  return (
    <MainLayout title='Stay Junction ― Hotel'>
      <Hero hero='roomsHero'>
        <Banner title='our hotels'>
          <Link className='btn-primary' href='/'>
            return home
          </Link>
        </Banner>
      </Hero>

      {/* featured rooms */}
      <Skeleton loading={!responsedata} paragraph={{ rows: 10 }} active>
        {responsedata?.data?.rows?.length === 0 ? (
          <Empty
            className='mt-10'
            description={(<span>Sorry! Any data was not found.</span>)}
          /> 
        ) : (
            <>
            <RoomFilter
              ourRooms={ourRooms}
              setOurFilteredRooms={setOurFilteredRooms}
            />
            <RoomList
              rooms={ourFilteredRooms}
            />
          </>
        )}
      </Skeleton>
    </MainLayout>
  );
}


export default Searched;
