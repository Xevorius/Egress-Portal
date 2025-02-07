"use client"

import { MoveRight } from "lucide-react"
import { Button } from "../ui/button"
import { Logout } from "@/lib/actions/auth"

export const LogOutButton = () => {

    return <Button
    className="gap-4"
    onClick={() => Logout()}
  >
    Logout <MoveRight className="w-4 h-4" />
  </Button>
}