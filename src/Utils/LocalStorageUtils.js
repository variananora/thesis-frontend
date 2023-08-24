export const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const removeCurrentUser = () => {
  localStorage.removeItem('currentUser');
};
