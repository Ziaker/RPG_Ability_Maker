/*
  # Create Skills Table

  1. New Tables
    - `skills`
      - `id` (uuid, primary key) - Unique identifier for the skill
      - `user_id` (uuid, nullable) - Reference to auth.users for future multi-user support
      - `skill_type` (text) - Skill type: physical, magic, psychic, or passive
      - `level` (integer) - Skill level
      - `name` (text) - Name of the skill
      - `subtitle` (text, nullable) - Subtitle or category
      - `elements` (text, nullable) - Element codes and descriptions
      - `costs` (jsonb) - Cost structure (AC, MP, HP)
      - `range` (text, nullable) - Skill range
      - `speed` (text) - Speed type
      - `archetype` (text, nullable) - Archetype classification
      - `description` (text, nullable) - Main description
      - `effect` (text, nullable) - Extended effect description
      - `energy_icon` (text, nullable) - Base64 encoded energy icon
      - `type_icon` (text, nullable) - Base64 encoded type icon
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `skills` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public write access (for demo purposes)

  3. Indexes
    - Index on `created_at` for sorting
    - Index on `skill_type` for filtering

  ## Notes
  - This is a demo/prototype setup with public access
  - For production, implement proper authentication and user-specific policies
  - JSONB type used for costs to allow flexible structure
*/

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  skill_type text NOT NULL CHECK (skill_type IN ('physical', 'magic', 'psychic', 'passive')),
  level integer NOT NULL DEFAULT 1,
  name text NOT NULL,
  subtitle text DEFAULT '',
  elements text DEFAULT '',
  costs jsonb DEFAULT '{"ac": null, "mp": null, "hp": null}'::jsonb,
  range text DEFAULT '',
  speed text NOT NULL DEFAULT 'NORMAL',
  archetype text DEFAULT '',
  description text DEFAULT '',
  effect text DEFAULT '',
  energy_icon text,
  type_icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view skills"
  ON skills
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert skills"
  ON skills
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update skills"
  ON skills
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete skills"
  ON skills
  FOR DELETE
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_skills_created_at ON skills(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_skill_type ON skills(skill_type);
