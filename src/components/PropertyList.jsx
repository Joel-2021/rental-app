import React, {useEffect,useState} from 'react'; 
import PropertyDetail from './PropertyDetail';
import { Button, Container,Box,Grid,Typography } from '@mui/material';
import Modal from './Modal'

const URL="http://127.0.0.1:8000/property/user_property/"
const FetchPropertyList=async()=>{
  try {
    const token=localStorage.getItem("token")
    const response= await fetch(URL,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // include token in Authorization header
      },
    })
    if(response.ok){
      const jsonData=await response.json()
      return (jsonData.property)
    }
  } catch (error) {
    console.log(error.message)
  }
}

export default function PropertyList() {

  const[properties,setProperties]=useState([])

  useEffect(()=>{
    const fetchProperties = async () => {
      try {
        const properties = await FetchPropertyList();
        setProperties(properties);
        console.log(properties)
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProperties();
  },[])

  return (
    <Container>
    <div style={{display:'flex',justifyContent:'space-between',padding:'1rem'}}>
        <Typography variant='h6' gutterBottom>Your Properties</Typography>
       <Modal/>
    </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 16 }}>  
        
        {properties.map((property)=>(
          <Grid item xs={2} sm={4} md={4} key={property.id}>
       
         <PropertyDetail name={property.property_name}
         address={property.address}
         bhk={property.bhk}
         pic={property.property_pic}
         />
          </Grid> 
        ))}
      </Grid>
    </Box>
    </Container>
  );
}
