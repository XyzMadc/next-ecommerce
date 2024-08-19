// "use client";

import CategoryList from "@/components/categoryList";
import ProductList from "@/components/productList";
import Slider from "@/components/slider";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense, useEffect } from "react";

const HomePage = async () => {
  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);

  // const myWixClient = useWixClient();
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await myWixClient.products.queryProducts().find();
  //     console.log(res);
  //   };
  //   getProducts();
  // }, [myWixClient]);

  return (
    <div className="space-y-24">
      <Slider />
      <div className="my-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense
          fallback={
            <div className="loader">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          }
        >
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
          />
        </Suspense>
      </div>
      <div className="my-20 space-y-12 ">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <Suspense
          fallback={
            <div className="loader">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          }
        >
          <CategoryList />
        </Suspense>
      </div>
      <div className="my-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense
          fallback={
            <div className="loader">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          }
        >
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
