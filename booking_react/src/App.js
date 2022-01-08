import './App.scss';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Routes, Route, Link , Navigate, useParams} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(
    {
      date: "",
      email: "",
      token: "",
      _id: "",
      loggedIn: false
    });

  return (
    <div className="App">
      <MyNavbar />

      <Router>
        <Routes>
          <Route path="/login" element={user.loggedIn ? <RegisterForm /> : <LoginForm setUser={setUser} />}/>
          <Route path="/register" element={<RegisterForm />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
