'use client';

import { User } from 'lucide-react';

const SignInButton = ({ className }: { className?: string }) => {
  return (
    <button className="text-heading hover:bg-primary-dark rounded-full p-2 transition-all duration-300 ease-in-out hover:text-white">
      <User size={30} />
    </button>
  );
};

export default SignInButton;
