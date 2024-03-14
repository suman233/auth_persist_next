import { getProducts, getSingleProduct } from "@/api/functions/products.api";
import { Product } from "@/interface/products.interface";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  styled
} from "@mui/material";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";

type ProductProps = {
  product: Product;
};

const StyledContainer = styled(Container)`
  margin: auto;
`;
const productdetails = ({ product }: ProductProps) => {
  const router = useRouter();
  const { slug } = router.query;

  console.log("id", slug);

  return (
    <StyledContainer>
      <Box sx={{ m: "auto", mt: 5, textAlign: "center", width: "50%" }}>
        <Card sx={{ textAlign: "center" }}>
          <CardMedia
            image={product?.image}
            sx={{ height: 300, width: 200, textAlign: "center", m: "auto" }}
          />
          <CardContent>
            <Typography>{product?.title}</Typography>
          </CardContent>
        </Card>
      </Box>
    </StyledContainer>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps<ProductProps, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const resp = await getSingleProduct(slug);
  return {
    props: {
      product: resp || null
    }
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: new Array(50)
      .fill(null)
      .map((_, index) => ({ params: { slug: `${index + 1}` } })),
    fallback: true
  };
};
export default productdetails;
