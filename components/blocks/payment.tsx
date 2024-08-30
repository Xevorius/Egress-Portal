"use client"

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Checkout from "./checkout";

const Payment = () => {
    const { data: session } = useSession();
    const amount = 29.99;

    if ( session === null) {
        redirect(`/login`)
    } 

    if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
        throw new Error("Stripe public key is 'undifined'")
    }
    
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    return (
        <div className="bg-blue-500 px-5 py-2">
            <h1 className="text-4xl font-extrabold mb-2">{"Tim"}</h1>
            <h2 className="text-2xl">{"has requested "}<span className="font-bold">${amount}</span></h2>
            
            <Elements stripe={stripePromise} options={{mode:"payment", amount: convertToSubcurrency(amount), currency: "usd",}}>
                <Checkout amount={amount}/>
            </Elements>
        </div>

    );
}

export default Payment