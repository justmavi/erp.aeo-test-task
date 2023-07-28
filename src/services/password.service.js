import bcrypt from "bcrypt";

import { USER_PASSWORD_HASH_SALT_ROUNDS } from "../constants";

class PasswordService {
  checkMatching(hashedPassword, nativePassword) {
    return bcrypt.compare(nativePassword, hashedPassword);
  }

  hash(password) {
    return bcrypt.hash(password, USER_PASSWORD_HASH_SALT_ROUNDS);
  }
}

export const passwordService = new PasswordService();
export default passwordService;
