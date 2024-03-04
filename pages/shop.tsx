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
      <Divider sx={{ my: 5 }} />
      <Typography variant="h3" sx={{ textAlign: "center", }}>
        {" "}
        Shop Item
      </Typography>
      <Grid container spacing={4} sx={{mt:5}}>
        {Categories.map((item, index) => {
          return (
            <>
              <Grid item xs={4} key={index}>
                <Typography>Name: {item.title}</Typography>

                <Paper
                  sx={{
                    height: 307,
                    width: 250,
                    m: "auto",
                    textAlign: "center",
                    padding: 2,
                    my: 2
                  }}
                >
                  <Image src={item.image} alt="" height={300} width={250} />
                </Paper>
                <div style={{ textAlign: "center" }}>
                  <Button variant="contained">Show</Button>
                </div>
              </Grid>
            </>
          );
        })}

       
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
