// strategies/BonusStrategy.ts
interface BonusStrategy {
  calculateBonus(userId: number): Promise<number>;
}

class BasicBonusStrategy implements BonusStrategy {
  async calculateBonus(userId: number): Promise<number> {
    // Lógica básica para calcular bonus
    return 0; // Placeholder
  }
}

class PremiumBonusStrategy implements BonusStrategy {
  async calculateBonus(userId: number): Promise<number> {
    // Lógica premium para calcular bonus
    return 0; // Placeholder
  }
}

export type { BonusStrategy, BasicBonusStrategy, PremiumBonusStrategy };
