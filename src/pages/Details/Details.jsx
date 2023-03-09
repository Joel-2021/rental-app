import React, { useEffect, useState, useMemo, useContext } from "react";
import { FetchProperty } from "../../Fetch/FetchData";
import {
  Box,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { WhatsApp } from "@mui/icons-material";
import Header from "../../components/Header/Header";
import AuthContext from "../../Context";
import UpdateBox from "../../components/UpdateBox";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import Carousel from "../../components/carousel";
const Details = () => {
  const { isUpdated } = useContext(AuthContext);
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
  }, [id, isUpdated]);

  const memoizedDetail = useMemo(() => detail, [detail]);
  console.log(memoizedDetail);
  console.log(memoizedDetail.images);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  return (
    <>
      <Snackbar open={isUpdated} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Property Updated!
        </Alert>
      </Snackbar>

      <Header />
      {memoizedDetail ? (
        <Box width="80%" m="50px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            <Box flex="1 1 60%" mb="40px">
              <Box sx={{ width: "100%" }}>
                <Carousel images={memoizedDetail.images} />
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <UpdateBox data={memoizedDetail} />
                  <DeleteConfirmation id={memoizedDetail.id} />
                </Box>
              </Box>
            </Box>
            {/* PROPERTY INFO */}
            <Box flex="1 1 30%" mb="40px">
              <Box>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                </div>
                <Typography
                  variant="subtitle2"
                  textTransform={"capitalize"}
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Address: {memoizedDetail.address}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Rent: {memoizedDetail.rent}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Rent Date: {memoizedDetail.rent_date}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Property Type: {memoizedDetail.bhk} BHK
                </Typography>
              </Box>
              {/* TENANT INFO */}
              <Box m="15px 0 25px 0">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontFamily={"Open Sans, san-serif"}
                    fontWeight="Bold"
                  >
                    Tenant{" "}
                    {memoizedDetail?.is_tenant_active
                      ? "is Active"
                      : "is not Active"}
                  </Typography>
                </div>
                <Typography
                  variant="subtitle2"
                  textTransform={"capitalize"}
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Name : {memoizedDetail.tenant_name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Email : {memoizedDetail?.email}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Phone :{memoizedDetail.phone_number}{" "}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Age : {memoizedDetail.age}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
                  Adharcard Number : {memoizedDetail.adhar_num}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontFamily={"Open Sans ,san-serif"}
                >
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
                  }}
                >
                  <a
                    href={`"https://api.whatsapp.com/send?phone="${memoizedDetail.phone_number}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Contact on WhatsApp
                  </a>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "90vw",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            This Property has already been deleted
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Details;
