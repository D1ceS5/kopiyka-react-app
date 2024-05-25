import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import GreenButton from "./GreenButton";
import { formatToUAH } from "../utils";

const Container = styled(Box)({
  backgroundColor: "#17191a",
  padding: "20px",
  color: "white",
  borderRadius: "5px",
});

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

const ItemList = ({ items, showButton = true, title }) => {
  return (
    <Container>
      {!items.length && <Typography>Транзакцій не знайдено</Typography>}
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>{title}</Text>
        {showButton && (
          <GreenButton
            text={"Записи"}
            href={"/transaction"}
            style={{ padding: "10px 20px" }}
          />
        )}
      </Grid>
      {items &&
        items.map((item) => {
          return (
            <StyledBox mt={2} key={item.transaction_id}>
              <Box>
                <Text>{item.category}</Text>
                <Text color={"#717171"}>
                  {new Date(item.transaction_date).toLocaleDateString("en-UK")}
                </Text>
              </Box>

              <Text color={item.value < 0 ? "#DC0000" : "#87C232"}>
                {formatToUAH(item.value)}
              </Text>
            </StyledBox>
          );
        })}
    </Container>
  );
};

export default ItemList;
