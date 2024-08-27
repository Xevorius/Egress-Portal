import Dashboard from "@/components/Dashboard";
import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto my-12">
        <Dashboard/>
    </main>
  );
}


