// ApiClaimRepository.ts
import { Claim } from "../../../types/claim";
import { ClaimRepository } from "../interfaces/claimInterface";

export class ApiClaimRepository implements ClaimRepository {
  async create(claimData: Claim): Promise<Claim> {
    const response = await fetch("https://ar-mvc-api.vercel.app/api/claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(claimData),
    });

    if (!response.ok) {
      throw new Error("Error al crear reclamo");
    }

    return response.json();
  }
}
