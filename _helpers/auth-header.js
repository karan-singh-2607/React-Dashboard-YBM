function authHeader(isImage) {
  // Return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('userDetails'));
  console.log(user);
  if (user && user.token) {
    if (isImage != null && isImage) {
      return {
        Authorization: `Bearer ${user.token}`,
      };
    }
    return {
      'Content-Type': 'application/json',
      Authorization: user.token,
      // Authorization: "Bearers " + user.token,
    };
  }
  return {};
}
export default authHeader;
