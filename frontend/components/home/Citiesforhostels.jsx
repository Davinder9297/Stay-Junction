import Link from "next/link";
import { useState } from "react";

const CitiesHostel = () => {
    const [city, setcity] = useState()
  const dummydata=[{
    cityname:"Delhi",
    imageurl:"https://www.momondo.in/himg/7a/70/62/ice-114048-72183831_3XL-105259.jpg",
    property:50
  },{
    cityname:"Mumbai",
    imageurl:"https://media.istockphoto.com/id/1226021105/photo/taj-mahal-palace-hotel-in-mumbai.jpg?s=612x612&w=0&k=20&c=0Jh6bjKHvLVtXb3hTdhmwOgseTjFIZjmMcMiOIT_A_w=",
    property:100
  },{
    cityname:"Bangalore",
    imageurl:"https://assets.cntraveller.in/photos/64b1537c1e94724098a802d6/16:9/w_2580,c_limit/banglore%20hotels%20lead.jpeg",
    property:60
  },{
    cityname:"Chennai",
    imageurl:"https://assets.cntraveller.in/photos/60b9fd97e1b212c19a816daa/16:9/w_1360,h_765,c_limit/H0XXD_27650432_H0XXDL07-401261464-1366x768.jpg",
    property:80
  },{
    cityname:"Kolkata",
    imageurl:"https://ramadalucknow.com/wp-content/uploads/2018/11/Ramada-Lucknow-MICE-Conference-Venues-Lucknow.jpg",
    property:30
  },{
    cityname:"Bareilly",
    imageurl:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/210200946.jpg?k=b103a5fb18460501ca026038c1add24b9c45e7ae4072a50a05cbc450725e3e86&o=&hp=1",
    property:50
  }];
  return (<>
      <div className="trending">Explore Hostels</div>
    <div className="searchfeatured">
        <input value={city} onChange={(e)=>setcity(e.target.value)} placeholder="Search hostels by city.." />
        <Link className="searchbutton" href={`/searchedhostels?city=${city}`}>Search</Link>
    </div>
    <div className="featured">

      {
        dummydata.map((data,index)=>
        { 
          return(
          <Link href={`/searchedhostels?city=${data.cityname}`} className="featuredItem">
          <img
            src={data.imageurl}
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>{data.cityname}</h1>
            {/* <h2>{data.property} properties</h2> */}
          </div>
        </Link>)

        })
      }
      
    </div>
    </>);
};

export default CitiesHostel;