"use client";
import Image from "next/image"
import { tiers } from "@/constants/constants"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import CheckoutForm from "../shared/CheckoutForm";

export default function CheckoutTier() {
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const params = useSearchParams();
  const id = Number(params.get('id'));
  const plan = params.get('plan');

  const filterCheckout = tiers.find((tier) => tier.id === id && tier.slag === plan);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4 container mx-auto px-4 flex justify-center items-center">
        <div className="flex-1 flex items-center">
          <Image
            src={"https://myapplication-logos.s3.ap-south-1.amazonaws.com/ai-formify.png"}
            alt='AIFormify'
            width={50}
            height={50}
            className='w-20 h-20 md:w-auto md:h-auto'
            priority={true}
          />
          <span className='text-xl font-bold text-primary'>
            AIFormify
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* Right Column - Order Summary */}
          <div className="p-6 border rounded-lg">
            <div className="space-y-6">
              {/* Product */}
              <div className="flex justify-between items-center gap-16">

                <div className="space-y-2">
                  <h4 className="flex items-center gap-1 text-xl font-semibold text-[#75758B]">
                    <span>
                      {filterCheckout?.name}
                    </span>
                    <span>
                      Package
                    </span>
                  </h4>
                  <h6 className="text-3xl font-semibold font-sans">
                    {filterCheckout?.price}.00
                  </h6>
                </div>

                <div className="flex justify-center items-end max-w-sm">
                  <p className="text-sm font-medium text-[#75758B]">
                    {filterCheckout?.description}
                  </p>
                </div>
              </div>

              {/* Bank/Binance Account Details */}
              <div className="w-full max-w-2xl mx-auto pt-10">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Payment
                  </h1>
                  <p className="text-[#75758B]">
                    All transactions are secure and encrypted.
                  </p>
                </div>

                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-0">

                  {/* Jazzcash / Easypaisa */}
                  <div className="border border-gray-200 rounded-t-lg">
                    <div className="flex items-center space-x-3 p-4">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="text-gray-900 cursor-pointer">
                        Bank Account Details
                      </Label>
                    </div>

                    <Collapsible open={selectedPayment === "bank"}>
                      <CollapsibleContent>
                        <div className="px-4 py-4 border border-gray-200">
                          <Card className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <p className="text-[#75758B]">
                                Deposit Payment directly to our bank account :
                              </p>
                              <div className="space-y-1 text-[#75758B]">
                                <h6 className="font-medium">
                                  NAYAPAY
                                </h6>
                                <h6 className="flex items-center gap-1">
                                  <span>
                                    ACCOUNT #
                                  </span>
                                  <span>
                                    03492047381
                                  </span>
                                </h6>
                                <h6 className="space-x-1">
                                  <span>
                                    IBAN #
                                  </span>
                                  <span>
                                    PK24NAYA1234503492047381
                                  </span>
                                </h6>
                                <h6 className="space-x-1">
                                  <span>
                                    Account Title :
                                  </span>
                                  <span>
                                    Muhammad Ahsaan Abbasi
                                  </span>
                                </h6>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Bank Deposit */}
                  <div className="border border-gray-200 rounded-b-lg">
                    <div className="flex items-center space-x-3 p-4">
                      <RadioGroupItem value="binance" id="binance" />
                      <Label htmlFor="binance" className="text-gray-900 cursor-pointer">
                        Crypto Coin Address
                      </Label>
                    </div>

                    <Collapsible open={selectedPayment === "binance"}>
                      <CollapsibleContent>
                        <div className="px-4 py-4 border border-gray-200">
                          <Card className="bg-gray-50 border-gray-200">
                            <CardContent className="p-4 space-y-3">
                              <p className="text-[#75758B]">
                                Deposit Payment directly through Crypto Coins :
                              </p>
                              <div className="space-y-1">
                                <h6 className="flex items-center gap-1 text-[#75758B]">
                                  <span className="font-medium">
                                    TRC20:
                                  </span>
                                  <span>
                                    TCtQ6ZXrsUXWPVZ9xjbyrQ18Cjc19xnnzM
                                  </span>
                                </h6>
                                <h6 className="flex items-center gap-1 text-[#75758B]">
                                  <span className="font-medium">
                                    Solana:
                                  </span>
                                  <span>
                                    hDCkgr18ubXjbqvt16vmvjuN5Qt3tx6XuYbiZ3z8VV9
                                  </span>
                                </h6>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </RadioGroup>
              </div>

              {/* Note */}
              <div className="flex flex-col justify-center gap-0.5">
                <h4 className="text-lg font-semibold text-red-600">Note :</h4>
                <p className="text-sm font-medium text-[#75758B]">Before CheckOut, Make Sure transfer the support Amount & attached screenshot of the payment</p>
              </div>
            </div>
          </div>

          {/* Left Column - Contact & Delivery */}
          <CheckoutForm name={(filterCheckout?.name as string)} />
        </div>
      </main>
    </div>
  )
}
