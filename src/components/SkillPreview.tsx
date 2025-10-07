import React from 'react';
import { Skill, SKILL_TEMPLATES } from '../types/skill';
import { renderFormattedText, renderFormattedTextWithBreaks } from '../utils/textFormatter';
import { Hexagon } from 'lucide-react';

interface SkillPreviewProps {
  skill: Skill;
}

const SkillPreview: React.FC<SkillPreviewProps> = ({ skill }) => {
  const template = SKILL_TEMPLATES[skill.type];

  const formatCosts = () => {
    const parts: string[] = [];
    if (skill.costs.ac !== undefined) parts.push(`${skill.costs.ac}AC`);
    if (skill.costs.mp !== undefined) parts.push(`${skill.costs.mp}MP`);
    if (skill.costs.hp !== undefined) parts.push(`${skill.costs.hp}HP`);
    return parts.join(' / ');
  };

  return (
    <div className="w-full max-w-3xl bg-gray-700 border-4 border-gray-600 rounded-lg overflow-hidden shadow-2xl">
      <div className={`${template.backgroundColor} border-b-4 ${template.borderColor} px-6 py-3`}>
        <div className="flex items-center justify-between text-black">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              {skill.energyIcon ? (
                <img src={skill.energyIcon} alt="Energy" className="w-10 h-10 object-contain" />
              ) : (
                <Hexagon className="w-8 h-8 text-white" />
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-bold bg-gray-600 text-white px-2 py-1 rounded">
                LV
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                {skill.name || 'NOME DA HABILIDADE'}
              </h2>
            </div>
          </div>

          <div className="text-right">
            {formatCosts() && (
              <div className="inline-flex items-center gap-1">
                {formatCosts().split(' / ').map((cost, index, array) => (
                  <React.Fragment key={index}>
                    <span className="bg-gray-700 text-white px-3 py-1 rounded font-bold text-sm">
                      {cost}
                    </span>
                    {index < array.length - 1 && (
                      <span className="text-black font-bold">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-600 px-6 py-2 border-b-2 border-gray-500">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3 text-white">
            <span className="font-semibold">ELEM / ELEM</span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded font-bold">
              {skill.speed || '00SPD'}
            </span>
          </div>

          <div className="text-white font-semibold">
            {skill.range || 'ALCANCE'}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">
              {skill.archetype || 'ARQUÉTIPO'}
            </span>
            <span className={`${template.backgroundColor} text-black px-4 py-1 rounded font-bold uppercase`}>
              {template.label}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-500 px-6 py-6 space-y-4">
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-center text-black font-bold text-lg mb-3 uppercase">
            DESCRIÇÃO
          </h3>
          <div className="text-black text-sm leading-relaxed">
            {skill.description ? (
              renderFormattedTextWithBreaks(skill.description)
            ) : (
              <p className="text-gray-400 text-center italic">Adicione uma descrição</p>
            )}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-center text-white font-bold text-lg mb-3 uppercase">
            EFEITO
          </h3>
          <div className="text-white text-sm leading-relaxed">
            {skill.effect ? (
              renderFormattedTextWithBreaks(skill.effect)
            ) : (
              <p className="text-gray-400 text-center italic">Adicione um efeito</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPreview;
