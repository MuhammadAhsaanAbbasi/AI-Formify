import Image from "next/image"
import { ShoppingBag, Info, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutTier() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <h1 className="text-4xl font-bold text-[#4F55AE]">SENSATION</h1>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="relative">
              <ShoppingBag className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Contact & Delivery */}
          <div className="space-y-8">
            {/* Contact Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Contact</h2>
                <button className="text-sm text-[#4F55AE]">Log in</button>
              </div>
              <Input type="text" placeholder="Email or mobile phone number" className="w-full mb-3" />
              <div className="flex items-start gap-2">
                <Checkbox id="newsletter" className="mt-1" />
                <label htmlFor="newsletter" className="text-sm">
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery Section */}
            <div>
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
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-6">
              {/* Product */}
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-medium">Diamond Crescent Moon Necklace</h3>
                  <p className="text-gray-500 text-sm">Gold</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Rs 1,799.00</p>
                </div>
              </div>

              {/* Discount Code */}
              <div className="flex gap-2">
                <Input placeholder="Discount code" className="flex-1" />
                <Button variant="outline" className="px-6">
                  Apply
                </Button>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs 1,799.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span>Shipping</span>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <span>Rs 199.00</span>
                </div>
                <div className="flex justify-between pt-4 border-t font-medium text-lg">
                  <div className="flex items-center gap-2">
                    <span>Total</span>
                    <span className="text-sm text-gray-500">PKR</span>
                  </div>
                  <span>Rs 1,998.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
