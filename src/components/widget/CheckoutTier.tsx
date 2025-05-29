"use client";
import Image from "next/image"
import { ShoppingBag, Info, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { tiers } from "@/constants/constants"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

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
              <div className="w-full max-w-2xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payment</h1>
                  <p className="text-gray-600">All transactions are secure and encrypted.</p>
                </div>

                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-0">

                  {/* Jazzcash / Easypaisa */}
                  <div className="border border-gray-200">
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
                            <CardContent className="p-4">
                              <p className="text-gray-700 mb-3">Deposit Payment directly to our bank account :</p>
                              <div className="space-y-1 text-gray-800">
                                <p className="font-medium">HABIB BANK LIMITED</p>
                                <p>ACCOUNT # 0056 - 7901283203</p>
                                <p>IBAN # PK06HABB0000567901283203</p>
                                <p>Title : M/S MANHATTAN TECH</p>
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
                            <CardContent className="p-4">
                              <p className="text-gray-700 mb-3">Deposit Payment directly to our bank account :</p>
                              <div className="space-y-1 text-gray-800">
                                <p className="font-medium">HABIB BANK LIMITED</p>
                                <p>ACCOUNT # 0056 - 7901283203</p>
                                <p>IBAN # PK06HABB0000567901283203</p>
                                <p>Title : M/S MANHATTAN TECH</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Left Column - Contact & Delivery */}
          <div className="space-y-8 bg-gray-100 p-6 border rounded-lg">
            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">
                Contact
              </h2>
              <Input type="text" placeholder="Email or mobile phone number" className="w-full" />
              <div className="flex items-start gap-2">
                <Checkbox id="newsletter" className="mt-1" />
                <label htmlFor="newsletter" className="text-sm">
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery Section */}
            {/* <div>
              <h2 className="text-xl font-bold mb-4">Delivery</h2>
              <div className="space-y-4">
                <div className="relative">
                  <Select defaultValue="pakistan">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Country/Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="srilanka">Sri Lanka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input type="text" placeholder="First name" />
                  <Input type="text" placeholder="Last name" />
                </div>

                <Input type="text" placeholder="Address" />
                <Input type="text" placeholder="Apartment, suite, etc. (optional)" />

                <div className="grid grid-cols-2 gap-4">
                  <Input type="text" placeholder="City" />
                  <Input type="text" placeholder="Postal code (optional)" />
                </div>

                <div className="relative">
                  <Input type="text" placeholder="Phone" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  )
}
