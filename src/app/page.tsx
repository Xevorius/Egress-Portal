import { User, MoveRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  return (
  <main className="relative inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(100%_100%_at_50%_10%,#000_30%,#63e_100%)]">

    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <Badge variant="outline">Egress is live!</Badge>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            Rediscover the way you operate systems
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
          Every operating system on Every platform, Everywhere. 
          Run any OS based on your needs, on any device. 
          Transform your experience and gain flexibility like never before — it's all in your hands.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button size="lg" className="gap-4" variant="outline">
            Jump on a waitlist <Clock className="w-4 h-4" />
          </Button>
          <Button size="lg" className="gap-4">
            Sign up here <MoveRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>


    
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Something new!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              Managing a small business today is already tough.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Variety of Operating systems</h3>
              <p className="text-muted-foreground max-w-xs text-base">
                Selection of multiple systems, we plan to add more in the coming days.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-md  aspect-square p-6 flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Security</h3>
              <p className="text-muted-foreground max-w-xs text-base">
                With our Security-first approach to setting up modular protocols, your files are yours forever.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Portal on Any-device</h3>
              <p className="text-muted-foreground max-w-xs text-base">
                It works on anything that has a screen & Wifi. Probably even your Fridge.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Flexible Data Storage</h3>
              <p className="text-muted-foreground max-w-xs text-base">
                Storage can be expanded upon usage and you are not locked into any storage plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    
</main>
  );
}

