import * as React from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Input,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UploadFile } from "@mui/icons-material";

const style = {
  width: { sm: "200", md: "200", xs: "100" },
  "& .MuiInputBase-root": {
    // height: '80'
  },
};

const inputProperty = async (data) => {
  const formData = new FormData();
  formData.append("property_name", data.property_name);
  formData.append("tenant_name", data.tenant_name);
  formData.append("age", data.age);
  formData.append("rent", data.rent);
  formData.append("address", data.address);
  formData.append("email", data.email);
  formData.append("bhk", data.bhk);
  formData.append("phone_number", data.phone_number);
  formData.append("adhar_num", data.adhar_num);
  formData.append("adhar_pic", data.adhar_pic[0]);
  formData.append("property_pic", data.property_pic[0]);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/property/post_property/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // include token in Authorization header
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Property added successfully");
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export default function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    e.preventDefault();
    // console.log(data)
    inputProperty(data);
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
        error={errors.propertyName ? true : false}
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
        error={errors.BHK ? true : false}
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
        error={errors.tenantName ? true : false}
        {...register("tenant_name", {
          required: true,
        })}
      />
      <TextField
        sx={style}
        label="email"
        size="small"
        required
        error={errors.email ? true : false}
        {...register("email", {
          required: true,
        })}
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
        error={errors.phoneNo ? true : false}
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
        error={errors.rentDate ? true : false}
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
        error={errors.aadharNo ? true : false}
        {...register("adhar_num", {
          required: true,
          minLength: 12,
          maxLength: 12,
        })}
      />
      <div className="upload">
        <Button
          startIcon={<UploadFile />}
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
          startIcon={<UploadFile />}
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
