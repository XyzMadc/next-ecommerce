import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CategoryList() {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.queryCollections().find();
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.items.map((item) => (
          <Link
            key={item._id}
            href={`/list?category=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={item.media?.mainMedia?.image?.url || "cat.png"}
                alt={item.name || "category"}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl mt-8 font-light text-clip tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
