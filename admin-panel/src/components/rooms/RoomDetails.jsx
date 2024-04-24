import {
  Descriptions, Image, List, Result, Skeleton, Tag, Typography
} from 'antd';
import React from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import { roomStatusAsResponse, roomTypeAsColor } from '../../utils/responseAsStatus';

function RoomDetails({ id }) {
  // fetch room-details API data
  const [loading, error, response] = useFetchData(`/api/v1/get-room-by-id-or-slug-name/${id}`);

  return (
    <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
      {error ? (
        <Result
          title='Failed to fetch'
          subTitle={error}
          status='error'
        />
      ) : (
        <Descriptions
          title='Hotel Information'
          bordered
        >
          <Descriptions.Item label='Images' span={3}>
            <Image.PreviewGroup>
              {response?.data?.room_images?.map((image) => (
                <Image
                  key={uniqueId()}
                  className='p-2'
                  src={image?.url}
                  crossOrigin='anonymous'
                  alt='user-image'
                  width={120}
                  height={100}
                />
              ))}
            </Image.PreviewGroup>
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Name</span>}
          >
            {response?.data?.room_name}
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Slug</span>}
            span={2}
          >
            {response?.data?.room_slug}
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Type</span>}
          >
            <Tag
              className='text-center uppercase'
              color={roomTypeAsColor(response?.data?.room_type)}
            >
              {response?.data?.room_type}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Price</span>}
            span={2}
          >
            {`$ ${response?.data?.room_price}`}
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Size</span>}
          >
            {`${response?.data?.room_size} sq. ft.`}
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Capacity</span>}
            span={2}
          >
            {`${response?.data?.room_capacity} Person`}
          </Descriptions.Item>

          <Descriptions.Item label={<span className='whitespace-nowrap'>Allow Pets</span>}>
            <Tag
              className='w-[60px] text-center uppercase'
              color={response?.data?.allow_pets ? 'success' : 'error'}
            >
              {response?.data?.allow_pets ? 'YES' : 'NO'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Provided Breakfast</span>}
            span={2}
          >
            <Tag
              className='w-[60px] text-center uppercase'
              color={response?.data?.provide_breakfast ? 'success' : 'error'}
            >
              {response?.data?.provide_breakfast ? 'YES' : 'NO'}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Featured Hotel</span>}
          >
            <Tag
              className='w-[60px] text-center uppercase'
              color={response?.data?.featured_room ? 'success' : 'error'}
            >
              {response?.data?.featured_room ? 'YES' : 'NO'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Status</span>}
            span={2}
          >
            <Tag
              className='w-[80px] text-center uppercase'
              color={roomStatusAsResponse(response?.data?.room_status).color}
            >
              {roomStatusAsResponse(response?.data?.room_status).level}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Last Update At</span>}
          >
            {response?.data?.updated_at?.split('T')[0]}
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Created At</span>}
            span={2}
          >
            {response?.data?.created_at?.split('T')[0]}
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Descriptions</span>}
            span={3}
          >
            {response?.data?.room_description}
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Extra Facilities</span>}
            span={3}
          >
            <List
              bordered
              dataSource={response?.data?.extra_facilities}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>{item}</Typography.Text>
                </List.Item>
              )}
            />
          </Descriptions.Item>

          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel Location</span>}
          >
            {response?.data?.room_location || 'Mohali'}
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className='whitespace-nowrap'>Hotel City</span>}
          >
            {response?.data?.room_city || 'Mohali'}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Skeleton>
  );
}

export default React.memo(RoomDetails);
