import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./pagination";

const productsPerPage = 4;

type Props = {
  categoryId: string;
  limit?: number;
  searchParams?: any;
};

export default async function ProductList({
  categoryId,
  limit,
  searchParams,
}: Props) {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 5)
    .lt("priceData.price", searchParams?.max || 9999999)
    .limit(limit || productsPerPage)
    .skip(
      searchParams?.page
        ? parseInt(searchParams?.page) * (limit || productsPerPage)
        : 0
    );

  const response = await productQuery.find();

  response.items.sort((a: products.Product, b: products.Product) => {
    const priceA =
      a.price && a.price.formatted && a.price.formatted.price
        ? parseFloat(a.price.formatted.price.replace(/[^0-9.-]+/g, "")) || 0
        : 0;
    const priceB =
      b.price && b.price.formatted && b.price.formatted.price
        ? parseFloat(b.price.formatted.price.replace(/[^0-9.-]+/g, "")) || 0
        : 0;

    if (searchParams?.sort) {
      const [sortType, sortBy] = searchParams.sort.split(" ");

      if (sortBy === "price") {
        return sortType === "asc" ? priceA - priceB : priceB - priceA;
      }
    }

    return 0;
  });

  return (
    <>
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {response.items.map((product: products.Product) => (
          <Link
            key={product._id}
            href={"/" + product.slug}
            className="flex flex-col gap-4 w-full sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80 border">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt="product"
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt="product"
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">
                {product.price?.formatted?.price}
              </span>
            </div>
            {product.additionalInfoSections && (
              <h3
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections?.find(
                      (section) => section.title === "description"
                    )?.description || "No description"
                  ),
                }}
              ></h3>
            )}
            <button className="rounded-2xl ring-1 ring-cart text-cart w-max px-4 py-2 hover:bg-cart hover:text-white transition-colors duration-300 ease-in">
              Add to cart
            </button>
          </Link>
        ))}
      </div>
      {searchParams?.category ? (
        <Pagination
          currentPage={response.currentPage || 0}
          hasPrev={response.hasPrev()}
          hasNext={response.hasNext()}
        />
      ) : null}
    </>
  );
}
