"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

type Props = {
  productId: string;
  variantId: string;
  stockNumber: number;
};

export default function Add({ productId, variantId, stockNumber }: Props) {
  const [quantity, seQuantity] = useState(1);

  const handleQuantity = (type: "increment" | "decrement") => {
    if (type === "increment" && quantity < stockNumber) {
      seQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 0) {
      seQuantity(quantity - 1);
    }
  };

  const wixClient = useWixClient();
  const { addItem, isLoading } = useCartStore();
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-1 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              onClick={() => handleQuantity("decrement")}
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            >
              -
            </button>
            {quantity}
            <button
              onClick={() => handleQuantity("increment")}
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <h3 className="text-xs">Product is out of stock.</h3>
          ) : (
            <h3 className="text-xs">
              Only <span className="text-orange-400">{stockNumber} items</span>{" "}
              left! <br /> {"Don't"} miss it!
            </h3>
          )}
        </div>
        <button
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
          className="w-36 text-sm rounded-3xl ring-1 ring-cart text-cart py-2 px-4 hover:bg-cart hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
