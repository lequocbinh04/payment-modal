"use client";
import ClockIcon from "@/components/icon/Clock";
import GiftIcon from "@/components/icon/Gift";
import InfoIcon from "@/components/icon/Info";
import LightIcon from "@/components/icon/Light";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { packages } from "@/mock/packages";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentChoosed, setCurrentChoosed] = useState<number[]>([]);

  const totalMoney = currentChoosed.reduce(
    (total, id) => total + packages[id].price,
    0
  );

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <AlertDialog
        onOpenChange={(open) => {
          if (!open) setCurrentChoosed([]);
        }}
      >
        <AlertDialogTrigger asChild>
          <Button>
            <LightIcon className="w-4 h-4 mr-1.5" />
            Buy package
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-6xl p-0 gap-0">
          <AlertDialogHeader className="grid grid-cols-5 space-y-0">
            <div className="col-span-3 p-6">
              <h1 className="font-semibold">Choose packages</h1>
              <div className="h-[400px] overflow-y-auto">
                <div className="mt-2 cursor-pointer relative space-y-2">
                  {packages.map((item) => (
                    <div
                      className="px-4 py-3 rounded-lg bg-slate-800 flex items-center space-x-2 justify-between"
                      key={item.id}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={"" + item.id}
                          onCheckedChange={(e) => {
                            if (e) {
                              setCurrentChoosed([...currentChoosed, item.id]);
                            } else {
                              setCurrentChoosed(
                                currentChoosed.filter((id) => id !== item.id)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={"" + item.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.name}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm">
                          {formatPrice(item.price)} USDT/mo
                        </div>
                        <div>
                          <Button
                            className="text-xs px-1.5 ml-4 py-1 rounded-md h-min bg-slate-600"
                            variant={"secondary"}
                            size={"sm"}
                          >
                            View detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium">More infomation</span>
              </div>
              <Select defaultValue="1">
                <SelectTrigger className="mt-1 bg-slate-800 focus:outline-none focus:ring-0 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center bg-secondary-foreground rounded-md h-8 w-8">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                    <SelectValue placeholder="Select duration" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="1">1 month</SelectItem>
                    <SelectItem value="3">3 month</SelectItem>
                    <SelectItem value="6">6 month</SelectItem>
                    <SelectItem value="12">12 month</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Alert className="mt-4 bg-blue-500">
                <AlertTitle className="mb-0 flex space-x-2">
                  <InfoIcon className="h-4 w-4" />
                  <div>
                    Do you know? You can buy multiple features at the same time
                    for a more optimal price.
                  </div>
                </AlertTitle>
              </Alert>
            </div>
            <div className="col-span-2 p-6 w-full h-full bg-slate-900 rounded-tr-lg">
              <h1>Your cart</h1>
              <div className="mt-2 bg-black px-4 py-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-secondary-foreground rounded-md flex justify-center items-center">
                      <GiftIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm">
                        {currentChoosed.length} Feature
                      </span>
                    </div>
                  </div>
                  <div className="text-primary font-semibold text-sm">
                    0 USDT/Month
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <span>Choosed:</span>
                  <div>
                    {currentChoosed.map((id) => (
                      <div key={id} className="text-sm">
                        - {packages[id].name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 bg-black px-4 py-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-secondary-foreground rounded-md flex justify-center items-center">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm">Duration: 1 month</span>
                    </div>
                  </div>
                  <div className="text-primary font-semibold text-sm">-0%</div>
                </div>
              </div>
              <div className="mt-2 bg-black px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Coupon"
                    className="bg-secondary"
                  />
                  <Button type="submit" size={"sm"}>
                    Apply
                  </Button>
                </div>
                <div className="px-3 py-2 rounded-lg flex items-center bg-blue-500 mt-4 space-x-1 text-sm">
                  <InfoIcon className="h-4 w-4" />
                  <span>Skip if you don&#39;t have a discount code</span>
                </div>
              </div>
              <div className="mt-3 bg-black px-4 py-3 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <h1>Subtotal (1 month):</h1>
                  <div className="space-x-2">
                    <span className="text-primary font-semibold">
                      {formatPrice(totalMoney)} USDT
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1>Discount:</h1>
                  <div className="space-x-2">
                    <span className="text-primary font-semibold">- 0 USDT</span>
                  </div>
                </div>
                <div className="border-b w-full border-dashed border-slate-600 pt-4" />
                <div className="flex justify-between items-center pt-4">
                  <h1>Total:</h1>
                  <div className="space-x-2">
                    <span className="text-primary font-semibold">
                      {formatPrice(totalMoney)} USDT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t border-slate-700 p-6">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="font-normal">
              Pay now:{" "}
              <span className="font-semibold ml-1">
                {formatPrice(totalMoney)} USDT
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
