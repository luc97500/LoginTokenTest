import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import Cardx from "./homepageCard";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Footer";

function Home() {
    const array = [1,2,3,4,5,6,7,8,9]
    const navigate = useNavigate();

    const [userDetails,setUsedDetails] = useState({})

    useEffect(() => {
        let UserDetails = JSON.parse(sessionStorage.getItem('userdetails'))
        setUsedDetails(UserDetails)
        console.log(UserDetails)
        if(UserDetails.jwttoken === ''){
          Swal.fire({
            title: "Authentication Error !",
            text: "Please Login Again Not have Valid JWT Token!",
            icon: "error",
          });
          navigate("/login");
        } 

    }, [])
    

  return (
    <>
    <div>
        <Headers name= {userDetails.name} email = {userDetails.email} />
    </div>
      <div class="bg-white px-4 py-8 flex flex-wrap items-center justify-center gap-4">
    {array.map((index,item)=>(
        <Cardx key = {index} />
    ))}

      </div>
      <div>
        <Footer name= {userDetails.name} email = {userDetails.email} />
    </div>
    </>
  );
}

export default Home;
