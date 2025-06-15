import Dashboard from './pages/Dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Explore from './pages/Transactions';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './context/ProtectedRoute';
import Interactions from './pages/Interactions';
import Homepage from './pages/Homepage';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route path="/" element={<Homepage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/explore' element={<Explore />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/interactions' element={<Interactions />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
