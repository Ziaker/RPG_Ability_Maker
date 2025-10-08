export type SkillType = 'physical' | 'magic' | 'psychic' | 'passive';

export type SpeedType = 'CHARGE' | 'NORMAL' | 'NIMBLE' | 'BURST' | 'AMBUSH' | 'INSTANT' | 'ITEM_EFFECT' | 'PASSIVE_EFFECT';

export interface SkillCosts {
  ac?: number;
  mp?: number;
  hp?: number;
}

export interface Skill {
  id: string;
  type: SkillType;
  level: number;
  name: string;
  subtitle: string;
  elements: string;
  costs: SkillCosts;
  range: string;
  speed: SpeedType;
  archetype: string;
  damageType?: string;
  description: string;
  effect: string;
  energyIcon?: string;
  typeIcon?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SkillTemplate {
  type: SkillType;
  backgroundColor: string;
  borderColor: string;
  label: string;
  symbol: string;
}

export const SKILL_TEMPLATES: Record<SkillType, SkillTemplate> = {
  physical: {
    type: 'physical',
    backgroundColor: 'bg-orange-400',
    borderColor: 'border-orange-500',
    label: 'FÍSICO',
    symbol: '⬛'
  },
  magic: {
    type: 'magic',
    backgroundColor: 'bg-blue-500',
    borderColor: 'border-blue-600',
    label: 'MAGIA',
    symbol: '⭘'
  },
  psychic: {
    type: 'psychic',
    backgroundColor: 'bg-pink-400',
    borderColor: 'border-pink-500',
    label: 'PSÍQUICO',
    symbol: '△'
  },
  passive: {
    type: 'passive',
    backgroundColor: 'bg-gray-400',
    borderColor: 'border-gray-500',
    label: 'PASSIVA',
    symbol: '◇'
  }
};

export const SPEED_TYPES: SpeedType[] = [
  'CHARGE',
  'NORMAL',
  'NIMBLE',
  'BURST',
  'AMBUSH',
  'INSTANT',
  'ITEM_EFFECT',
  'PASSIVE_EFFECT'
];

export const getSkillIcon = (type: SkillType): string => {
  return SKILL_TEMPLATES[type].symbol;
};
