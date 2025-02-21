import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored ? JSON.parse(stored) : false;
  });

  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem('bookings');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const login = (username, password) => {
    if (username === 'naval.ravikant' && password === '05111974') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addBooking = (booking) => {
    setBookings(prev => [...prev, {
      ...booking,
      id: (prev.length + 1).toString().padStart(2, '0'),
      amount: booking.tickets * 25
    }]);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      bookings,
      addBooking
    }}>
      {children}
    </AppContext.Provider>
  );
};