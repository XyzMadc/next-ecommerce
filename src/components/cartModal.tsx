"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";

export default function CartModal() {
  const { cart, isLoading, removeItem } = useCartStore();
  const wixClient = useWixClient();
  return (
    <div className="w-[25rem] absolute p-4 rounded-md shadow-modal bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt="cart"
                    width={72}
                    height={96}
                    className="cursor-pointer"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex justify-between items-center gap-8">
                      <h3 className="text-base font-semibold">
                        {item.productName?.original}
                      </h3>
                      <h4 className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item?.price?.formattedAmount}
                      </h4>
                    </div>
                    <h3 className="text-green-50 font-semibold text-xs py-[2px] px-[6px] rounded-md bg-green-400 w-max">
                      {item?.availability?.status}
                    </h3>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      className={`text-blue-500 ${
                        isLoading ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              // <hr />
            ))}
          </div>
          <hr />

          {/* BOTTOM */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>{cart.subtotal.formattedAmount}</span>
            </div>
            <p className="text-xs my-3 text-gray-500">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md ring-1 ring-gray-300 px-4 py-2">
                View Cart
              </button>
              <button
                className="rounded-md bg-black text-white px-4 py-2 disabled:opacity-75"
                disabled={isLoading}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
