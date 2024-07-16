// ApiAwardRepository.ts
import { Award } from "../../../types/award";
import { AwardRepository } from "../interfaces/AwardInterface";

export class ApiAwardRepository implements AwardRepository {
  async create(awardData: Award): Promise<Award> {
    const response = await fetch("https://ar-mvc-api.vercel.app/api/awards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(awardData),
    });

    if (!response.ok) {
      throw new Error("Error al crear premio");
    }

    return response.json();
  }
}
