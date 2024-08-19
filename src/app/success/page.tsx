"use client";

import Confetti from "react-confetti";

export default function SuccessPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center pt-20">
      <Confetti width={2000} height={1000} />
      <h1 className="text-6xl text-green-500">Successful</h1>
      <h2 className="text-xl font-medium">We send the invoice to your email</h2>
      <h3 className="text-xl">You are being redirected to the order page...</h3>
    </div>
  );
}
