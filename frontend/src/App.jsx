import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './context/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/explore' element={<Explore />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
