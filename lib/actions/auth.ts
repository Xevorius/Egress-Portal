"use server"

import {signIn, signOut} from "@/auth";

export const GitHubLogin = async () =>{
    await signIn("github", {redirectTo: "/dashboard"})
};

export const GoogleLogin = async () =>{
    await signIn("google", {redirectTo: "/"})
};

export const Logout = async () =>{
    await signOut({redirectTo: "/"})
};