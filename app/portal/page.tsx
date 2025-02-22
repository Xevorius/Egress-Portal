"use server";
import { auth } from "@/auth";
import DesktopStream from "@/components/blocks/DesktopStream";

export default async function DesktopPage() {
  const session = await auth();  // Using next-auth to get session data

  if (!session) {
    return <div>Please log in to access the stream.</div>;
  }

  // Assuming 'username' or 'email' is available in the session object.
  const userId = session.user?.name || session.user?.email || "guest"; // Fallback to "guest" if no name or email

  return (
    <div>
      <h1 className="text-2xl text-center mb-4">Welcome, {userId}</h1>
      <DesktopStream userId={userId} /> {/* Pass the userId to the stream component */}
    </div>
  );
};

DesktopPage.getLayout = (page: React.ReactNode) => page;
