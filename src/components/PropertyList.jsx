import * as React from 'react';
import PropertyDetail from './PropertyDetail';
import { Button, Container,Box,Grid,Typography } from '@mui/material';
import Modal from './Modal'

export default function PropertyList() {
  return (
    <Container>
    <div style={{display:'flex',justifyContent:'space-between',padding:'1rem'}}>
        <Typography variant='h6' gutterBottom>Your Properties</Typography>
       <Modal/>
    </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 16 }}>
        {Array.from(Array(16)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <PropertyDetail/>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
  );
}
