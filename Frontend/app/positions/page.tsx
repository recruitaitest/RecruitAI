"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { isAuthenticated }
 from "@/lib/auth";

import PositionLayout
 from "@/components/positions/PositionLayout";

import { AppLayout } from "@/components/AppLayout";

export default function PositionsPage() {

 const router = useRouter();

 useEffect(() => {

 if (!isAuthenticated()) {

 router.push("/login");
 }

 }, []);

 return (
 <AppLayout>
 <main className="min-h-screen bg-background">

 <PositionLayout />

 </main>
 </AppLayout>
 );
}