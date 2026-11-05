"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { api } from "@/lib/api";

function Inner() {
  const token = useSearchParams().get("token");
  const [msg, setMsg] = useState("Verifying your email...");
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!token) { setMsg("This link is missing its token."); return; }
    api("/auth/verify-email", { method: "POST", body: { token } })
      .then(() => { setOk(true); setMsg("Your email is verified."); })
      .catch((e) => setMsg((e as Error).message));
  }, [token]);
  return (
    <AuthCard title="Email verification" subtitle={msg}>
      {ok && <Link href="/login/" className="btn btn-gold w-full">Log In</Link>}
    </AuthCard>
  );
}
export default function Verify() { return <Suspense><Inner /></Suspense>; }
