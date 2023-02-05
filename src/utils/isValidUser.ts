export const isValidUser = (user: any): boolean => {
  return (
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every((hobby: any) => typeof hobby === 'string')
  );
};
