import { userRole } from '@app/store/authSlice';
import { useAppSelector } from '@app/store/types';
import useAuth from '@shared/hooks/useAuth'
import { useEffect } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'

export const AuthGuard = () => {
  useAuth();
  const navigate = useNavigate();
  const role = useAppSelector(userRole);
  
useEffect(() => {
  if(role === 'USER') {
    navigate('/main')
  }
},[role]);

  return (
    <Outlet />
  )
}
