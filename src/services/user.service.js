import bcrypt from "bcrypt";
import knex from "../knex";
import { TABLE_USERS } from "../knex/table-names";
import { USER_PASSWORD_HASH_SALT_ROUNDS } from "../constants";

class UserService {
  async checkExists(username, password) {
    const user = await knex().where({ username });
    if (!user) return false;

    const comparingResult = await bcrypt.compare(password, user.password);
    if (!comparingResult) return false;

    return true;
  }

  async create(userModel) {
    const { password } = userModel;

    userModel.password = await bcrypt.hash(
      password,
      USER_PASSWORD_HASH_SALT_ROUNDS
    );

    try {
      const user = await knex.insert(userModel).into(TABLE_USERS);
      return user;
    } catch {
      return false; // user already exists
    }
  }

  async getById(id) {
    const [user] = await knex().where({ id });
    return user;
  }
}

export default new UserService();
