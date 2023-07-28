import bcrypt from "bcrypt";
import knex from "../knex";
import { TABLE_USERS } from "../knex/table-names";
import { USER_PASSWORD_HASH_SALT_ROUNDS } from "../constants";
import passwordService from "./password.service";

class UserService {
  async getByUsername(username) {
    const [user] = await knex(TABLE_USERS).where({ username });
    return user;
  }

  async create(userModel) {
    const { password } = userModel;
    userModel.password = await passwordService.hash(password);

    const [userId] = await knex(TABLE_USERS).insert(userModel, "id");
    return userId;
  }

  async getById(id) {
    const [user] = await knex(TABLE_USERS).where({ id });
    return user;
  }
}

export const userService = new UserService();
export default userService;
