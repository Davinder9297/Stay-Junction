import { Card, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator=',' />;
const gridStyle = { width: '25%', textAlign: 'center' };

function HostelBookingCard({ loading, data }) {
  const navigate = useNavigate();

  return (
    <Card
      className='w-full cursor-pointer md:w-[49.5%]'
      onClick={() => navigate('/main/hostel-booking-orders')}
      title='Hostel Bookings Information:'
      loading={loading}
    >
      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Total Bookings'
          formatter={formatter}
          value={data?.total_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Cancel Bookings'
          formatter={formatter}
          value={data?.cancel_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Pending Bookings'
          formatter={formatter}
          value={data?.pending_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Approved Bookings'
          formatter={formatter}
          value={data?.approved_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Rejected Bookings'
          formatter={formatter}
          value={data?.rejected_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Approved Bookings'
          formatter={formatter}
          value={data?.approved_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='In-Reviews Bookings'
          formatter={formatter}
          value={data?.in_reviews_bookings || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Completed Bookings'
          formatter={formatter}
          value={data?.completed_bookings || 0}
        />
      </Card.Grid>
    </Card>
  );
}

export default HostelBookingCard;
