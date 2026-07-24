import { redirect } from "next/navigation";
import { Box } from "@chakra-ui/react";
import AdminTopbar from "@/components/Common/AdminTopbar";
import { getSession } from "@/lib/auth";

export default async function AdminDashboardLayout({ children }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <Box bg="brand.gray50" minH="100vh">
      <AdminTopbar />
      <Box as="main">{children}</Box>
    </Box>
  );
}
