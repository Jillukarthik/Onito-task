import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import "./App.css";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";


const steps = ["Personal Info", "Address Info"];
// ... (previous imports)

import { Controller } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addDetails } from "./store/feacture/AddInfoSlice";
import Datatable from "./Reusable/Datatable";

export default function App() {

  const dispatch=useDispatch()
  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    try {
      let response = await axios.get("https://restcountries.com/v3.1/all");

      if (response.status === 200) {
        // setdata(response.data);
        const country = response?.data?.map((itm) => itm?.name?.common);
        setCountry([...country]);
        console.log(country, "country");
      } else {
        console.error("error", response.status);
      }
    } catch (err) {
      console.log(err, "erro");
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    Name: "",
    Age: "",
    Sex: "",
    Mobile: "",
    IDtype: "",
    IssuedId: "",
    Address: "",
    State: "",
    City: "",
    Country: "",
    Pincode: "",
  });

  const [idDoc, setidDoc] = useState("Aadhar");
  const [country, setCountry] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: data,
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = (formData) => {
    setData((prevData) => ({ ...prevData, ...formData }));
    setValue("IDtype", idDoc);
    console.log({ ...data, ...formData, IDtype: idDoc }, "ghj");
    if(activeStep + 1 !== 1){
    dispatch(addDetails({...formData, IDtype: idDoc }))
    }
    if(activeStep === steps.length - 1){
      setActiveStep((prev)=>prev-1)
      setTimeout(()=>{
        reset();
      },2000)
     
    }else{
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="app">
      <Box sx={{ width: "60%", margin: "auto" }}>
        <h1 className="app__title">Data Table Task</h1>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
       
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <div className="stepper">
              {activeStep + 1 === 1 ? (
                <Box className="stepperOne">
                  <h2 style={{ textAlign: "center" }}>Personal Information</h2>
                  <form
                    id="myform"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                    onSubmit={handleSubmit(handleNext)}
                  >
                    <Controller
                      name="Name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Required",
                        minLength: { value: 3, message: "Min 3 characters" },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Name"
                          variant="outlined"
                          error={!!errors?.Name}
                          helperText={errors?.Name?.message}
                        />
                      )}
                    />

                    <Controller
                      name="Age"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Required",
                        pattern: {
                          value: /^[-]?[0-9]+[\.]?[0-9]+$/,
                          message: "Only Positive integer",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Age"
                          variant="outlined"
                          error={!!errors?.Age}
                          helperText={errors?.Age?.message}
                        />
                      )}
                    />

                    <Controller
                      name="Sex"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <FormControl>
                          <InputLabel id="demo-simple-select-label">
                            Sex
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sex"
                            error={!!errors?.Sex}
                          >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                          </Select>
                          {errors?.Sex && (
                            <Typography variant="caption" color="error">
                              {errors?.Sex.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />

                    <Controller
                      name="Mobile"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Required",
                        pattern: {
                          value:
                            /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
                          message: "Valid Indian Mobile Number",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Mobile"
                          variant="outlined"
                          error={!!errors?.Mobile}
                          helperText={errors?.Mobile?.message}
                        />
                      )}
                    />

                    <Controller
                      name="IDtype"
                      control={control}
                      defaultValue={idDoc}
                      // rules={{ required: "Required" }}
                      render={({ field }) => (
                        <FormControl>
                          <InputLabel id="demo-simple-select-label">
                            Govt issued ID
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Govt issues ID"
                            // error={!!errors?.IDtype}
                            value={idDoc}
                            onChange={(e) => {
                              setidDoc(e.target.value);
                              setValue("IDtype", idDoc);
                            }}
                          >
                            <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
                            <MenuItem value={"Pan"}>Pan</MenuItem>
                          </Select>
                          {/* {errors?.IDtype && (
                            <Typography variant="caption" color="error">
                              {errors?.IDtype.message}
                            </Typography>
                          )} */}
                        </FormControl>
                      )}
                    />

                    {idDoc === "Aadhar" && (
                      <Controller
                        name="IssuedId"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Required",
                          pattern: {
                            value: /^[2-9]\d{11}$/,
                            message:
                              "Aadhar should have 12 numeric digits and should not start with 0 and 1.",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-basic"
                            label="Aadhar Number"
                            variant="outlined"
                            error={!!errors?.IssuedId}
                            helperText={errors?.IssuedId?.message}
                          />
                        )}
                      />
                    )}

                    {idDoc === "Pan" && (
                      <Controller
                        name="IssuedId"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Required",
                          pattern: {
                            value: /^[A-Za-z0-9]{10}$/,
                            message:
                              "PAN should be a ten-character long alpha-numeric string.",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined-basic"
                            label="PAN Number"
                            variant="outlined"
                            error={!!errors?.IssuedId}
                            helperText={errors?.IssuedId?.message}
                          />
                        )}
                      />
                    )}
                  </form>
                </Box>
              ) : (
                <Box className="stepperTwo">
                  <h2 style={{ textAlign: "center" }}>Address Details</h2>
                  <form
                    id="myform"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                    onSubmit={handleSubmit(handleNext)}
                  >
                    <Controller
                      name="Address"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Address"
                          variant="outlined"
                        />
                      )}
                    />

                    <Controller
                      name="State"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="State"
                          variant="outlined"
                        />
                      )}
                    />
                    <Controller
                      name="City"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="City"
                          variant="outlined"
                        />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={country}
                      // sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          error={!!errors?.Country}
                          helperText={errors?.Country?.message}
                        />
                      
                      )}
                      onChange={(event, value) => setValue("Country", value)}
                    />
                    <Controller
                      name="Pincode"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Pincode"
                          variant="outlined"
                          rules={{
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message:
                                "Numeric Only",
                            },
                          }}
                        />
                      )}
                    />
                  </form>
                </Box>
              )}
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                style={{ color: "#1976D2", color: "white" }}
                type="submit"
                form="myform"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              {/* <Button onClick={() => setActiveStep(0)}>Reset</Button> */}
            </Box>
            <Datatable/>
          </React.Fragment>
      </Box>
    </div>
  );
}
