import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../const';

const AddHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    address: '',
    city: '',
    rating: 1,
    price: 0,
    amenities: [],
  });

  const navigate = useNavigate();

  const amenitiesList = [
    'WiFi',
    'Gym',
    'Spa',
    'Parking',
    'Restaurant',
    'Bar',
  ];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'amenities') {
      // Handle checkbox changes
      if (checked) {
        setHotelData({ ...hotelData, amenities: [...hotelData.amenities, value] });
      } else {
        setHotelData({
          ...hotelData,
          amenities: hotelData.amenities.filter((amenity) => amenity !== value),
        });
      }
    } else {
      setHotelData({ ...hotelData, [name]: value });
    }
  };

  const generateRandomImage = () => {
    return `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
  };

  useEffect(() => {
    const randomImage = generateRandomImage();
    setHotelData((prevData) => ({
      ...prevData,
      imageUrl: randomImage,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BACKEND_URL}/hotels`, hotelData)
      .then((response) => {
        navigate('/hotels');
      })
      .catch((error) => {
        console.error('Error adding hotel:', error);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        margin: 0,
        boxSizing: 'border-box',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        minHeight: '70vh', // Take full viewport height
        minWidth: '70vw'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        <h2>Add Hotel</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Hotel Name"
                variant="outlined"
                fullWidth
                name="name"
                value={hotelData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={hotelData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="city"
                value={hotelData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rating"
                variant="outlined"
                fullWidth
                name="rating"
                value={hotelData.rating}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price per Night"
                variant="outlined"
                fullWidth
                name="price"
                value={hotelData.price}
                onChange={handleChange}
              />
            </Grid>

            {/* Amenities checkboxes */}
            <Grid item xs={12}>
              <div>
                <h3>Amenities</h3>
                {amenitiesList.map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        name="amenities"
                        value={amenity}
                        checked={hotelData.amenities.includes(amenity)}
                        onChange={handleChange}
                      />
                    }
                    label={amenity}
                  />
                ))}
              </div>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add Hotel
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddHotel;
