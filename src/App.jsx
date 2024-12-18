import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HotelList from './pages/HotelList';
import AddHotel from './pages/AddHotel';
import HotelSearch from './pages/HotelSearch';
import HotelDetails from './pages/HotelDetails';
import AuthPage from './pages/authentication';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HotelSearch />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/search-hotel" element={<HotelSearch />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
