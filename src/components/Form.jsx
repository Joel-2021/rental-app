import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { DocumentScanner } from "@mui/icons-material";
import { inputProperty } from "../Fetch/FetchData";
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
        "& .MuiTextField-root": {
          m: 1,
          width: "500px",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90%",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3
        style={{
          fontFamily: "Helvetica",
          fontWeight: "500",
        }}
      >
        Property Details{" "}
      </h3>
      <TextField
        style={{ width: "97%" }}
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          label="Rent"
          type="number"
          size="small"
          required
          error={errors.rent ? true : false}
          {...register("rent", {
            required: true,
          })}
        />
      </div>
      <TextField
        style={{ width: "97%" }}
        sx={style}
        size="small"
        label="Address"
        type="text"
        // multiline
        // rows={3}
        placeholder="Address"
        error={errors.address ? true : false}
        {...register("address", {
          required: true,
        })}
      />

      <TextField
        style={{ width: "97%" }}
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
      <Button
        startIcon={<DocumentScanner />}
        component="label"
        color={errors.uploaded_images ? "error" : "primary"}
      >
        property image{" "}
        <input
          type="file"
          accept="image/*"
          hidden
          multiple
          {...register("uploaded_images", {
            required: true,
          })}
        />
      </Button>
      <h3
        style={{
          fontFamily: "Helvetica",
          fontWeight: "500",
        }}
      >
       
        Tenant's Details{" "}
      </h3>
      <TextField
        style={{ width: "97%" }}
        sx={style}
        label="Name of Tenant"
        size="small"
        error={errors.tenant_name ? true : false}
        {...register("tenant_name")}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={style}
          label="email"
          size="small"
          {...register("email", { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
        />
        <TextField
          sx={style}
          label="Age"
          type="number"
          size="small"
          error={errors.age ? true : false}
          {...register("age")}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={style}
          label="Phone Number"
          type="number"
          size="small"
          required
          error={errors.phone_number ? true : false}
          {...register("phone_number", {
            minLength: 10,
            maxLength: 10,
          })}
        />
        <TextField
          sx={style}
          label="AADHAR Number"
          type="Number"
          size="small"
          error={errors.adhar_num ? true : false}
          {...register("adhar_num", {
            minLength: 12,
            maxLength: 12,
          })}
        />
      </div>
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
            {...register("adhar_pic")}
          />
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="error" variant="contained" onClick={props.onClose}>
          Close
        </Button>
        <Button color="success" variant="contained" type="submit">
          Add
        </Button>
      </div>
    </Box>
  );
}
