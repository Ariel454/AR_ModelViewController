// ClaimService.ts
import { Claim } from "../../../types/claim";
import { ClaimRepository } from "../interfaces/claimInterface";

export class ClaimService {
  constructor(private claimRepository: ClaimRepository) {}

  async createClaim(claimData: Claim): Promise<Claim> {
    return this.claimRepository.create(claimData);
  }
}
