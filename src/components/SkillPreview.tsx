import React from 'react';
import { Skill, SKILL_TEMPLATES, getSkillIcon } from '../types/skill';
import { renderFormattedText, renderFormattedTextWithBreaks } from '../utils/textFormatter';
import { Hexagon } from 'lucide-react';

interface SkillPreviewProps {
  skill: Skill;
  previewId?: string;
}

const SkillPreview: React.FC<SkillPreviewProps> = ({ skill, previewId = 'skill-preview' }) => {
  const template = SKILL_TEMPLATES[skill.type];

  const renderCosts = () => {
    const costs = [];
    if (skill.costs.ac !== undefined) {
      costs.push(
        <React.Fragment key="ac">
          <span className="bg-gray-700 text-white px-3 py-1 rounded font-bold text-sm">
            {skill.costs.ac}AC
          </span>
        </React.Fragment>
      );
    }
    if (skill.costs.mp !== undefined) {
      costs.push(
        <React.Fragment key="mp">
          <span className="bg-gray-700 px-3 py-1 rounded font-bold text-sm text-blue-400">
            {skill.costs.mp}MP
          </span>
        </React.Fragment>
      );
    }
    if (skill.costs.hp !== undefined) {
      costs.push(
        <React.Fragment key="hp">
          <span className="bg-gray-700 px-3 py-1 rounded font-bold text-sm text-red-400">
            {skill.costs.hp}HP
          </span>
        </React.Fragment>
      );
    }
    return costs;
  };

  return (
    <div id={previewId} className="w-full max-w-4xl bg-gray-700 border-4 border-gray-600 rounded-lg overflow-hidden shadow-2xl">
      <div className={`${template.backgroundColor} border-b-4 ${template.borderColor} px-6 py-3`}>
        <div className="flex items-center justify-between text-black">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
              {skill.energyIcon ? (
                <img src={skill.energyIcon} alt="Energy" className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-white">{getSkillIcon(skill.type)}</span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-bold bg-gray-600 text-white px-2 py-1 rounded">
                LV{skill.level}
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                {skill.name || 'NOME DA HABILIDADE'}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1">
              {renderCosts().map((cost, index, array) => (
                <React.Fragment key={index}>
                  {cost}
                  {index < array.length - 1 && (
                    <span className="text-black font-bold">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-600 px-6 py-2 border-b-2 border-gray-500">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3 text-white">
            {skill.elements && (
              <span className="font-semibold">{renderFormattedText(skill.elements)}</span>
            )}
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
          </div>
        </div>
      </div>

      <div className="bg-gray-500 px-6 py-8 space-y-6">
        <div className="bg-gray-300 rounded-lg p-6">
          <h3 className="text-center text-black font-bold text-xl mb-4 uppercase">
            DESCRIÇÃO
          </h3>
          <div className="text-black text-base leading-relaxed">
            {skill.description ? (
              renderFormattedTextWithBreaks(skill.description)
            ) : (
              <p className="text-gray-500 text-center italic">Adicione uma descrição</p>
            )}
          </div>
        </div>

        <div className="bg-gray-600 rounded-lg p-6">
          <h3 className="text-center text-white font-bold text-xl mb-4 uppercase">
            EFEITO
          </h3>
          <div className="text-white text-base leading-relaxed">
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
