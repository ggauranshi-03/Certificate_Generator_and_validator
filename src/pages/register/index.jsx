import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.js";


export default function RegisterPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        location: "",
        registrationNo: "",
        pinCode: ""
    })
    const [isValid, setIsValid] = useState({
        companyName: true,
        location: true,
        registrationNo: true,
        pinCode: true
    })
    const { auth } = useAuth()
    console.log(auth);
    const handleChangeFormData = (event) => {
        setIsValid(prev => {
            if (event.target.name === "registrationNo") {
                prev[event.target.name] = !!event.target.value.match(/^\d{12}$/)
            }
            else if (event.target.name === "pinCode") {
                prev[event.target.name] = !!event.target.value.match(/^\d{6}$/)
            }
            else if (event.target.value.length === 0) {
                prev[event.target.name] = true
            }
            return prev
        })
        setFormData(prev => (isValid[event.target.name]) ? ({ ...prev, [event.target.name]: event.target.value }) : prev)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Hello");
        console.log(formData);
        console.log(auth.contract);
        let contract = auth.contract;
        try {
            let transaction = await contract.registerOrganization(formData.companyName, formData.location, formData.registrationNo, formData.pinCode);
            await transaction.wait();
            alert("Successfully registered");
        }
        catch (e) {
            alert(e.reason);
        }
        setFormData({
            companyName: "",
            location: "",
            registrationNo: "",
            pinCode: ""
        })
        console.log("Working");
    }

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
                width: "40%",
                gap: "1rem",

            }}
        >
            <Paper
                sx={{
                    padding: "1.5rem",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    borderRadius: "1rem",
                    backgroundImage: 'linear-gradient(45deg, #0965c0, #c53a94)',
                }}
            >
                <form onSubmit={submitHandler} >
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: "2rem",
                            textAlign: "center"
                        }}
                    >
                        {/* <BusinessIcon fontSize="large" color="primary" /> */}
                        <Typography variant="h2" component="div" fontWeight={900} fontSize={30} sx={{color: "white"}}>Register your company</Typography>
                    </Container>
                    <br />
                    <Container
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: "1rem",
                            fontWeight: "1rem"
                        }}
                    >
                        <TextField
                            placeholder="Company Name"
                            fullWidth
                            label="Institute Name"
                            name="companyName"
                            required
                            onChange={handleChangeFormData}
                            error={!isValid.companyName}
                            value={formData.companyName}
                            // InputLabelProps={{
                            //     style: { fontWeight: 'bold' } // Increase font weight
                            // }}
                            InputLabelProps={{ style: { color: 'white' } }} // Change color of the label
                                InputProps={{
                                    style: {
                                        border: 'white solid',
                                        fontWeight: 'bold',
                                        color: 'white', // Change color of the text
                                    },
                                    placeholder: "Enter receiver's address", // Change color of the placeholder
                                }}
                        />

                        <TextField
                            placeholder="Registration No."
                            label="Registration No."
                            fullWidth
                            name="registrationNo"
                            required
                            onChange={handleChangeFormData}
                            // error={!isValid.registrationNo}
                            // helperText={"Registration No accepts 12 digit number"}
                            InputLabelProps={{ style: { color: 'white' } }} // Change color of the label
                                InputProps={{
                                    style: {
                                        border: 'white solid',
                                        fontWeight: 'bold',
                                        color: 'white', // Change color of the text
                                    },
                                    placeholder: "Enter receiver's address", // Change color of the placeholder
                                }}
                        />

                        <TextField
                            placeholder="Address"
                            label="Address"
                            fullWidth
                            multiline
                            rows={3}
                            maxRows={3}
                            name="location"
                            required
                            onChange={handleChangeFormData}
                            error={!isValid.location}
                            value={formData.location}
                            InputLabelProps={{ style: { color: 'white' } }} // Change color of the label
                                InputProps={{
                                    style: {
                                        border: 'white solid',
                                        fontWeight: 'bold',
                                        color: 'white', // Change color of the text
                                    },
                                    placeholder: "Enter receiver's address", // Change color of the placeholder
                                }}
                        />

                        <TextField
                            placeholder="Pincode"
                            label="Pincode"
                            fullWidth
                            name="pinCode"
                            required
                            onChange={handleChangeFormData}
                            error={!isValid.pinCode}
                            helperText={!isValid.pinCode && "Pin code accepts 6 digit number"}
                            InputLabelProps={{ style: { color: 'white' } }} // Change color of the label
                                InputProps={{
                                    style: {
                                        border: 'white solid',
                                        fontWeight: 'bold',
                                        color: 'white', // Change color of the text
                                    },
                                    placeholder: "Enter receiver's address", // Change color of the placeholder
                                }}
                        />
                    </Container>
                    <Container>
                        <Button type="submit" variant="contained" fullWidth sx={{ color: 'white' }}>
                            Register
                        </Button>
                    </Container>
                </form>
            </Paper>
        </Container >
    )
}