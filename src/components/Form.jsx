import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Input, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import { UploadFile } from "@mui/icons-material";

const style={ 
  width: { sm: '200', md: '200', xs:'100' },
  "& .MuiInputBase-root": {
    // height: '80'
}
}
export default function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    e.preventDefault();
    console.log(data)
   props.onClose()
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
        <TextField sx={style}
          label="Name of Property"
          size="small"
          error={errors.propertyName ? true : false}
          required
          {...register("propertyName", {
            required: true,
          })}
          padding='100px'
        />
        <TextField sx={style}
          label="BHK"
          type="number"
          size="small"
          error={errors.BHK ? true : false}
          required
          {...register("BHK", {
            required: true,
          })}
        />
        <TextField sx={style}
          label="Address"
          type="text"
          size="small"
          error={errors.address ? true : false}
          required
          {...register("address", {
            required: true,
          })}
        />
        <TextField sx={style}
          label="Name of Tenant"
          size="small"
          required
          error={errors.tenantName ? true : false}
          {...register("tenantName", {
            required: true,
          })}
          />
        <TextField sx={style}
          label="email"
          size="small"
          required
          error={errors.email ? true : false}
          {...register("email", {
            required: true,
          })}
          />
        <TextField sx={style}
          label="Age"
          type="number"
          size="small"
          error={errors.age ? true : false}
          required
          {...register("age", {
            required: true,
          })}
        />
        <TextField sx={style}
          label="Phone Number"
          type="number"
          size="small"
          required
          error={errors.phoneNo ? true : false}
          {...register("phoneNo", {
            required: true,
          })}
          />
        <TextField sx={style}
          label="Rent"
          type="number"
          size="small"
          required
          error={errors.rent ? true : false}
          {...register("rent", {
            required: true,
          })}
        />
        <TextField sx={style}
          label="Rent Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          size="small"
          error={errors.rentDate ? true : false}
          required
          {...register("rentDate", {
            required: true,
          })}
        />
        <TextField sx={style}
          label="AADHAR Number"
          type="Number"
          size="small"
          required
          error={errors.aadharNo ? true : false}
          {...register("aadharNo", {
            required: true,
          })}
        />
        <div className="upload">
        <Button startIcon={<UploadFile />} component="label" color={errors.aadharImg&&'error'}>
          Aadhar image <input type="file" hidden {...register("aadharImg",{
            required:true
          })}/>
        </Button>
        <Button startIcon={<UploadFile />} component="label" color={errors.propImg?'error':'primary'}>
          property image <input type="file" hidden {...register("propImg",{
            required:true
          })} />
        </Button>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>

      <Button color="success" variant="contained" type="submit">
        Add
      </Button>
      <Button color="error" variant="contained" onClick={props.onClose}>
        Close
      </Button>
          </div>
    </Box>
  );
}
