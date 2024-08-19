import Add from "@/components/add";
import CustomizeProducts from "@/components/customizeProducts";
import ProductImages from "@/components/productImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function SinglePage({ params }: Props) {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <hr className="bg-gray-200" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">
            {product.price?.discountedPrice}
          </h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              {product.price?.formatted?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              {product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <hr className="bg-gray-200" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-000000-000000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <hr className="bg-gray-200" />
        {product.additionalInfoSections?.map((section: any) => (
          <div key={section.title} className="text-sm space-y-4">
            <h4 className="font-medium">{section.title}</h4>
            <p className="">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
