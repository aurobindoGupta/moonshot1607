const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

async function getToken() {
  const response = await fetch("https://devcore02.cimet.io/v1/generate-token", {
    method: "POST",
    headers: {
      "API-key": process.env.TOKEN_API_KEY,
    },
  });
  const data = await response.json();
  //   console.log(data?.data.token);
  console.log("Got it token");
  return data?.data.token;
}
async function getProductData(token) {
  console.log(typeof token);
  const response = await fetch("https://devcore02.cimet.io/v1/plan-list", {
    method: "POST",
    body: JSON.stringify({
      session_id: process.env.SESSION_ID,
    }),
    headers: {
      "Content-Type": "application/json",
      "API-key": process.env.PRODUCTDATA_API_KEY,
      "Auth-token": token,
    },
  });
  const data = await response.json();
  //console.log(data?.data.electricity);
  console.log("Wokring");
  return data?.data.electricity;
}

app.get("/getdata", async (req, res) => {
  const token = await getToken();
  const productData = await getProductData(token);
  console.log(typeof productData);
  res.status(200).json(productData);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server started", process.env.PORT);
});
