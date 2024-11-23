import './App.css';
import {Navigate, Route, Routes} from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ResetPassword from './pages/resetPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Navigate to={'/login'}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/resetpassword' element={<ResetPassword />}/>
        <Route path='*' element={<Navigate to={'/login'}/>}/>
      </Routes>
    </div>
  );
}

export default App;
