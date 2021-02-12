import { UserInputDTO, LoginInputDTO, UserDB } from "./entities/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";

export class UserBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private userDatabase: UserDatabase,
   ) { }

   async createUser(user: UserInputDTO) {

      const id = this.idGenerator.generate()

      const hashPassword = await this.hashManager.hash(user.password)

      const newUser: UserDB = {
         id: id,
         email: user.email,
         name: user.name,
         password: hashPassword,
         role: user.role
      }
      await this.userDatabase.createUser(newUser)

      const accessToken = this.authenticator.generateToken({
         id,
         role: user.role
      });

      return accessToken
   }

   async getUserByEmail(user: LoginInputDTO) {

      const userFromDB = await this.userDatabase.getUserByEmail(user.email)

      const passwordIsCorrect = await this.hashManager.compare(
         user.password,
         userFromDB.password
      )

      const accessToken = this.authenticator.generateToken({
         id: userFromDB.id,
         role: userFromDB.role
      })

      if (!passwordIsCorrect) {
         throw new CustomError(401, "Invalid credentials!")
      }

      return accessToken
   }
}