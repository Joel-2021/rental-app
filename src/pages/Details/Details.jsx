import React, { useEffect, useState } from "react";
import { FetchProperty } from "../../Fetch/FetchData";
import { Container, InputLabel, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { LocationOn } from "@mui/icons-material";
import Header from "../../components/Header";
const Details = () => {
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
  return (
    <>
      <Header />
      <Container
        style={{
          display: "flex",
          padding: "10px 20px",
          justifyContent: "space-around",
        }}
      >
        <div className="left">
          <img src={detail.property_pic} width={400} height={400} />
        </div>
        <div className="right" style={{padding:"10px"}}>
          <Typography variant="h3" gutterBottom padding="10px">{detail.property_name}</Typography>
      
          <Grid
            container
            columns={{ xs: 1, sm: 4, md: 8 }}
          >
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Type:</InputLabel>
              <span>{detail.bhk}BHK</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Address:</InputLabel>
              <span>{detail.address}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Tenant Name:</InputLabel>
              <span>{detail.tenant_name}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Phone Number:</InputLabel>
              <span>{detail.phone_number}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Email:</InputLabel>
              <span>{detail.email}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Age:</InputLabel>
              <span>{detail.age}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Rent:</InputLabel>
              <span>{detail.rent}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Rent Date:</InputLabel>
              <span>{detail.rent_date}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Aadhar Num:</InputLabel>
              <span>{detail.adhar_num}</span>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <InputLabel>Adhar Card:</InputLabel>
              <span>
                <a target="_blank" rel="noreferrer" href={detail.adhar_pic}>
                  {" "}
                  AAdhar doc
                </a>
              </span>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Details;
