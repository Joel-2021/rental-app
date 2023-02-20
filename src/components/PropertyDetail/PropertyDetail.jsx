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
import Details from "../../pages/Details/Details";
import { FetchProperty } from "../../Fetch/FetchData";
import { useNavigate } from "react-router-dom";

const PropertyDetail = (props) => {
  const navigate=useNavigate()
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#B6EADA", boxShadow: "none" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.pic}
        title={props.name}
      />
      <CardContent>
        <CardHeader title={props.name} subheader={`${props.bhk}BHK`} />
        <div style={{ display: "flex" }}>
          <LocationOn />
          <Typography variant="subtitle2">{props.address}</Typography>
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
          onClick={()=>navigate(`/home/${props.id}`)}
        >
          Details
        </Button>
      </CardActions>
      {/* <Alert severity="error">Rent not paid</Alert>
      <Alert severity="warning">Rent is due</Alert> */}
    </Card>
  );
};

export default PropertyDetail;
