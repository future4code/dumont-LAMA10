import { BaseDatabase } from "./BaseDatabase";
import { User, UserDB } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {

   private static TABLE_NAME = "Users_LAMA";

   private static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.email,
         user.password,
         User.stringToUserRole(user.role)
      );
   }

   public createUser =  async (
      user: UserDB): Promise<void> => {
      try {
         await BaseDatabase.connection
            .insert(user)
            .into(UserDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(error.statusCode, error.sqlMessage)
      }
   }

   public getUserByEmail = async (email: string): Promise<User> => {
      try {
         const result = await BaseDatabase.connection
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

         return UserDatabase.toUserModel(result[0]);
      } catch (error) {
         throw new CustomError(error.statusCode, error.sqlMessage)
      }
   }
}