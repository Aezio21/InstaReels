import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {createUserWithEmailAndPassword,} from 'firebase/auth'
import { auth,db } from '../firebase';
import{addDoc,collection,doc ,setDoc} from 'firebase/firestore';

function Signup() {
  let[email,setemail]=useState("");
  let[password,setpassword]=useState("");
  let[name,setname]=useState("");
  let[user,setuser]=useState(null);
  let[Loader,setLoader]=useState(false);
  let[error,seterror]=useState("");


  const trackEmail = (e) => {
    setemail(e.target.value);
}

const trackPassword = (e) => {
    setpassword(e.target.value);
}

const trackname = (e) => {
  setname(e.target.value);
}


const createAccount= async function(){
  try{
    setLoader(true);
    let userCred= await  createUserWithEmailAndPassword(auth,email,password);
    console.log(userCred.user);
     
    
     await setDoc(doc(db,"users",userCred.user.uid),{
           email,
           name,
           reelsIds:[],
           profileImgUrl:"",
           userId:userCred.user.uid
     });
       
     setuser(userCred.user);
    
    /******add ko use nhi kaar rha kyuki hume key same chiya *******/
    // const docRef=await addDoc(collection(db,"users"),{
    //   email:email,
    //   name:name,
    //   reelsIds:[],
    //   profileImgUrl:"",
    //   userId:userCred.user.uid
    // });
  }catch(err){
    seterror(err.message);
    
    setTimeout(() => {
        seterror("");   
    },2000);

  }
  setLoader(false);
}

  return ( 
    <>
     {error!="" ? <h1>Error is {error} </h1>: 
         Loader==true?<h1>...Loading</h1>:

         user!=null?<h1>signedup user is {user.uid}</h1>:
  <>
    <input type="email" value={email} onChange={trackEmail} placeholder='Enter Email'></input>
    <br></br>
    <input type="password" value={password} onChange={trackPassword } placeholder='Enter password'></input>
    <br></br>
    <input type="text" value={name} onChange={trackname} placeholder='Enter UserName'></input>
    <input type="button" value="Signup" onClick={createAccount}></input>

    <div>Have an account?<Link to="/login">Login</Link></div> </>}
  </>  
  )
}

export default Signup