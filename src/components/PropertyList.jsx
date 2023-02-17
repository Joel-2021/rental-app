import React, {useEffect,useState,useContext} from 'react'; 
import PropertyDetail from './PropertyDetail';
import { Button, Container,Box,Grid,Typography } from '@mui/material';
import Modal from './Modal'
import AuthContext from '../Context';
import { FetchPropertyList } from '../Fetch/FetchData';


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
         id={property.id}
         />
          </Grid> 
        ))}
      </Grid>
    </Box>
    </Container>
  );
}
