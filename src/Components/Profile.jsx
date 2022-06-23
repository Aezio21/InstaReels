import { getDoc ,doc} from 'firebase/firestore';
import {db } from '../firebase';
import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../Context/AuthContext'
import "./profile.css"

function Profile() {
const [user,setUser]=useState(null);
const[pageLoading,setpageLoading]=useState(true);

  let cUser=useContext(AuthContext);
  

  useEffect(() =>{
   (async function(){
     const docRef=doc(db,"users",cUser.uid);
     const userObj=await getDoc(docRef);
     console.log(userObj.data());
     setUser(userObj.data());
     setpageLoading(false);
   }
   )();
  },[]);

  return (<>
    {pageLoading==true?<div>page Loading.....</div>
    :
    <>
       <div className="header"></div>
       <div className="main">
         <div className="pimg_container">
           <img src={user.profileImgUrl} alt='profile' className='pimg'></img>
         </div>
         <div className="details">
           <div className="content">{user.name}</div>
           <div className="content">No. of posts:{user.reelsIds.length}</div>
           <div className="content">Email:<span>{user.email}</span></div>
         </div>
       </div>
    
    </>}
    </>
  )
}

export default Profile