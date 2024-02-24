import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup';

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
    element={<></>}
    />

    <Route
    path='/forgot-password'
    element={<></>}
    />

    <Route
    path='/reset-password/:token'
    element={<></>}
    />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
