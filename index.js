const express = require("express");
const cors = require("cors");

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
      "API-key": "4NKQ3-815C2-8T5Q2-16318-55301",
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
      session_id:
        "eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9",
    }),
    headers: {
      "Content-Type": "application/json",
      "API-key": "4NKQ3-815C2-8T5Q2-16318-55301",
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

app.listen(5000, () => {
  console.log("server started");
});
