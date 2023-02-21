import React, { useContext,useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Button, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { DocumentScanner, UploadFile } from "@mui/icons-material";
import { inputProperty,UploadExcel } from "../Fetch/FetchData";
import AuthContext from "../Context";
const style = {
  width: { sm: "200", md: "200", xs: "100" },
  "& .MuiInputBase-root": {
    // height: '80'
  },
};

export default function Form(props) {
  const { Added } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    e.preventDefault();
    inputProperty(data, Added);
    props.onClose();
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
        sx={style}
        label="Name of Property"
        size="small"
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
        error={errors.bhk ? true : false}
        required
        {...register("bhk", {
          required: true,
        })}
      />
      <TextField
        sx={style}
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
        sx={style}
        label="Name of Tenant"
        size="small"
        required
        error={errors.tenant_name ? true : false}
        {...register("tenant_name", {
          required: true,
        })}
      />
      <TextField
        sx={style}
        label="email"
        size="small"
        required
        {...register("email")}
      />
      <TextField
        sx={style}
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
        sx={style}
        label="Phone Number"
        type="number"
        size="small"
        required
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
        required
        error={errors.adhar_num ? true : false}
        {...register("adhar_num", {
          required: true,
          minLength: 12,
          maxLength: 12,
        })}
      />
      <div className="upload">
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
            {...register("adhar_pic", {
              required: true,
            })}
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
            {...register("property_pic", {
              required: true,
            })}
          />
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
