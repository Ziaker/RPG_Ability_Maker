export interface ElementColor {
  code: string;
  hex: string;
  textColor: string;
}

export const ELEMENT_COLORS: Record<string, ElementColor> = {
  CRYO: { code: 'CRYO', hex: '#00BFFF', textColor: 'text-[#00BFFF]' },
  RAIN: { code: 'RAIN', hex: '#1E90FF', textColor: 'text-[#1E90FF]' },
  SOUL: { code: 'SOUL', hex: '#9370DB', textColor: 'text-[#9370DB]' },
  GENO: { code: 'GENO', hex: '#8B0000', textColor: 'text-[#8B0000]' },
  WOOD: { code: 'WOOD', hex: '#228B22', textColor: 'text-[#228B22]' },
  FUNG: { code: 'FUNG', hex: '#556B2F', textColor: 'text-[#556B2F]' },
  STAR: { code: 'STAR', hex: '#FFD700', textColor: 'text-[#FFD700]' },
  CELL: { code: 'CELL', hex: '#32CD32', textColor: 'text-[#32CD32]' },
  SONG: { code: 'SONG', hex: '#FF69B4', textColor: 'text-[#FF69B4]' },
  BLOD: { code: 'BLOD', hex: '#B22222', textColor: 'text-[#B22222]' },
  CLOD: { code: 'CLOD', hex: '#8B4513', textColor: 'text-[#8B4513]' },
  BOMB: { code: 'BOMB', hex: '#FF4500', textColor: 'text-[#FF4500]' },
  IRON: { code: 'IRON', hex: '#708090', textColor: 'text-[#708090]' },
  HOLY: { code: 'HOLY', hex: '#FFFFE0', textColor: 'text-[#FFFFE0]' },
  VODO: { code: 'VODO', hex: '#4B0082', textColor: 'text-[#4B0082]' },
  MEAT: { code: 'MEAT', hex: '#CD5C5C', textColor: 'text-[#CD5C5C]' },
  ELEC: { code: 'ELEC', hex: '#FFD700', textColor: 'text-[#FFD700]' },
  ACID: { code: 'ACID', hex: '#ADFF2F', textColor: 'text-[#ADFF2F]' },
  BONE: { code: 'BONE', hex: '#F5F5DC', textColor: 'text-[#F5F5DC]' },
  TIME: { code: 'TIME', hex: '#DAA520', textColor: 'text-[#DAA520]' },
  AQUA: { code: 'AQUA', hex: '#00FFFF', textColor: 'text-[#00FFFF]' },
  AERO: { code: 'AERO', hex: '#87CEEB', textColor: 'text-[#87CEEB]' },
  IGNI: { code: 'IGNI', hex: '#FF4500', textColor: 'text-[#FF4500]' },
  ROCK: { code: 'ROCK', hex: '#8B4513', textColor: 'text-[#8B4513]' },
  ZERO: { code: 'ZERO', hex: '#E6E6FA', textColor: 'text-[#E6E6FA]' },
  MANA: { code: 'MANA', hex: '#7B68EE', textColor: 'text-[#7B68EE]' },
  MIND: { code: 'MIND', hex: '#9932CC', textColor: 'text-[#9932CC]' },
  LUZI: { code: 'LUZI', hex: '#FFDAB9', textColor: 'text-[#FFDAB9]' },
  DARK: { code: 'DARK', hex: '#000000', textColor: 'text-[#000000]' },
  LEAF: { code: 'LEAF', hex: '#228B22', textColor: 'text-[#228B22]' },
  TOXI: { code: 'TOXI', hex: '#9ACD32', textColor: 'text-[#9ACD32]' },
  ETER: { code: 'ETER', hex: '#BA55D3', textColor: 'text-[#BA55D3]' },
  IKNI: { code: 'IKNI', hex: '#FF6347', textColor: 'text-[#FF6347]' },
  GRAV: { code: 'GRAV', hex: '#2F4F4F', textColor: 'text-[#2F4F4F]' }
};

export const getAllElements = (): string[] => {
  return Object.keys(ELEMENT_COLORS);
};

export const getElementColor = (elementCode: string): ElementColor | null => {
  return ELEMENT_COLORS[elementCode.toUpperCase()] || null;
};
