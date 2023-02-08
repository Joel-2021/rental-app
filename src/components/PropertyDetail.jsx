import { LocationOn } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

const PropertyDetail = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={require('../assets/img.jpg')}
        title="Friends Villa A1"
      />
      <CardContent>
        <CardHeader title="Friends Villa" subheader="2BHK" />
        <div style={{display:'flex'}}>
        <LocationOn/>
        <Typography variant="subtitle2">
         ward no 18
        </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
        variant="outlined"
          sx={{
            ":hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyDetail;
