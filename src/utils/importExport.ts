import { Skill } from '../types/skill';

export interface ExportData {
  version: string;
  exportDate: string;
  skills: Skill[];
}

export const exportSkills = (skills: Skill[]): void => {
  const data: ExportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    skills
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `skills-export-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importSkills = (file: File): Promise<Skill[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ExportData;

        if (!data.skills || !Array.isArray(data.skills)) {
          reject(new Error('Arquivo JSON inválido: formato incorreto'));
          return;
        }

        const missingIcons: string[] = [];
        data.skills.forEach((skill) => {
          if (skill.energyIcon && !skill.energyIcon.startsWith('data:')) {
            missingIcons.push(`${skill.name} - Ícone de Energia`);
          }
          if (skill.typeIcon && !skill.typeIcon.startsWith('data:')) {
            missingIcons.push(`${skill.name} - Ícone de Tipo`);
          }
        });

        if (missingIcons.length > 0) {
          console.warn('Ícones ausentes detectados:', missingIcons);
        }

        resolve(data.skills);
      } catch (error) {
        reject(new Error('Erro ao processar arquivo JSON: ' + (error as Error).message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };

    reader.readAsText(file);
  });
};

export const validateSkill = (skill: Partial<Skill>): string[] => {
  const errors: string[] = [];

  if (!skill.name || skill.name.trim() === '') {
    errors.push('Nome da habilidade é obrigatório');
  }

  if (!skill.type || !['physical', 'magic', 'psychic', 'passive'].includes(skill.type)) {
    errors.push('Tipo de habilidade inválido');
  }

  const bracketMatches = (skill.description || '').match(/\[/g)?.length || 0;
  const bracketCloses = (skill.description || '').match(/\]/g)?.length || 0;
  if (bracketMatches !== bracketCloses) {
    errors.push('Colchetes desbalanceados na descrição');
  }

  const braceMatches = (skill.description || '').match(/\{/g)?.length || 0;
  const braceCloses = (skill.description || '').match(/\}/g)?.length || 0;
  if (braceMatches !== braceCloses) {
    errors.push('Chaves desbalanceadas na descrição');
  }

  const effectBracketMatches = (skill.effect || '').match(/\[/g)?.length || 0;
  const effectBracketCloses = (skill.effect || '').match(/\]/g)?.length || 0;
  if (effectBracketMatches !== effectBracketCloses) {
    errors.push('Colchetes desbalanceados no efeito');
  }

  const effectBraceMatches = (skill.effect || '').match(/\{/g)?.length || 0;
  const effectBraceCloses = (skill.effect || '').match(/\}/g)?.length || 0;
  if (effectBraceMatches !== effectBraceCloses) {
    errors.push('Chaves desbalanceadas no efeito');
  }

  return errors;
};
