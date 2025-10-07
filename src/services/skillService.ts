import { supabase } from '../lib/supabase';
import { Skill } from '../types/skill';

interface SkillDB {
  id: string;
  user_id: string | null;
  skill_type: string;
  level: number;
  name: string;
  subtitle: string;
  elements: string;
  costs: {
    ac?: number;
    mp?: number;
    hp?: number;
  };
  range: string;
  speed: string;
  archetype: string;
  description: string;
  effect: string;
  energy_icon: string | null;
  type_icon: string | null;
  created_at: string;
  updated_at: string;
}

const mapDBToSkill = (dbSkill: SkillDB): Skill => ({
  id: dbSkill.id,
  type: dbSkill.skill_type as Skill['type'],
  level: dbSkill.level,
  name: dbSkill.name,
  subtitle: dbSkill.subtitle,
  elements: dbSkill.elements,
  costs: dbSkill.costs,
  range: dbSkill.range,
  speed: dbSkill.speed as Skill['speed'],
  archetype: dbSkill.archetype,
  description: dbSkill.description,
  effect: dbSkill.effect,
  energyIcon: dbSkill.energy_icon || undefined,
  typeIcon: dbSkill.type_icon || undefined,
  createdAt: new Date(dbSkill.created_at).getTime(),
  updatedAt: new Date(dbSkill.updated_at).getTime()
});

const mapSkillToDB = (skill: Skill): Partial<SkillDB> => ({
  skill_type: skill.type,
  level: skill.level,
  name: skill.name,
  subtitle: skill.subtitle,
  elements: skill.elements,
  costs: skill.costs,
  range: skill.range,
  speed: skill.speed,
  archetype: skill.archetype,
  description: skill.description,
  effect: skill.effect,
  energy_icon: skill.energyIcon || null,
  type_icon: skill.typeIcon || null,
  updated_at: new Date().toISOString()
});

export const skillService = {
  async getAll(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching skills:', error);
      throw new Error('Failed to fetch skills');
    }

    return (data as SkillDB[]).map(mapDBToSkill);
  },

  async getById(id: string): Promise<Skill | null> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching skill:', error);
      throw new Error('Failed to fetch skill');
    }

    return data ? mapDBToSkill(data as SkillDB) : null;
  },

  async create(skill: Skill): Promise<Skill> {
    const dbSkill = mapSkillToDB(skill);

    const { data, error } = await supabase
      .from('skills')
      .insert([dbSkill])
      .select()
      .single();

    if (error) {
      console.error('Error creating skill:', error);
      throw new Error('Failed to create skill');
    }

    return mapDBToSkill(data as SkillDB);
  },

  async update(id: string, skill: Skill): Promise<Skill> {
    const dbSkill = mapSkillToDB(skill);

    const { data, error } = await supabase
      .from('skills')
      .update(dbSkill)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating skill:', error);
      throw new Error('Failed to update skill');
    }

    return mapDBToSkill(data as SkillDB);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting skill:', error);
      throw new Error('Failed to delete skill');
    }
  }
};
