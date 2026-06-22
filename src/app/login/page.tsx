import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-6 py-16">
      <div className="mb-10 text-center">
        <span className="text-4xl block mb-4 text-accent font-bold">⚡</span>
        <h1 className="text-3xl font-bold mb-3">Speed Run Code</h1>
        <p className="text-muted">Sign in or create a free account to start learning.</p>
      </div>

      <div className="rounded-3xl border border-card-border bg-card p-8">
        <LoginForm />
      </div>
    </div>
  );
}
