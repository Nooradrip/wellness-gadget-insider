import Breadcrumb from '@/components/Common/Breadcrumb';
import SignIn from '@/components/Auth/SignIn';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb pageName="Sign In" />
        <SignIn />
      </div>
    </div>
  );
}