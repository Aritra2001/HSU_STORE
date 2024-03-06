import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerified from './pages/EmailVerified';
import { useAuthContext } from "./hooks/useAuthContext";
import Home from './pages/Home';


function App() {

  const { user } = useAuthContext()
  // console.log(user.user.name.verifiedStatus)

  return (
    <BrowserRouter>
    <Routes>

    <Route 
    path='/signup'
    element={!user ? <Signup /> : <Home />}
    />

    <Route 
    path='/login'
    element={!user ? <Login /> : <Home />}
    />

    <Route
    path='/forgot-password'
    element={!user ? <ForgotPassword /> : <Home />}
    />

    <Route
    path='/reset-password/:token'
    element={!user ? <ResetPassword /> : <Home />}
    />

    <Route
    path='/email-verify/:token'
    element={<EmailVerified />}
    />

    <Route
    path='/'
    element={<Home />}
    />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
