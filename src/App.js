import { useEffect, useState } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';

function App() {
  const [user, setUser] = useState()
  //handles callback of google
  function handleCallbackResponse(response){
      console.log("encoded JWT : "+ response.credential)
      var userObj=jwtDecode(response.credential)
      console.log(userObj)
      setUser(userObj)
      document.getElementById("signInDiv").hidden=true
  }
  function handleSignOut(e){
      setUser()
      document.getElementById("signInDiv").hidden=false

  }
  useEffect(()=>{
    /*global google*/ 
    google.accounts.id.initialize({
      "client_id":"11958868200-b5d7jimf3asqljbi0ullafuj13ia7hnv.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    );
    google.accounts.id.prompt();
  },[])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to pigeon</h1>
        <div id="signInDiv"></div>

        {user && 
          <div>
            <img src={user.picture} alt='profile'/>
            <h3>{user.name}</h3>
          </div>
        }
        <div id='signOutDiv'>
          {user!=null && <button onClick={handleSignOut}>SignOut</button>}
        </div>
      </header>
      
    </div>
  );
}

export default App;
