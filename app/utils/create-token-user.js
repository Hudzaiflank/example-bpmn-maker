const createTokenUser = (user) => {
  return {
    id: user.id,
    uid: user.uid,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  createTokenUser,
};
