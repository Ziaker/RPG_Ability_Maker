import React, { useState, useEffect, useCallback } from 'react';
import { Skill, SkillType } from './types/skill';
import SkillTypeSelector from './components/SkillTypeSelector';
import SkillEditor from './components/SkillEditor';
import SkillPreview from './components/SkillPreview';
import SkillList from './components/SkillList';
import IconUploader from './components/IconUploader';
import { skillService } from './services/skillService';
import { exportSkills, importSkills, validateSkill } from './utils/importExport';
import { useUndoRedo } from './hooks/useUndoRedo';
import { Download, Upload, Undo, Redo, Save, Loader } from 'lucide-react';

const createNewSkill = (type: SkillType = 'physical'): Skill => ({
  id: crypto.randomUUID(),
  type,
  level: 1,
  name: '',
  subtitle: '',
  elements: '',
  costs: {},
  range: '',
  speed: 'NORMAL',
  archetype: '',
  description: '',
  effect: '',
  createdAt: Date.now(),
  updatedAt: Date.now()
});

function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>();
  const [copiedSkill, setCopiedSkill] = useState<Skill | null>(null);
  const [cutSkill, setCutSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const currentSkill = skills.find((s) => s.id === selectedSkillId) || createNewSkill();

  const { state: editingSkill, setState: setEditingSkill, undo, redo, canUndo, canRedo, clearHistory } = useUndoRedo<Skill>(currentSkill);

  useEffect(() => {
    loadSkills();
  }, []);

  useEffect(() => {
    const skill = skills.find((s) => s.id === selectedSkillId);
    if (skill) {
      setEditingSkill(skill);
    }
  }, [selectedSkillId, skills]);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const loadedSkills = await skillService.getAll();
      setSkills(loadedSkills);
      setError('');
    } catch (err) {
      setError('Erro ao carregar habilidades');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string, isError: boolean = false) => {
    if (isError) {
      setError(msg);
      setTimeout(() => setError(''), 5000);
    } else {
      setSuccess(msg);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSaveSkill = async () => {
    try {
      setSaving(true);
      const errors = validateSkill(editingSkill);

      if (errors.length > 0) {
        showMessage(errors.join(', '), true);
        return;
      }

      const isNew = !skills.find((s) => s.id === editingSkill.id);

      if (isNew) {
        const created = await skillService.create(editingSkill);
        setSkills([created, ...skills]);
        setSelectedSkillId(created.id);
        showMessage('Habilidade criada com sucesso!');
      } else {
        const updated = await skillService.update(editingSkill.id, editingSkill);
        setSkills(skills.map((s) => (s.id === updated.id ? updated : s)));
        showMessage('Habilidade salva com sucesso!');
      }
    } catch (err) {
      showMessage('Erro ao salvar habilidade', true);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSkill = () => {
    const newSkill = createNewSkill(editingSkill.type);
    setEditingSkill(newSkill);
    setSelectedSkillId(newSkill.id);
    clearHistory();
    showMessage('Nova habilidade criada');
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      await skillService.delete(skillId);
      setSkills(skills.filter((s) => s.id !== skillId));
      if (selectedSkillId === skillId) {
        setSelectedSkillId(undefined);
      }
      showMessage('Habilidade excluída');
    } catch (err) {
      showMessage('Erro ao excluir habilidade', true);
      console.error(err);
    }
  };

  const handleCopySkill = (skill: Skill) => {
    setCopiedSkill(skill);
    setCutSkill(null);
    showMessage('Habilidade copiada');
  };

  const handleCutSkill = (skill: Skill) => {
    setCutSkill(skill);
    setCopiedSkill(null);
    showMessage('Habilidade cortada');
  };

  const handlePasteSkill = () => {
    const skillToPaste = copiedSkill || cutSkill;
    if (!skillToPaste) return;

    const newSkill = {
      ...skillToPaste,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    if (cutSkill) {
      handleDeleteSkill(cutSkill.id);
      setCutSkill(null);
    }

    setEditingSkill(newSkill);
    setSelectedSkillId(newSkill.id);
    clearHistory();
    showMessage('Habilidade colada');
  };

  const handleExport = () => {
    exportSkills(skills);
    showMessage('Habilidades exportadas');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedSkills = await importSkills(file);

      for (const skill of importedSkills) {
        const newSkill = {
          ...skill,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        await skillService.create(newSkill);
      }

      await loadSkills();
      showMessage(`${importedSkills.length} habilidade(s) importada(s)`);
    } catch (err) {
      showMessage((err as Error).message, true);
    }

    e.target.value = '';
  };

  const handleTypeChange = (type: SkillType) => {
    setEditingSkill({ ...editingSkill, type, updatedAt: Date.now() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            Editor de Habilidades RPG
          </h1>

          {(error || success) && (
            <div className={`max-w-2xl mx-auto p-4 rounded-lg mb-4 ${error ? 'bg-red-500' : 'bg-green-500'}`}>
              <p className="text-white font-semibold text-center">{error || success}</p>
            </div>
          )}

          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={handleSaveSkill}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Salvar
            </button>

            <button
              onClick={undo}
              disabled={!canUndo}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              <Undo className="w-5 h-5" />
              Desfazer
            </button>

            <button
              onClick={redo}
              disabled={!canRedo}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              <Redo className="w-5 h-5" />
              Refazer
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
            >
              <Download className="w-5 h-5" />
              Exportar
            </button>

            <label className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              Importar
              <input
                type="file"
                accept="application/json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-lg p-8 flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <SkillList
                skills={skills}
                selectedSkillId={selectedSkillId}
                copiedSkill={copiedSkill}
                cutSkill={cutSkill}
                onSelectSkill={setSelectedSkillId}
                onCreateSkill={handleCreateSkill}
                onDeleteSkill={handleDeleteSkill}
                onCopySkill={handleCopySkill}
                onCutSkill={handleCutSkill}
                onPasteSkill={handlePasteSkill}
              />
            )}
          </aside>

          <main className="col-span-12 lg:col-span-9 space-y-6">
            <div className="bg-gray-700 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Tipo de Habilidade</h2>
              <SkillTypeSelector
                selectedType={editingSkill.type}
                onTypeChange={handleTypeChange}
              />
            </div>

            <div className="bg-gray-700 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Ícones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IconUploader
                  label="Ícone de Energia"
                  currentIcon={editingSkill.energyIcon}
                  onIconChange={(icon) =>
                    setEditingSkill({ ...editingSkill, energyIcon: icon, updatedAt: Date.now() })
                  }
                />
                <IconUploader
                  label="Ícone de Tipo"
                  currentIcon={editingSkill.typeIcon}
                  onIconChange={(icon) =>
                    setEditingSkill({ ...editingSkill, typeIcon: icon, updatedAt: Date.now() })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Editor</h2>
                <SkillEditor skill={editingSkill} onSkillChange={setEditingSkill} />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Pré-visualização</h2>
                <SkillPreview skill={editingSkill} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
