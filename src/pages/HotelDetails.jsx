import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { FaWifi, FaDumbbell, FaSpa, FaParking, FaUtensils, FaCocktail } from "react-icons/fa"; // Import icons
import axios from "axios";
import { BACKEND_URL } from "../const";
import { useParams } from "react-router-dom";

const amenitiesIcons = {
  WiFi: <FaWifi />,
  Gym: <FaDumbbell />,
  Spa: <FaSpa />,
  Parking: <FaParking />,
  Restaurant: <FaUtensils />,
  Bar: <FaCocktail />,
};

const HotelDetails = () => {
  const { id } = useParams(); // Get hotel ID from route params
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/hotels/${id}`)
      .then((response) => setHotel(response.data.data))
      .catch((error) =>
        console.error("There was an error fetching the hotel details:", error)
      );
  }, [id]);

  if (!hotel) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
      <CardMedia
        sx={{ height: 300, mb: 3, borderRadius: 1 }}
        image={hotel.imageUrl || "https://picsum.photos/800/600"}
        title="Hotel Image"
      />
      <Typography variant="h4" gutterBottom>
        {hotel.name}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        {hotel.address}, {hotel.city}
      </Typography>
      <Rating
        name="hotel-rating"
        value={hotel.rating}
        precision={0.1}
        readOnly
        sx={{ mb: 3 }}
      />
      <Typography variant="h5" gutterBottom>
        Amenities
      </Typography>
      <List>
        {hotel?.amenities.map((amenity) => (
          <ListItem key={amenity}>
            <ListItemIcon sx={{ fontSize: "1.5rem", marginRight: 1 }}>
              {amenitiesIcons[amenity] || null}
            </ListItemIcon>
            <ListItemText primary={amenity} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HotelDetails;
