export const required = value => (value ? undefined : 'Required');
export const number = value =>
value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const emailValidate = (value) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]? w+)*(\.\w{2,3})+$/;
  return !emailRegex.test(value) ? 'Invalid email' : undefined;
};
export const passwordValidate = value =>
  value && value.length < 6 ? 'Password must be at least 6 characters' : undefined
