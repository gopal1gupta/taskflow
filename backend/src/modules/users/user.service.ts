import { UserRepository } from "./user.repository";
import { CreateUserDto, User } from "./user.types";

export class UserService {
  private repository = new UserRepository();

  async getOrCreateUser(
    cognitoSub: string,
    email: string,
    fullName?: string
  ): Promise<User> {
    const existingUser =
      await this.repository.findByCognitoSub(cognitoSub);

    if (existingUser) {
      return existingUser;
    }

    const dto: CreateUserDto = {
      cognito_sub: cognitoSub,
      email,
      full_name: fullName,
    };

    return this.repository.create(dto);
  }

  async getUserByCognitoSub(
    cognitoSub: string
  ): Promise<User | null> {
    return this.repository.findByCognitoSub(cognitoSub);
  }
}