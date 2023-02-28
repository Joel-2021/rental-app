import React, { useContext, useState } from "react";
import {
  Button,
  Slide,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import AuthContext from "../Context";
import { UpdateProperty } from "../Fetch/FetchData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  width: { sm: "200", md: "200", xs: "100" },
  "& .MuiInputBase-root": {},
};

export default function UpdateBox({ data }) {
  const { Updated } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(res, e) {
    e.preventDefault();
    console.log(data)
    UpdateProperty(data.id, res, Updated);
    handleClose();
  }

  const [open, setOpen] = useState(false);
  const [isActive,setIsActive]=useState(data.is_tenant_active)
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const switchHandler = (event) => {
    setIsActive(event.target.checked);
    console.log(isActive)
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<Edit sx={{ color: "white" }} />}
        style={{
          fontFamily: "Poppins, san-serif",
          color: "white",
          fontWeight: "600",
        }}
      >
        Update
      </Button>
      <Dialog open={open} TransitionComponent={Transition}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <DialogTitle>Update Details</DialogTitle>
        
            <FormControlLabel
              control={<Switch 
                defaultChecked={data.is_tenant_active}
              {...register('is_tenant_active')}
              />}
              label="Active Tenant"
            />
         
        </div>
        <DialogContent style={{ textAlign: "center" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              sx={style}
              label="Name of Property"
              InputLabelProps={{ shrink: true }}
              size="small"
              defaultValue={data.property_name}
              error={errors.property_name ? true : false}
              required
              {...register("property_name", {
                required: true,
              })}
              padding="100px"
            />
            <TextField
              sx={style}
              label="BHK"
              type="number"
              size="small"
              defaultValue={data.bhk}
              InputLabelProps={{ shrink: true }}
              error={errors.bhk ? true : false}
              required
              {...register("bhk", {
                required: true,
              })}
            />
            <TextField
              sx={style}
              label="Address"
              defaultValue={data.address}
              InputLabelProps={{ shrink: true }}
              type="text"
              size="small"
              error={errors.address ? true : false}
              required
              {...register("address", {
                required: true,
              })}
            />
            <TextField
              sx={style}
              label="Name of Tenant"
              InputLabelProps={{ shrink: true }}
              size="small"
              defaultValue={data.tenant_name}
              required
              error={errors.tenant_name ? true : false}
              {...register("tenant_name", {
                required: true,
              })}
            />
            <TextField
              sx={style}
              label="email"
              InputLabelProps={{ shrink: true }}
              defaultValue={data.email}
              size="small"
              required
              {...register("email")}
            />
            <TextField
              sx={style}
              label="Age"
              InputLabelProps={{ shrink: true }}
              type="number"
              size="small"
              defaultValue={data.age}
              error={errors.age ? true : false}
              required
              {...register("age", {
                required: true,
              })}
            />
            <TextField
              sx={style}
              label="Phone Number"
              type="number"
              size="small"
              InputLabelProps={{ shrink: true }}
              required
              defaultValue={data.phone_number}
              error={errors.phone_number ? true : false}
              {...register("phone_number", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
            />
            <TextField
              sx={style}
              label="Rent"
              type="number"
              size="small"
              InputLabelProps={{ shrink: true }}
              defaultValue={data.rent}
              required
              error={errors.rent ? true : false}
              {...register("rent", {
                required: true,
              })}
            />
            <TextField
              sx={style}
              label="Rent Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              size="small"
              defaultValue={data.rent_date}
              error={errors.rent_date ? true : false}
              required
              {...register("rent_date", {
                required: true,
              })}
            />
            <TextField
              sx={style}
              label="AADHAR Number"
              type="Number"
              size="small"
              InputLabelProps={{ shrink: true }}
              required
              defaultValue={data.adhar_num}
              error={errors.adhar_num ? true : false}
              {...register("adhar_num", {
                required: true,
                minLength: 12,
                maxLength: 12,
              })}
            />
            {/* <div className="upload">
              <Button
                startIcon={<DocumentScanner />}
                component="label"
                color={errors.adhar_pic && "error"}
              >
                Aadhar image{" "}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("adhar_pic")}
                />
              </Button>
              <Button
                startIcon={<DocumentScanner />}
                component="label"
                color={errors.property_pic ? "error" : "primary"}
              >
                property image{" "}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("property_pic")}
                />
              </Button>
            </div> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button color="success" variant="contained" type="submit">
                Update
              </Button>
              <Button color="error" variant="contained" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
