import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerified from './pages/EmailVerified';


function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route 
    path='/signup'
    element={<Signup />}
    />

    <Route 
    path='/login'
    element={<Login />}
    />

    <Route
    path='/forgot-password'
    element={<ForgotPassword />}
    />

    <Route
    path='/reset-password/:token'
    element={<ResetPassword />}
    />

<Route
    path='/email-verify/:token'
    element={<EmailVerified />}
    />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
