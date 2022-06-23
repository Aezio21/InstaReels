import React, {useContext } from "react";
import {Route,Switch,Redirect} from "react-router-dom";
import Login from "./Components/Login";
import PageNottFound from "./Components/PageNottFound";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import {AuthContextProvider,AuthContext} from "./Context/AuthContext";

function App() {
  return (
<>
     <AuthContextProvider>
          <Switch> 
             <RedirectToFeed path={"/Login"}
               comp={Login}>
             </RedirectToFeed>

             <RedirectToFeed path={"/Signup"} 
               comp={Signup}> 
             </RedirectToFeed>

             <PrivateRoute path={"/Feed"}
               comp={Feed}>
             </PrivateRoute>
              

              <PrivateRoute path={"/Profile"} 
               comp={Profile}>
             </PrivateRoute>

              <Route path="/">
                <Redirect to="/Login"></Redirect>
              </Route>
              
             <Route>
               <PageNottFound></PageNottFound>
             </Route>
          </Switch>
       </AuthContextProvider>
  </>
       );
}

function PrivateRoute(props){
  let Component=props.comp;
  let cUser=useContext(AuthContext);

  return(
    <Route {...props} render={(props) => {
        return cUser!=null?<Component {...props} ></Component>:<Redirect to="/Login"></Redirect>
    }}>
    </Route>
  )
}

function RedirectToFeed(props){
  let Component=props.comp;
  let cUser=useContext(AuthContext);

  return(
    <Route {...props} render={(props) => {
        return cUser!=null?<Redirect to="/Feed"></Redirect>:<Component {...props} ></Component>
    }}>
    </Route>
  )
}



export default App;
