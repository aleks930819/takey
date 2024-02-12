'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';

const PasswordInputField = ({ placeholder = 'Password' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPasswordIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <span className="relative">
      <input
        className="w-full rounded-lg  px-4 py-2"
        placeholder={placeholder}
        name={placeholder === 'Password' ? 'password' : 'passwordConfirm'}
        type={showPassword ? 'text' : 'password'}
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 transform"
        onClick={onShowPasswordIconClick}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </span>
  );
};

export default PasswordInputField;
