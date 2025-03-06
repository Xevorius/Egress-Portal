"use client"

import * as React from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Join Waiting List</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-[2rem]">
          <div className="w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <DrawerTitle className="drawer-title relative z-10 text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Join the waitlist
        </DrawerTitle>
        <p></p>
        <p className="pb-[3rem] drawer-description text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          And be the first to test EGRESS portal
        </p>
        <Input
          type="email"
          placeholder="hi@manuarora.in"
          className="w-full mt-4 relative z-10"
        />
      </div>
    </div>
          <DrawerFooter>
            <Button>Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
