import knex from "../knex";
import { TABLE_USERS } from "../knex/table-names";
import passwordService from "./password.service";

class UserService {
  async create(userModel) {
    const { password } = userModel;
    userModel.password = await passwordService.hash(password);

    const [userId] = await knex(TABLE_USERS).insert(userModel);
    return userId;
  }

  async getById(id) {
    const user = await knex(TABLE_USERS).where({ id }).first();
    return user;
  }

  async getByUsername(username) {
    const user = await knex(TABLE_USERS).where({ username }).first();
    return user;
  }
}

export const userService = new UserService();
export default userService;
