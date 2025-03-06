"use server"; // Add this to mark the file as a client component

import { redirect } from "next/navigation";
import { User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignInButton } from "@/components/blocks/signInButton";
import { auth } from "@/auth";
import { FeatureSteps } from "@/components/blocks/feature-section"
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { BeamsBackground } from "@/components/ui/beam-background";
import { motion } from "framer-motion";

const features = [
  { 
    step: 'Step 1', 
    title: 'Learn the Basics',
    content: 'Start your Web3 journey by learning the basics of blockchain.', 
    image: 'https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: 'Step 2',
    title: 'Deep Dive',
    content: 'Dive deep into blockchain fundamentals and smart contract development.',
    image: 'https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 3',
    title: 'Build Projects',
    content: 'Graduate with hands-on Web3 experience through building decentralized applications.',
    image: 'https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 4',
    title: 'Build Projects',
    content: 'Graduate with hands-on Web3 experience through building decentralized applications.',
    image: 'https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop'
  },
]


export default async function Home() {
  const session = await auth();
  if (session?.user){
    redirect('/dashboard')
  }
  return (
    <main className="">
      <BeamsBackground>
      </BeamsBackground>
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Badge variant="outline">🔰Egress is live!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              Rediscover the way you operate systems
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Every operating system on Every platform, Everywhere. Run any OS
              based on your needs, on any device. Transform your experience and
              gain flexibility like never before — it&apos;s all in your hands.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              size="lg"
              className="gap-4"
              variant="outline"
            >
              Jump on a waitlist <Clock className="w-4 h-4" />
            </Button>
            <SignInButton/>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    <div className=" pb-[300px]">
      <FeatureSteps 
        features={features}
        title="Your Journey Starts Here"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
    </div>
    </main>
  );
}
