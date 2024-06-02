import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setError, setUser } from '@app/store/authSlice';


const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchCurrentUser = async () => {
      
      try {
        const response = await axios.get('https://apiwithdb-u82g.onrender.com/currentUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
        dispatch(setUser(response.data));
      } catch (e:any) {
        dispatch(setError({
          statusCode: e.response?.status || 500,
          message: e.response?.data?.message || 'An error occurred'
        }));
      }
    };

    fetchCurrentUser();
  }, [navigate, dispatch]);
};

export default useAuth;
