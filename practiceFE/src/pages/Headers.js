import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Avatar, Tooltip } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const Headers = ({ name, email }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [validToken, setValidToken] = React.useState("");

  const handleChange = (event) => {
    setAuth(event.target.checked);
    if (event.target.checked === false) {
      Swal.fire({
        title: "Logout Success !",
        text: "Welcome to Login Page",
        icon: "success",
      });

      sessionStorage.setItem(
        "userdetails",
        JSON.stringify({ name: "", email: "", jwttoken: "" })
      );
      navigate("/login");
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 0.1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
              sx={{
                marginLeft: "auto", // To move the switch to the left
                borderRadius: "12px", // Adds rounded corners to the switch
                border: "1px solid lightblue", // Adds a border to the switch
                padding: "2px", // Adds padding inside the switch for better appearance
                "& .MuiSwitch-switchBase": {
                  color: "lightblue", // Light blue color for the switch
                },
                "& .Mui-checked": {
                  color: "lightblue", // Ensures the checked state has the same color
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "lightblue", // Changes the background of the switch track
                },
              }}
            />
          }
          label={auth ? "Logout" : "Login"}
          sx={{
            marginLeft: "20px", // Adds margin to the left side of the label
            color: "lightblue", // Light blue color for the label
          }}
        />
      </FormGroup>
      
      {/* AppBar with light blue color, padding, and border */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ADD8E6", // Light blue color
          padding: "5px 10px", // Adds padding inside the header
          borderBottom: "2px solid black", // Adds border to the bottom of the header
        }}
      >
        <Toolbar sx={{ padding: 0 }}> {/* Remove extra padding around the toolbar */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome to Home Page ${name} !`}
          </Typography>
          {auth && (
            <div>
              <Tooltip title={`Welcome  : ${email}`}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {name?.slice(0, 1) || ""}
                </Avatar>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Headers;
