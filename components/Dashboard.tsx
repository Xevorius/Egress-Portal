"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <>
                    <img src={ session.user?.image as string } className="rounded-full h-20"></img>
                    <h1>Welcome Back, { session.user?.name }</h1>
                    <button onClick={() => signOut()} className="border border-black rounded-lg bg-red-500 px-5 py-1">Sign out</button>
                </>
            ) : (
                <>
                    <h1 className="text-3xl text-red-500 font-bold">You're not logged in</h1>
                    <div className="flex space-y-5">
                        <button onClick={() => signIn("google")} className="border border-black rounded-lg px-5 py-1">Sign in with google</button>
                        <button onClick={() => signIn("github")} className="border border-black rounded-lg bg-green-500 px-5 py-1">Sign in with GitHub</button>
                    </div>
                </>
            )}
        </>
    );
};

export default Dashboard