import React from 'react';
import { Skill, SpeedType, SPEED_TYPES } from '../types/skill';
import { getAllElements } from '../utils/elements';

interface SkillEditorProps {
  skill: Skill;
  onSkillChange: (skill: Skill) => void;
}

const SkillEditor: React.FC<SkillEditorProps> = ({ skill, onSkillChange }) => {
  const updateField = <K extends keyof Skill>(field: K, value: Skill[K]) => {
    onSkillChange({ ...skill, [field]: value, updatedAt: Date.now() });
  };

  const updateCost = (costType: 'ac' | 'mp' | 'hp', value: string) => {
    const numValue = value === '' ? undefined : parseInt(value, 10);
    onSkillChange({
      ...skill,
      costs: { ...skill.costs, [costType]: numValue },
      updatedAt: Date.now()
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-8 shadow-md">
        <h3 className="text-xl font-bold mb-6 text-white">Informações Básicas</h3>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Nome da Habilidade
            </label>
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              placeholder="NOME DA HABILIDADE"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Nível
            </label>
            <input
              type="number"
              value={skill.level}
              onChange={(e) => updateField('level', parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Elementos
            </label>
            <input
              type="text"
              value={skill.elements}
              onChange={(e) => updateField('elements', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-gray-600 text-white"
              placeholder="CRYO / IGNI"
            />
            <p className="text-xs text-gray-300 mt-1">
              Elementos: {getAllElements().join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-8 shadow-md">
        <h3 className="text-xl font-bold mb-6 text-white">Custos e Atributos</h3>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Custo AC
            </label>
            <input
              type="number"
              value={skill.costs.ac ?? ''}
              onChange={(e) => updateCost('ac', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Custo MP
            </label>
            <input
              type="number"
              value={skill.costs.mp ?? ''}
              onChange={(e) => updateCost('mp', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Custo HP
            </label>
            <input
              type="number"
              value={skill.costs.hp ?? ''}
              onChange={(e) => updateCost('hp', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Alcance
            </label>
            <input
              type="text"
              value={skill.range}
              onChange={(e) => updateField('range', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              placeholder="Ex: 10m"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Velocidade
            </label>
            <select
              value={skill.speed}
              onChange={(e) => updateField('speed', e.target.value as SpeedType)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-600 text-white"
            >
              {SPEED_TYPES.map((speed) => (
                <option key={speed} value={speed}>
                  {speed.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Tipo de Dano
            </label>
            <input
              type="text"
              value={skill.damageType || ''}
              onChange={(e) => updateField('damageType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
              placeholder="Ex: Físico"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Arquétipo
          </label>
          <input
            type="text"
            value={skill.archetype}
            onChange={(e) => updateField('archetype', e.target.value)}
            className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-600 text-white"
            placeholder="Ex: Combate, Suporte, Controle"
          />
        </div>

        <div className="mt-5 p-5 bg-gray-600 rounded-lg">
          <p className="text-sm font-semibold text-gray-200 mb-3">Dicas de Arquétipos:</p>
          <div className="flex flex-wrap gap-2">
            {['CHARGE', 'NORMAL', 'NIMBLE', 'BURST', 'AMBUSH', 'INSTANT', 'ITEM EFFECT', 'PASSIVE EFFECT'].map((archetype) => (
              <button
                key={archetype}
                onClick={() => updateField('archetype', archetype)}
                className="text-xs bg-blue-500 text-white px-3 py-1 rounded font-medium hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {archetype}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-8 shadow-md">
        <h3 className="text-xl font-bold mb-6 text-white">Descrição e Efeito</h3>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Descrição Principal
            </label>
            <textarea
              value={skill.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-gray-600 text-white"
              placeholder="Descreva a habilidade. Use ` (backtick) para quebra de linha."
              rows={8}
            />
            <p className="text-xs text-gray-300 mt-1">
              Use [texto] para vermelho, {`{texto}`} para azul, ` para quebra de linha. Elementos de 4 letras são automaticamente coloridos.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Descrição Estendida (Efeito)
            </label>
            <textarea
              value={skill.effect}
              onChange={(e) => updateField('effect', e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-gray-600 text-white"
              placeholder="Descreva os efeitos especiais. Use ` (backtick) para quebra de linha."
              rows={8}
            />
            <p className="text-xs text-gray-300 mt-1">
              Use [texto] para vermelho, {`{texto}`} para azul, ` para quebra de linha. Elementos de 4 letras são automaticamente coloridos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillEditor;
