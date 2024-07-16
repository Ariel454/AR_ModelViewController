// AwardService.ts
import { Award } from "../../../types/award";
import { AwardRepository } from "../interfaces/AwardInterface";

export class AwardService {
  constructor(private awardRepository: AwardRepository) {}

  async createAward(awardData: Award): Promise<Award> {
    return this.awardRepository.create(awardData);
  }
}
