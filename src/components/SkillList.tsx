import React from 'react';
import { Skill, SKILL_TEMPLATES } from '../types/skill';
import { Copy, Scissors, Clipboard, Trash2, Plus, Edit } from 'lucide-react';

interface SkillListProps {
  skills: Skill[];
  selectedSkillId?: string;
  copiedSkill?: Skill | null;
  cutSkill?: Skill | null;
  onSelectSkill: (skillId: string) => void;
  onCreateSkill: () => void;
  onDeleteSkill: (skillId: string) => void;
  onCopySkill: (skill: Skill) => void;
  onCutSkill: (skill: Skill) => void;
  onPasteSkill: () => void;
}

const SkillList: React.FC<SkillListProps> = ({
  skills,
  selectedSkillId,
  copiedSkill,
  cutSkill,
  onSelectSkill,
  onCreateSkill,
  onDeleteSkill,
  onCopySkill,
  onCutSkill,
  onPasteSkill
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Habilidades</h2>
        <button
          onClick={onCreateSkill}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          title="Criar nova habilidade"
        >
          <Plus className="w-4 h-4" />
          Nova
        </button>
      </div>

      {(copiedSkill || cutSkill) && (
        <button
          onClick={onPasteSkill}
          className="w-full flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium mb-3"
        >
          <Clipboard className="w-4 h-4" />
          Colar Habilidade
        </button>
      )}

      <div className="flex-1 overflow-y-auto space-y-2">
        {skills.length === 0 ? (
          <p className="text-gray-400 text-center text-sm mt-8">
            Nenhuma habilidade criada ainda.
          </p>
        ) : (
          skills.map((skill) => {
            const template = SKILL_TEMPLATES[skill.type];
            const isSelected = skill.id === selectedSkillId;
            const isCut = cutSkill?.id === skill.id;

            return (
              <div
                key={skill.id}
                className={`
                  p-3 rounded-lg border-2 transition-all cursor-pointer
                  ${isSelected
                    ? `${template.borderColor} bg-gray-50`
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  ${isCut ? 'opacity-50' : ''}
                `}
              >
                <div
                  onClick={() => onSelectSkill(skill.id)}
                  className="mb-2 flex items-center gap-2"
                >
                  <span
                    className={`${template.backgroundColor} px-2 py-1 rounded text-xs font-bold text-black flex-shrink-0`}
                  >
                    {template.symbol}
                  </span>
                  <span className="font-bold text-sm text-gray-800 truncate flex-1">
                    {skill.name || 'Sem nome'}
                  </span>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSkill(skill.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopySkill(skill);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                    title="Copiar"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCutSkill(skill);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 transition-colors"
                    title="Cortar"
                  >
                    <Scissors className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Tem certeza que deseja excluir esta habilidade?')) {
                        onDeleteSkill(skill.id);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SkillList;
