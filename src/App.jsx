import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HotelList from './pages/HotelList';
import AddHotel from './pages/AddHotel';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/add-hotel" element={<AddHotel />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
