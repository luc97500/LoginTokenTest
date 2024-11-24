import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogContent } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// Define the keyframes for the slide-up animation
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Define the keyframes for the scale-up-down animation
const scaleUpDown = keyframes`
  0%, 100% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(0.75);
  }
`;

// Create a styled Typography component with animation and custom styling
const AnimatedTypography = styled(Typography)(({ theme }) => ({
  animation: `${scaleUpDown} 1.5s ease-in-out infinite`,
  fontFamily: "Roboto, sans-serif", // Apply the Google Font
  fontWeight: 700,
  color: "black", // Darker green for better contrast
  textTransform: "uppercase",
  letterSpacing: "1px",
}));

// Create a styled Dialog component with animation
const AnimatedDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    animation: `${slideUp} 1s ease-out`,
  },
}));

export function Celebration() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
        <AnimatedDialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent sx={{ background: "#fcf3cf" }}>
            <Card sx={{ maxWidth: 550, background: "#eafaf1" }}>
              <CardMedia
                sx={{ height: 10 }}
                image={''}
                title="Celebration !!!"
              />

              <CardContent>
                <AnimatedTypography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  Designed and Developed by Lalit Chaudhari !
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        fontSize: "20px",
                        padding: "10px",
                        border: "2px solid green",
                        borderRadius: "8px",
                        margin: "5px 0",
                      }}
                    >
                      {"Welcome to FullStack-Application (MERN) with JWT-Token"} !!
                    </div>
                </AnimatedTypography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" size="small" onClick={handleClose}>
                  {" "}
                  Thank You !!
                </Button>
              </CardActions>
            </Card>
          </DialogContent>
        </AnimatedDialog>
      </>
    
  );
}
