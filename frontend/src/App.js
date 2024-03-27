import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerified from './pages/EmailVerified';
import { useAuthContext } from "./hooks/useAuthContext";
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import NavbarHeader from './components/NavbarHeader';
import NavbarFooter from './components/NavbarFooter';

function App() {
  const { user } = useAuthContext();

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
        <Route
          path='/admin_hsu_store'
          element={<AdminLogin />}
        />
        <Route
          path='/admin_dashboard'
          element={user === process.env.REACT_APP_ADMIN_EMAIL ? <AdminPanel /> : <AdminLogin />}
        />
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
