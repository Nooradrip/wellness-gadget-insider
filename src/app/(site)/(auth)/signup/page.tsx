import Breadcrumb from '@/components/Common/Breadcrumb';
import SignUp from '@/components/Auth/SignUp';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb pageName="Sign Up" />
        <SignUp />
      </div>
    </div>
  );
}