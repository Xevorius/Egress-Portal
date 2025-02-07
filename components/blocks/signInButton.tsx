"use client"

import { MoveRight } from "lucide-react"
import { Button } from "../ui/button"
import { GitHubLogin } from "@/lib/actions/auth"

export const SignInButton = () => {

    return <Button
    className="gap-4"
    onClick={() => GitHubLogin()}
  >
    Sign up here <MoveRight className="w-4 h-4" />
  </Button>
}