import * as React from 'react';
import {Button,Slide} from '@mui/material';

import {Dialog,DialogContent,DialogTitle} from '@mui/material';
import Form from './Form'

const style = {
  overflow:'scroll',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  return (
    <div>
      <Button onClick={handleOpen}  sx={{
            ":hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}>Add Property</Button>
      <Dialog
open={open}
TransitionComponent={Transition}
// keepMounted
>
<DialogTitle>{'Add Details'}</DialogTitle>
<DialogContent style={{textAlign:'center'}}>
 <Form onClose={handleClose}/>
</DialogContent>
</Dialog>
    </div>
  );
}


