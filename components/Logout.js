import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ children }) => {
  const events = [
    'load',
    'click',
    'keypress',
    'mousemove',
    'mousedown',
    'scroll',
  ];
  const navigate = useNavigate();

  let timer;

  const logoutSession = () => {
    sessionStorage.removeItem('token');
    navigate('/');
    console.log('Logged out due to inactivity');
  };

  const handleTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      logoutSession();
    }, 5000);
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, () => {
        clearTimeout(timer);
        handleTimer();
      });
    });
  }, []);

  return <>{children}</>;
};

export default Logout;
