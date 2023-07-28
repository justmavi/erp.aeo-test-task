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

  getById(id) {
    return knex(TABLE_USERS).where({ id }).first();
  }

  getByUsername(username) {
    return knex(TABLE_USERS).where({ username }).first();
  }
}

export const userService = new UserService();
export default userService;
