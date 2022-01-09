import './App.scss';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Routes, Route, Link , Navigate, useParams} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useState, useEffect } from 'react';
import Flights from './components/Flights';


function App() {
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
    })

  return (
    <div className="App">
      <MyNavbar setUser={setUser} user={user} />

      <Router>
        <Routes>
          <Route path="/login" element={user.loggedIn ? <Navigate to="/flights"/>: <LoginForm setUser={setUser} />}/>
          <Route path="/register" element={user.registered ? <Navigate to="/login"/>: <RegisterForm setUser={setUser}/>} />
          <Route path="/flights" element={<Flights setUser={setUser}/>} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
