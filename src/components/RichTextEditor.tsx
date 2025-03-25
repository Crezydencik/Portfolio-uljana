
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Link,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Toggle } from './ui/toggle';
import { Separator } from './ui/separator';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const { t } = useTranslation();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertFormat = (startTag: string, endTag: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    const newValue = `${beforeText}${startTag}${selectedText}${endTag}${afterText}`;
    onChange(newValue);
    
    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length, 
        start + startTag.length + selectedText.length
      );
    }, 10);
  };

  const formatHandlers = {
    bold: () => insertFormat('<strong>', '</strong>'),
    italic: () => insertFormat('<em>', '</em>'),
    underline: () => insertFormat('<u>', '</u>'),
    bulletList: () => insertFormat('<ul>\n  <li>', '</li>\n</ul>'),
    numberedList: () => insertFormat('<ol>\n  <li>', '</li>\n</ol>'),
    heading1: () => insertFormat('<h1>', '</h1>'),
    heading2: () => insertFormat('<h2>', '</h2>'),
    heading3: () => insertFormat('<h3>', '</h3>'),
    link: () => {
      const url = prompt(t('enterUrl') || 'Enter URL:', 'https://');
      if (url) {
        insertFormat(`<a href="${url}" target="_blank">`, '</a>');
      }
    },
    unlink: () => {
      if (!textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      
      // Simple regex to remove anchor tags
      const newText = selectedText.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');
      
      const beforeText = value.substring(0, start);
      const afterText = value.substring(end);
      
      onChange(`${beforeText}${newText}${afterText}`);
    },
    alignLeft: () => insertFormat('<div style="text-align: left;">', '</div>'),
    alignCenter: () => insertFormat('<div style="text-align: center;">', '</div>'),
    alignRight: () => insertFormat('<div style="text-align: right;">', '</div>'),
    alignJustify: () => insertFormat('<div style="text-align: justify;">', '</div>'),
  };

  return (
    <div className="border rounded-md">
      <div className="p-2 bg-gray-50 border-b flex flex-wrap gap-1">
        <Toggle 
          aria-label={t('bold')} 
          title={t('bold')} 
          onClick={formatHandlers.bold}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('italic')} 
          title={t('italic')} 
          onClick={formatHandlers.italic}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('underline')} 
          title={t('underline')} 
          onClick={formatHandlers.underline}
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Toggle 
          aria-label={t('bulletList')} 
          title={t('bulletList')} 
          onClick={formatHandlers.bulletList}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('numberedList')} 
          title={t('numberedList')} 
          onClick={formatHandlers.numberedList}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Toggle 
          aria-label={t('heading1')} 
          title={t('heading1')} 
          onClick={formatHandlers.heading1}
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('heading2')} 
          title={t('heading2')} 
          onClick={formatHandlers.heading2}
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('heading3')} 
          title={t('heading3')} 
          onClick={formatHandlers.heading3}
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Toggle 
          aria-label={t('link')} 
          title={t('link')} 
          onClick={formatHandlers.link}
        >
          <Link className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('unlink')} 
          title={t('unlink')} 
          onClick={formatHandlers.unlink}
        >
          <Unlink className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Toggle 
          aria-label={t('alignLeft')} 
          title={t('alignLeft')} 
          onClick={formatHandlers.alignLeft}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('alignCenter')} 
          title={t('alignCenter')} 
          onClick={formatHandlers.alignCenter}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('alignRight')} 
          title={t('alignRight')} 
          onClick={formatHandlers.alignRight}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle 
          aria-label={t('alignJustify')} 
          title={t('alignJustify')} 
          onClick={formatHandlers.alignJustify}
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-0 rounded-t-none min-h-[200px]"
      />
    </div>
  );
};

export default RichTextEditor;
