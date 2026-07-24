import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import AdminLoginForm from "@/components/Common/AdminLoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
