import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import IssueCertificatePage from "./issue-certificate";
import IssuedCertificatesPage from "./issued-certificates";
import Layout from "./layout";
import RegisterPage from "./register";
import UploadCertificatePage from "./upload-certificate";
import { IconButton, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";


const panels = {
    "Registration": <RegisterPage />,
    "Issue Certificates": <IssueCertificatePage />,
    "Upload Certificates": <UploadCertificatePage />,
    "Issued Certificates": <IssuedCertificatesPage />,
    // "Transaction History": "5"
}

export default function IndexPage() {
    const [accountAddr, setAccountAddr] = useState("");


    const [value, setValue] = useState(Object.keys(panels)[0]);
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };
    const menuId = "primary-search-account-menu";
    const connectToMetamask = async () => {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0xaa36a7") {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xaa36a7" }],
            });
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        setAccountAddr(accounts[0]);
    };

    return (
        <Layout>
            <Box sx={{ width: '100%', typography: 'h2' }} >
                <TabContext value={value}>
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: "center" }}>
                        <TabList onChange={handleChange}>
                            {Object.keys(panels).map(e => (
                                <Tab key={e} label={e} value={e} />
                            ))}
                        </TabList>
                    </Box> */}
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: "center" }}>
                        <TabList onChange={handleChange}>
                            {Object.keys(panels).map(e => (
                                <Tab key={e} label={e} value={e} />
                            ))}
                        </TabList>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={connectToMetamask}
                        >
                            <AccountCircle fontSize="medium" />
                            <Typography component="div" variant="body1" fontWeight={500}>
                                {accountAddr
                                    ? accountAddr.slice(0, 6) + "..." + accountAddr.slice(-4)
                                    : "Connect To Metamask"}
                            </Typography>
                        </IconButton>
                    </Box> */}
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            display: 'flex',
                            justifyContent: "center",
                            backgroundImage: 'linear-gradient(45deg, #f3f520, #60b6f1)', // Set background color to green
                            padding: '8px' // Add some padding for better appearance
                        }}
                    >
                        <TabList onChange={handleChange}>
                            {Object.keys(panels).map(e => (
                                <Tab key={e} label={e} value={e} />
                            ))}
                        </TabList>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={connectToMetamask}
                        >
                            <AccountCircle fontSize="medium" />
                            <Typography component="div" variant="body1" fontWeight={500}>
                                {accountAddr
                                    ? accountAddr.slice(0, 6) + "..." + accountAddr.slice(-4)
                                    : "Connect To Metamask"}
                            </Typography>
                        </IconButton>
                    </Box>

                    {Object.keys(panels).map(e => (
                        <TabPanel key={e} value={e}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "80vh",
                                    paddingTop: "2rem",
                                    width: "100%",
                                    background: "inherit"
                                }}
                            >
                                {panels[e]}
                            </Paper>
                        </TabPanel>
                    ))}
                </TabContext>
            </Box>
        </Layout>
    )
}