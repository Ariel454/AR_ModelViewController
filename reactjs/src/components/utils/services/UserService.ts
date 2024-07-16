// UserService.ts
import { User } from "../../../types/user";
import { UserRepository } from "../interfaces/UserInterface";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: User): Promise<User> {
    return this.userRepository.create(userData);
  }
}
