import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import React, { useEffect } from 'react'
import{useState} from 'react';


function Login() {
     let[email,setemail]=useState("");
     let[password,setpassword]=useState("");
     
     let[user,setuser]=useState(null);
     let[Loader,setLoader]=useState(false);
     let[error,seterror]=useState("");

    const trackEmail = (e) => {
          setemail(e.target.value);
    }
    
    const trackPassword = (e) => {
          setpassword(e.target.value);
    }
    
    const printDetails = async function(){
        try{
          setLoader(true);
          let useCred= await  signInWithEmailAndPassword(auth,email,password);
          // console.log(useCred.user);
          setuser(useCred.user);
        }catch(err){
          seterror(err.message);
          
          setTimeout(() => {
              seterror("");   
          },2000);

        }
        setLoader(false);
    } 

    const Signout= async function(){
        await signOut(auth);
        setuser(null);
    }

    useEffect(() => {
       onAuthStateChanged(auth,(user) => {
          if(user){
             setuser(user);
          }else{
             setuser(null);
          }
    });
    
  },[]);

  return (
      <>
            {error!="" ? <h1>Error is {error} </h1>: 
         
            Loader==true?<h1>...Loading</h1>:

            user!=null?<>
            <button onClick={Signout}>SignOut</button>
            <h1>user is {user.uid}</h1></>:

            <> <span>Enter your Email</span>
            <input type="email" value={email} onChange={trackEmail}></input>
            <br></br>
            <span>Password</span>
            <input type="password" value={password} onChange={trackPassword}></input>
            <br></br>
            <button onClick={printDetails}> Login </button> </>
            }

      </> 
  )
}

export default Login