import html2canvas from 'html2canvas';

export const exportSkillAsPNG = async (elementId: string, skillName: string): Promise<void> => {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('Elemento não encontrado para exportação');
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#1f2937',
      scale: 2,
      logging: false,
      useCORS: true
    });

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${skillName || 'habilidade'}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar PNG:', error);
    throw new Error('Falha ao exportar imagem');
  }
};
