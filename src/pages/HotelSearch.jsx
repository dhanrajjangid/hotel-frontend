import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../const";

const HotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHotels = (query) => {
    const data = {
      prompt: query
    }
    axios
      .post(`${BACKEND_URL}/hotels/search`, data)
      .then((response) => {
        setHotels(response.data.data);
        if(response.data.data?.length === 0){
          setErrorMessage(response?.data?.message || '')
        }
        console.log(response)
      })
      .catch((error) => {
        console.error("There was an error fetching the hotels:", error);
      });
  };

  const handleSearch = () => {
    fetchHotels(searchQuery); // Fetch hotels based on the search query
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Search Section */}
      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          label="Search for Hotels"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setErrorMessage('') }}
          sx={{ width: "50%", marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mb={10}>
        <Typography
          variant="body2"
          component="p"
          style={{
            color: "#6c757d",
            fontStyle: "italic",
            marginTop: "8px",
            fontSize: "0.9rem",
          }}
        >
          For example: "Find a hotel in Indore with a rating of 3 or above,
          price below ₹200, and has a pool."
        </Typography>
      </Box>
      {/* Hotels List */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
        {hotels?.map((hotel) => (
          <Card sx={{ minWidth: 300, mb: 2 }} key={hotel.id}>
            <CardMedia
              sx={{ height: 140 }}
              image={hotel.imageUrl || "https://picsum.photos/200/300"}
              title="Hotel Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hotel.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", marginBottom: 1 }}
              >
                {hotel.address}, {hotel.city}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                ₹{hotel.price} per night
              </Typography>
              <Rating
                name="hotel-rating"
                value={hotel.rating} // Assuming hotel.rating is between 1 and 5
                precision={0.1} // Optional: allows fractional ratings, e.g., 4.5 stars
                readOnly // Make the stars read-only, so users can't change the rating here
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HotelSearch;
