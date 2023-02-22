import React, { useState,useContext } from "react";
import { Button, Slide } from "@mui/material";
import { Add, UploadFile } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle,Typography } from "@mui/material";
import { UploadExcel } from "../Fetch/FetchData";
import AuthContext from "../Context";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = useState(false);
  const { Added } = useContext(AuthContext);
  const [file, setFile] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  function fileSubmit(e) {
    e.preventDefault()
    UploadExcel(file,Added);
    handleClose()
    setFile(null)
  }
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
        From Excel
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>Export from excel file</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <Typography variant="subtitle2" gutterBottom> Select a .xls , .csv file </Typography>
          <form onSubmit={fileSubmit} style={{display:'flex',flexDirection:'column'}}>
            <Button startIcon={<UploadFile />} component="label" style={{margin:'10px'}}>
              Export Excel{" "}
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,xls"
                hidden
                onChange={handleChange}
              />
            </Button>
            <Button type="submit" variant="contained">
              Upload
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
