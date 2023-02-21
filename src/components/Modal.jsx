import * as React from "react";
import { Button, Slide } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Form from "./Form";

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
      <Button
        onClick={handleOpen}
        sx={{
          ":hover": {
            bgcolor: "primary.main",
            color: "white",
          },
          width: { xs: "80px", lg: "150px" },
          height: { xs: "30px", lg: "40px" },
          fontSize: { xs: "10px", lg: "13px" },
        }}
        startIcon={<Add />}
      >
        Add Property
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        // keepMounted
      >
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <Form onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
