import React from 'react';
import { ELEMENT_COLORS } from './elements';

export interface TextSegment {
  text: string;
  color?: string;
  isElement?: boolean;
  isBracket?: boolean;
  isBrace?: boolean;
}

export const parseText = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  let currentText = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (char === '[') {
      if (currentText) {
        segments.push(...parseForElements(currentText));
        currentText = '';
      }

      const endBracket = text.indexOf(']', i);
      if (endBracket !== -1) {
        const bracketContent = text.substring(i + 1, endBracket);
        segments.push({
          text: bracketContent,
          color: '#FF0000',
          isBracket: true
        });
        i = endBracket + 1;
      } else {
        currentText += char;
        i++;
      }
    } else if (char === '{') {
      if (currentText) {
        segments.push(...parseForElements(currentText));
        currentText = '';
      }

      const endBrace = text.indexOf('}', i);
      if (endBrace !== -1) {
        const braceContent = text.substring(i + 1, endBrace);
        segments.push({
          text: braceContent,
          color: '#0000FF',
          isBrace: true
        });
        i = endBrace + 1;
      } else {
        currentText += char;
        i++;
      }
    } else if (char === '`') {
      if (currentText) {
        segments.push(...parseForElements(currentText));
        currentText = '';
      }
      i++;
    } else {
      currentText += char;
      i++;
    }
  }

  if (currentText) {
    segments.push(...parseForElements(currentText));
  }

  return segments;
};

const parseForElements = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  const elementPattern = /\b([A-Z]{4})\b/g;
  let lastIndex = 0;
  let match;

  while ((match = elementPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.substring(lastIndex, match.index) });
    }

    const elementCode = match[1];
    const elementColor = ELEMENT_COLORS[elementCode];

    if (elementColor) {
      segments.push({
        text: elementCode,
        color: elementColor.hex,
        isElement: true
      });
    } else {
      segments.push({ text: elementCode });
    }

    lastIndex = match.index + elementCode.length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.substring(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ text }];
};

export const renderFormattedText = (
  text: string,
  className?: string
): React.ReactNode => {
  const segments = parseText(text);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.text === '') return null;

        if (segment.color) {
          return (
            <span
              key={index}
              style={{ color: segment.color }}
              className="font-semibold"
            >
              {segment.text}
            </span>
          );
        }

        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
};

export const renderFormattedTextWithBreaks = (
  text: string,
  className?: string
): React.ReactNode => {
  const lines = text.split('`').filter(line => line.length > 0);

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="mb-2 last:mb-0">
          {renderFormattedText(line)}
        </div>
      ))}
    </div>
  );
};
