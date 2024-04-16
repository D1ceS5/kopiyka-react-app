import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import GreenButton from "./GreenButton";
import { formatToUAH } from "../utils";

// Styled component for the container
const Container = styled(Box)({
  backgroundColor: "#17191a",
  padding: "20px",
  color: "white",
  borderRadius: "5px",
});

// Styled component for the text
const Text = styled(Typography)({
  fontWeight: "bold",
});

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#e0e0e0",
  padding: "10px",
  borderRadius: "5px",
  color: "black",
});

const ItemList = ({ items }) => {
  return (
    <Container>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Останні записи</Text>
        <GreenButton text={"Записи"} style={{ padding: "10px 20px" }} />
      </Grid>
      {items &&
        items.map((item) => {
          return (
            <StyledBox mt={2} key={item.transaction_id}>
              <Box>
                <Text>{item.category}</Text>
                <Text color={"#17191A"}>
                  {new Date(item.transaction_date).toLocaleDateString("en-UK")}
                </Text>
              </Box>

              <Text color={"#DC0000"}>{formatToUAH(item.value)}</Text>
            </StyledBox>
          );
        })}
    </Container>
  );
};

export default ItemList;
