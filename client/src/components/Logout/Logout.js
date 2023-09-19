import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config/config';


const Logout = () => {

    const navigate =useNavigate();

 useEffect(() =>{
fetch('/api/logout',{
    method:"GET",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
 Credentials: "include"
}).then((res)=>{
    navigate("/login"); 
 if(res.status !== 200) {
    const error = new Error(res.error);
    throw error;
 }

}).catch((err) =>{
    console.log(err);
});
 });


  return (
    <div>Logout</div>
  )
}

export default Logout