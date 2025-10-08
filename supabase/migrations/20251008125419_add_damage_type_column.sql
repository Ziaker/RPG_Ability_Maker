/*
  # Add damage_type column to skills table

  1. Changes
    - Add `damage_type` column (text, nullable) to skills table
  
  2. Notes
    - This column stores the type of damage for the skill (e.g., "Físico", "Mágico")
    - Nullable to maintain compatibility with existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skills' AND column_name = 'damage_type'
  ) THEN
    ALTER TABLE skills ADD COLUMN damage_type text;
  END IF;
END $$;
