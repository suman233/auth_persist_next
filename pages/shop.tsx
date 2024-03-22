"use client";

import { getProducts, getSingleProduct } from "@/api/functions/products.api";
import { AllProductsRoot } from "@/interface/products.interface";
import assest from "@/json/assest";
import CustomInput from "@/ui/Inputs/CustomInput";
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
import axios from "axios";
import html2canvas from "html2canvas";
import { indexOf } from "lodash";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
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
  Products: AllProductsRoot;
  location: string;
};

const Shop = ({ Categories, Products, location }: Props) => {
  console.log("data", Categories, location, Products);
  const [paramsTextFields, setParamsTextFields] = useState([0]);

  const router = useRouter();
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
  const snapshotClick = () => {
    const element = document.body;
    html2canvas(element).then(function (canvas) {
      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "snapshot.png";
      link.click();

    });
  };

  const [url, setUrl] = useState("");
 var l= (frames).document.body
  return (
    <Container>
      <Typography>Shop Item Page </Typography>

      <div style={{ height: "50px", marginTop: 9 }}>
        <form style={{ float: "left" }}>
          <TextField onChange={(e)=>setUrl(e.target.value)} />
          <Button variant="contained" sx={{ mx: 2 }} onClick={()=>router.push(`${url}`)}>
            Go to Url
          </Button>
        </form>
        <Button
          variant="contained"
          sx={{ float: "right" }}
          onClick={snapshotClick}
        >
          Click
        </Button>
      </div>
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
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {" "}
        Shop Item
      </Typography>
      {/* <Grid container spacing={4} sx={{ mt: 5 }}> 
        {Categories.map((item, index) => {
          return (
            <>
              <Grid item xs={4} key={index}>
                <Typography variant="h5" textAlign={"center"}>
                  Name: {item.title}
                </Typography>

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
      </Grid> */}
      <Grid container spacing={4} sx={{ mt: 5 }}>
        {Products.map((item, index) => {
          return (
            <>
              <Grid item md={3} xs={12} sm={6} key={index}>
                <Typography variant="h5" textAlign={"center"}>
                  Name: {item?.title}
                </Typography>

                <Paper
                  sx={{
                    height: 320,
                    width: 250,
                    m: "auto",
                    textAlign: "center",
                    padding: 2,
                    my: 2
                  }}
                >
                  <Image
                    src={item?.image}
                    alt=""
                    height={300}
                    width={250}
                    style={{ height: "300px" }}
                  />
                </Paper>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => router.push(`/details/${item?.id}`)}
                  >
                    Show
                  </Button>
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Container>
  );
};

export const getStaticProps = (async (context) => {
  // const arr: string[]=
  const resp = await getProducts();
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
  console.log("prd", resp);

  // Pass data to the page via props
  return {
    props: {
      Products: resp,
      Categories: res,
      location: "Kolkata"
    },
    revalidate: 120
  };
}) satisfies GetStaticProps<{
  Products: AllProductsRoot;
  Categories: CategoriesType;
  location: string;
}>;

export default Shop;
