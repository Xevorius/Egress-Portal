"use client"
import { useEffect, useState } from 'react';

export default function PaymentSuccess({
    searchParamsPromise,
}: {
    searchParamsPromise: Promise<{ amount: string }>;
}) {
    const [amount, setAmount] = useState<string | null>(null);

    useEffect(() => {
        searchParamsPromise.then(({ amount }) => {
            setAmount(amount);
        });
    }, [searchParamsPromise]);

    if (amount === null) {
        return <div>Loading...</div>;
    }

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-blue-500">
            <div className="md-10">
                <h1 className="text-4xl font-extrabold md-2">{"Thanks you!"}</h1>
                <h2 className="text-2xl">{"You successfully sent"}</h2>
                <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
                    ${amount}
                </div>
            </div>
        </main>
    );
}