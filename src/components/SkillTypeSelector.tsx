import React from 'react';
import { SkillType, SKILL_TEMPLATES } from '../types/skill';

interface SkillTypeSelectorProps {
  selectedType: SkillType;
  onTypeChange: (type: SkillType) => void;
}

const SkillTypeSelector: React.FC<SkillTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  return (
    <div className="flex gap-3">
      {Object.values(SKILL_TEMPLATES).map((template) => (
        <button
          key={template.type}
          onClick={() => onTypeChange(template.type)}
          className={`
            flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm
            transition-all duration-200 border-2
            ${selectedType === template.type
              ? `${template.backgroundColor} ${template.borderColor} scale-105 shadow-lg`
              : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
            }
          `}
        >
          <span className="text-xl">{template.symbol}</span>
          <span className="text-black">{template.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SkillTypeSelector;
