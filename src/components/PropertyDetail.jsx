import { LocationOn } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import React from "react";

const PropertyDetail = () => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#B6EADA", boxShadow: "none" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={require("../assets/img.jpg")}
        title="Friends Villa A1"
      />
      <CardContent>
        <CardHeader title="Friends Villa" subheader="2BHK" />
        <div style={{ display: "flex" }}>
          <LocationOn />
          <Typography variant="subtitle2">ward no 18</Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            bgcolor: "#03001c",
            ":hover": {
              bgcolor: "white",
              color: "#03001c",
            },
          }}
        >
          Details
        </Button>
      </CardActions>
      <Alert severity="error">Rent not paid</Alert>
      <Alert severity="warning">Rent is due</Alert>
    </Card>
  );
};

export default PropertyDetail;
