// AwardRepository.ts
import { Award } from "../../../types/award";

export interface AwardRepository {
  create(awardData: Award): Promise<Award>;
}
