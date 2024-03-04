"use client";

import assest from "@/json/assest";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import React, { useState } from "react";
const obj = {
  name: "hyper",
  avail: {
    key1: "value1",
    key2: "value2",
    key3: "value3",
    key4: "value4"
  }
};
const keys = Object.keys(obj.avail);
console.log("obj contains " + keys.length + " keys: " + keys);
type CategoriesType = { title: string; image: string }[];
type Props = {
  Categories: CategoriesType;
  location: string;
};

const Shop = ({ Categories, location }: Props) => {
  console.log(Categories, location);
  const [paramsTextFields, setParamsTextFields] = useState([0]);

  const mapTextFields = (): React.JSX.Element[] => {
    return paramsTextFields.map((item, i) => {
      return (
        <div style={{ marginBottom: "15px" }}>
          <TextField
            id="outlined-basic"
            name="key"
            label="API KEY"
            variant="outlined"
            sx={{ mr: 2, backgroundColor: "#f2f6f7", color: "black" }}
            InputProps={{
              sx: {
                color: "black"
              }
            }}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            name="value"
            label="VALUE"
            variant="outlined"
            // onChange={handleChange}
            sx={{ mr: 2, backgroundColor: "#f2f6f7", color: "black" }}
            InputProps={{
              sx: {
                color: "black"
              }
            }}
          />
          <TextField
            id="outlined-basic"
            name="value"
            label="Description"
            variant="outlined"
            // onChange={handleChange}
            sx={{ mr: 2, backgroundColor: "#f2f6f7", color: "black" }}
            InputProps={{
              sx: {
                color: "black"
              }
            }}
          />
        </div>
      );
    });
  };

  const handleSubmit = () => {
    setParamsTextFields((prev) => [...prev, 0]);
  };
  return (
    <Container>
      <Typography>Shop Item Page</Typography>
      <Box sx={{ my: "30px" }}>
        <Typography sx={{ mb: 3, fontWeight: "bold" }}>Query Params</Typography>
        <div>
          {mapTextFields()}
          <Button
            onClick={handleSubmit}
            size="small"
            variant="contained"
            sx={{ height: 50, backgroundColor: "orange", width: "35%" }}
          >
            Add
          </Button>
        </div>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {" "}
        Shop Item
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Paper sx={{ height: 300, width: 250 }}>
            <Typography>Name: Jeans</Typography>
            <Image src={assest?.smasung} alt="" height={200} width={200} />

            <Button variant="contained">Show</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ height: 300, width: 250 }}>
            <Typography>Name: T-Shirt</Typography>
            <img src={assest?.prabhuji} alt="" height={200} />
            <Button variant="contained">Show</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ height: 300, width: 250 }}>
            <Typography>Name: Shoes</Typography>
            <img src={assest.iphone} alt="" height={250} />
            <Button variant="contained">Show</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ height: 300, width: 250 }}>
            <Typography>Name: Jeans</Typography>
            <Image src={assest?.shoe} alt="" height={200} width={200} />

            <Button variant="contained">Show</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ height: 300, width: 250 }}>
            <Typography>Name: Jeans</Typography>
            <Image src={assest?.jeans} alt="" height={200} width={200} />

            <Button variant="contained">Show</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ height: 300, width: 250 }}>
            <Typography>Name: Jeans</Typography>
            <Image src={assest?.team} alt="" height={200} width={200} />

            <Button variant="contained">Show</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export const getStaticProps = (async ({}) => {
  // Fetch data from external API

  const res: CategoriesType = [
    {
      image: assest.jeans,
      title: "New Jeans"
    },
    {
      image: assest.shoe,
      title: "Sneaker"
    },
    {
      image: assest.prabhuji,
      title: "Prabhuji's Sonpapri"
    },
    {
      image: assest.iphone,
      title: "IPhone"
    },
    {
      image: assest.team,
      title: "Top"
    },
    {
      image: assest.smasung,
      title: "Samsung"
    }
  ];

  console.log("ayan", res);

  // Pass data to the page via props
  return {
    props: {
      Categories: res,
      location: "Kolkata"
    },
    revalidate: 120
  };
}) satisfies GetStaticProps<{
  Categories: CategoriesType;
  location: string;
}>;

export default Shop;
