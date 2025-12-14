
import Link from "next/link";
export default function Home() {
  return (
     <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl p-8">
      <p>Welcome to my Taskify Landing Page</p>
      <Link href={'/login'}>Go to Login ? </Link>
    </div>
  </div>
  );
}
