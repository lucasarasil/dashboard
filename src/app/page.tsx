"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
 const router = useRouter();

 useEffect(() => {
  router.push("/operacoes");
 }, [router]);

 return (
  <div className="flex h-screen items-center justify-center bg-dark-primary">
   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mottu-500" />
  </div>
 );
}
