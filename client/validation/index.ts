export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidName = (str: string) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(str);
};

export const isValidPassword = (password: string) => {
  return password.length >= 8;
};
