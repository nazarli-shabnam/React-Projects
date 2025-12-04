import React, { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={show}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
          zIndex: 1000,
        }}
        aria-label="scroll to top"
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;

