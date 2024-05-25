import React, { useEffect } from 'react';
import './css/Notificacion.css';

const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  return (
    message && (
      <div className="notification">
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
