import bcrypt from "bcryptjs";
export const passwordEncryption = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(plainPassword, salt);
  return encryptedPassword;
};
export const passwordMatching = async (userPassword, encryptedPassword) => {
  return await bcrypt.compare(userPassword, encryptedPassword);
};
