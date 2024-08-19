import Filter from "@/components/filter";
import ProductList from "@/components/productList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import { Suspense } from "react";

export default async function ListPage({ searchParams }: any) {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.getCollectionBySlug(
    searchParams.category || "all-products"
  );
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col justify-center items-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on <br />
            Selected Products
          </h1>
          <button className="rounded-3xl bg-cart text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="w-1/3 relative">
          <Image
            src={"/woman.png"}
            alt="woman"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* FILTER */}
      <Filter />

      {/* PRODUCTS */}
      <h1 className="mt-12 text-lg font-semibold">
        {categories?.collection?.name} For You!
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
        <ProductList
          categoryId={
            categories.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
