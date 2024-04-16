import React from "react";
import { styled } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";

// Styled components for custom styling
const Container = styled("div")({
  backgroundColor: "#17191A",
  borderRadius: "5px",
  padding: "20px",
});

const Title = styled(Typography)({
  color: "#fff",
  marginBottom: "8px",
});

const ProgressText = styled(Typography)({
  color: "#fff",
  textAlign: "center",
});

const StyledProgressBar = styled(LinearProgress)({
  borderRadius: "5px",
  height: "40px",
  marginTop: "8px",
  "& .MuiLinearProgress-barColorPrimary": {
    // Override primary color for the progress bar
    backgroundColor: "#87c232", // Green color for the progress bar
  },
});

const StyledTextContainer = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

// Component
const ProgressBar = ({ percent, text, title, subtitle }) => {
  return (
    <Container>
      <Title variant="h6">{title}</Title>
      <StyledTextContainer>
        <ProgressText variant="body1">{subtitle}</ProgressText>
        <ProgressText variant="body2">{text}</ProgressText>
      </StyledTextContainer>

      <StyledProgressBar
        variant="determinate"
        value={percent > 100 ? 100 : percent}
      />
    </Container>
  );
};

export default ProgressBar;
