// UserRepository.ts
import { User } from "../../../types/user";

export interface UserRepository {
  create(userData: User): Promise<User>;
}
