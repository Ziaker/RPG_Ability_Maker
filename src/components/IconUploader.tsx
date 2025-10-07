import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface IconUploaderProps {
  label: string;
  currentIcon?: string;
  onIconChange: (icon: string | undefined) => void;
}

const IconUploader: React.FC<IconUploaderProps> = ({
  label,
  currentIcon,
  onIconChange
}) => {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setError('Apenas arquivos PNG ou JPEG são permitidos');
        resolve(false);
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          if (img.width > 500 || img.height > 500) {
            setError('A imagem deve ter no máximo 500x500 pixels');
            resolve(false);
          } else {
            setError('');
            resolve(true);
          }
        };
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = await validateImage(file);
    if (!isValid) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onIconChange(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onIconChange(undefined);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="flex items-center gap-3">
        {currentIcon ? (
          <div className="relative">
            <img
              src={currentIcon}
              alt={label}
              className="w-20 h-20 object-contain border-2 border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              title="Remover ícone"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}

        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
            className="hidden"
            id={`icon-upload-${label}`}
          />
          <label
            htmlFor={`icon-upload-${label}`}
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors text-sm font-medium"
          >
            {currentIcon ? 'Alterar Ícone' : 'Fazer Upload'}
          </label>
          <p className="text-xs text-gray-500 mt-2">
            PNG ou JPEG, máximo 500x500px
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default IconUploader;
