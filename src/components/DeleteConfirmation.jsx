import React, { useState,useContext } from "react";
import { Button, Slide } from "@mui/material";
import { Delete} from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DeleteProperty } from "../Fetch/FetchData";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmation({id}) {
    const {Deleted}=useContext(AuthContext)
    const navigate=useNavigate()
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    DeleteProperty(id, Deleted);
    navigate("/home");
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<Delete sx={{ color: "white" }} />}
        style={{
          fontFamily: "Poppins, san-serif",
          color: "white",
          fontWeight: "600",
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>Do you want to Delete this property?</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={handleClose}>NO</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
