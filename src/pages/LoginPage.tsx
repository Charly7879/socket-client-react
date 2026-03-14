import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (username: string, password: string) => {
    login(username, password);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Socket Client
        </h1>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
