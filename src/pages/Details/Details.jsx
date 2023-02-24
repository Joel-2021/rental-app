import React, { useEffect, useState, useMemo, useContext } from "react";
import { DeleteProperty, FetchProperty, UpdateProperty } from "../../Fetch/FetchData";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, Edit, LocationOn, WhatsApp } from "@mui/icons-material";
import Header from "../../components/Header/Header";
import AuthContext from "../../Context";
const Details = () => {
  const navigate=useNavigate()
  const {Deleted}=useContext(AuthContext)
  const [detail, setDetail] = useState({});
  let { id } = useParams();
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const property = await FetchProperty(id);
        setDetail(property);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchdetails();
  }, [id]);

  const memoizedDetail = useMemo(() => detail, [detail]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleDelete = () => {
    DeleteProperty(id,Deleted);
    navigate('/home')
  };
  const handleUpdate = (memoizedDetail) => {
    UpdateProperty(id,memoizedDetail)
    // navigate('/home')
  };
  return (
    <>
      <Header />
      <Box width="80%" m="80px auto" sx={{ overflow: "hidden" }}>
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
            <img
              src={memoizedDetail?.property_pic}
              alt={memoizedDetail.property_name}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
            {/* <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Item>
                  <img
                    src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*2X75k4WUxJUztgad.jpg"
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <img
                    src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*2X75k4WUxJUztgad.jpg"
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <img
                    src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*2X75k4WUxJUztgad.jpg"
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <img
                    src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*2X75k4WUxJUztgad.jpg"
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Item>
              </Grid>
            </Grid>
          </Box> */}
          </Box>
          {/* PROPERTY INFO */}
          <Box flex="1 1 50%" mb="40px">
            <Box>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Poppins, san-serif",
                    color: "#537FE7",
                    fontWeight: "600",
                  }}
                  textTransform={"capitalize"}
                >
                  {memoizedDetail.property_name}
                </Typography>
                <div>

                <IconButton onClick={handleUpdate}>
                  <Edit/>
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <Delete />
                </IconButton>
                </div>
              </div>
              <Typography variant="subtitle2" textTransform={"capitalize"}>
                Address: {memoizedDetail.address}
              </Typography>
              <Typography variant="subtitle2">
                Rent: {memoizedDetail.rent}
              </Typography>
              <Typography variant="subtitle2">
                Rent Date: {memoizedDetail.rent_date}
              </Typography>
              <Typography variant="subtitle2">
                Property Type: {memoizedDetail.bhk} BHK
              </Typography>
            </Box>
            {/* TENANT INFO */}
            <Box m="15px 0 25px 0">
              <Typography variant="h6" fontFamily={"Roboto, san-serif"}>
                Tenant Info
              </Typography>

              <Typography variant="subtitle2" textTransform={"capitalize"}>
                Name : {memoizedDetail.tenant_name}
              </Typography>
              <Typography variant="subtitle2">
                Email : {memoizedDetail?.email}
              </Typography>
              <Typography variant="subtitle2">
                Phone :{memoizedDetail.phone_number}{" "}
              </Typography>
              <Typography variant="subtitle2">
                Age : {memoizedDetail.age}
              </Typography>
              <Typography variant="subtitle2">
                Adharcard Number : {memoizedDetail.adhar_num}
              </Typography>
              <Typography variant="subtitle2">
                Adharcard Document :{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={memoizedDetail.adhar_pic}
                >
                  Click here
                </a>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">
              <Button
                color="success"
                variant="contained"
                startIcon={<WhatsApp />}
                sx={{
                  borderRadius: 0,
                  minWidth: "100px",
                  padding: "10px 40px",
                  // width: "100%",
                }}
              >
                Contact on WhatsApp
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Details;
