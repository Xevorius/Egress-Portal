import Dashboard from "@/components/blocks/dashboard";
import { auth } from "@/auth";

export default async function PaymentPage() {
  const session = await auth();

  return (
    <div className="flex-auto">
      <Dashboard session={session} />
    </div>
  );
}

