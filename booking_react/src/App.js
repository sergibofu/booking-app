import './App.scss';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Routes, Route, Link , Navigate, useParams} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useState, useEffect } from 'react';
import Flights from './components/Flights';
import ProtectedRoute from './components/ProtectedRoute';
import Test from './components/Test';


function App() {
  const baseURL = "http://localhost:3001";
  const [user, setUser] = useState(
    {
      date: "",
      email: "",
      token: "",
      _id: "",
      loggedIn: false,
      registered: false
    });

    //si tenemos un usuario guardado en el localstorage pero no en el state user, 
    //guardamos el usuario del localstorage al state user
    useEffect(() => {
      let myUser = localStorage.getItem('user');
      if(myUser){
        myUser = JSON.parse(myUser);
        if(!user.loggedIn){
          setUser(myUser);
        }
      }
    }, [])

  return (
    <div className="App">
      <MyNavbar setUser={setUser} user={user} />      

      <Router>
        <Routes>
          {/* Rutas abiertas */}
          <Route path="/login" element={user.loggedIn ? <Navigate to="/flights"/>: <LoginForm setUser={setUser} baseURL={baseURL}/>}/>
          <Route path="/register" element={user.registered ? <Navigate to="/login"/>: <RegisterForm setUser={setUser} baseURL={baseURL}/>} />
          
          {/* Rutas protegidas */}
          <Route path="/flights" element={user.loggedIn ? <Flights user={user} baseURL={baseURL}/> : <Navigate to="/login"/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
