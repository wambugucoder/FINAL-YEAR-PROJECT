import { Provider, useStore } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/landing-component/Landing';
import store from './store/store';
import Login from './components/login-component/Login';
import Register from './components/register-component/Register';
import Privacy from './components/privacy-component/Privacy';
import Activate from './components/account-activation-component/Activate';
import SetAuthToken from './utils/SetAuthHeader';
import jwt_decode from 'jwt-decode';
import { LOGIN_USER, LOGOUT_USER } from './store/actions/actionTypes';
import Oauth2 from './components/oauth2-component-handler/Oauth2';

//const redux_store=useStore();

//SESSION MANAGEMENT IN MAIN APP
if(localStorage.jwtToken){
  const token=localStorage.jwtToken
  //set header
  SetAuthToken(token)
  //decode
  const decoded=jwt_decode(token)
  //call store to keep user authenticated and in session
  store.dispatch({
    type:LOGIN_USER,
    payload:decoded
  })
  
  
   // Check for expired token
   const currentTime= Date.now()/1000;
   if (decoded.exp < currentTime) {
     // Logout user
    store.dispatch({
       type:LOGOUT_USER,
       
     });
     // Redirect to login
     window.location.href = "/login";
   }
  }
function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/"component={Landing}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/privacy-policy" component={Privacy}/>
          <Route exact path="/activate-account/:tokenid"component={Activate}/>
          <Route exact path="/oauth2/redirect" component={Oauth2}/>
          <Route  path='/issues' component={() => { 
            window.location.href = 'https://github.com/wambugucoder/FINAL-YEAR-PROJECT/issues/new';  
            return null;
            }}/>
            <Route  path='/project' component={() => { 
            window.location.href = 'https://github.com/wambugucoder/FINAL-YEAR-PROJECT';  
            return null;
            }}/>
        </div>
      </Router>

    </Provider>
    
  );
}

export default App;
