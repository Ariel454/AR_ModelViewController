// ClaimRepository.ts
import { Claim } from "../../../types/claim";

export interface ClaimRepository {
  create(claimData: Claim): Promise<Claim>;
}
