import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <button
        onClick={() => signIn()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Sign in with Providers
      </button>
    </div>
  );
}