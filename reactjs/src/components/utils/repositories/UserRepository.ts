// ApiUserRepository.ts
import { User } from "../../../types/user";
import { UserRepository } from "../interfaces/UserInterface";

export class ApiUserRepository implements UserRepository {
  async create(userData: User): Promise<User> {
    const response = await fetch("https://ar-mvc-api.vercel.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }

    return response.json();
  }
}
