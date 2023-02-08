import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Input, FormControl } from "@mui/material";
import { useFormState, useForm } from "react-hook-form";
import { UploadFile } from "@mui/icons-material";

export default function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    e.preventDefault();
    console.log(data)
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
        <TextField
          label="Name of Property"
          size="small"
          error={errors.propertyName ? true : false}
          required
          {...register("propertyName", {
            required: true,
          })}
        />
        <TextField
          label="BHK"
          type="number"
          size="small"
          error={errors.BHK ? true : false}
          required
          {...register("BHK", {
            required: true,
          })}
        />
        <TextField
          label="Address"
          type="text"
          size="small"
          error={errors.address ? true : false}
          required
          {...register("address", {
            required: true,
          })}
        />
        <TextField
          label="Name of Tenant"
          size="small"
          required
          error={errors.tenantName ? true : false}
          {...register("tenantName", {
            required: true,
          })}
          />
        <TextField
          label="Age"
          type="number"
          size="small"
          error={errors.age ? true : false}
          required
          {...register("age", {
            required: true,
          })}
        />
        <TextField
          label="Phone Number"
          type="number"
          size="small"
          required
          error={errors.phoneNo ? true : false}
          {...register("phoneNo", {
            required: true,
          })}
          />
        <TextField
          label="Rent"
          type="number"
          size="small"
          required
          error={errors.rent ? true : false}
          {...register("rent", {
            required: true,
          })}
        />
        <TextField
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
        <TextField
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
