import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const isValidUser = localStorage.getItem('isAuthenticated') === 'true';
  return (
    <>
    {isValidUser ? <Outlet /> : <Navigate to='/login' />}
    </>
  )
}

export default ProtectedRoutes