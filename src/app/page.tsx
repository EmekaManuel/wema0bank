import AuthLayout from "@/layouts/auth-layout";
import AuthFlow from "@/components/auth-flow";

export default function Home() {
  return (
    <AuthLayout>
      <AuthFlow />
    </AuthLayout>
  );
}
