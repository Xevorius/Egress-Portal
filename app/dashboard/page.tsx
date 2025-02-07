"use server"

import { auth } from "@/auth";
import { LogOutButton } from "@/components/blocks/logoutBotton";
import Image from "next/image";

export default async function Dashboard() {
    const session = await auth();

    if (session?.user){
        return (
            <div>
                <h1>Hello {session?.user.name},</h1>
                {session.user.image && (
                    <Image src={session.user.image} width={48} height={48} alt={session.user.name ?? "Avatar"}/>
                )}
                <LogOutButton/>
            </div>
        );
    }
}