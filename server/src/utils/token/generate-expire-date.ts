/**
 * Generates the expiration date for a token based on the given expireIn value.
 * @param expireIn - The duration in seconds after which the token will expire.
 * @returns The expiration date as a Date object.
 */
const generateExpireDate = (expireIn: number) => {
  const now = new Date();
  const test = now.getTime() + expireIn * 1000;
  

  const expireDate = new Date(now.getTime() + expireIn * 1000);
  return expireDate;
};

export default generateExpireDate;
