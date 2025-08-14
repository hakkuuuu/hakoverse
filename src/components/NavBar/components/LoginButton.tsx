import { FiUser } from 'react-icons/fi';

interface LoginButtonProps {
  onSignIn: () => void;
}

export const LoginButton = ({ onSignIn }: LoginButtonProps) => (
  <button onClick={onSignIn} className="hidden lg:block text-primary-light">
    <span className="flex flex-row items-center gap-2 px-5 py-2 rounded-lg bg-primary-gradient hover:opacity-90 transition">
      Login <FiUser size={16} />
    </span>
  </button>
);