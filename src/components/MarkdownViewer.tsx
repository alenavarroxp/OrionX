import 'highlight.js/styles/atom-one-dark.css';
import { Clipboard, ClipboardCheck } from 'lucide-react'; // Importa el ícono de Clipboard
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const PreBlock = ({ className, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonText, setButtonText] = useState('Copia');
  const [isCopied, setIsCopied] = useState(false); // Estado para manejar si se copió el código

  // Función para copiar al portapapeles
  const handleCopy = () => {
    // Función recursiva para extraer texto de un componente React
    const extractText = (node) => {
      if (typeof node === 'string') {
        return node;
      } else if (Array.isArray(node)) {
        return node.map(extractText).join('');
      } else if (node && node.props && node.props.children) {
        return extractText(node.props.children);
      } else {
        return '';
      }
    };
  
    // Obtén el texto del componente 
    const codeText = extractText(children); 
  
    navigator.clipboard.writeText(codeText);
    console.log('COPIADO');
    setButtonText('Copiado');
    setIsCopied(true);
  
    setTimeout(() => {
      setButtonText('Copia');
      setIsCopied(false); 
    }, 2000);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <pre className={className}>
        {isHovered && (
          <button
            onClick={handleCopy}
            className="absolute top-0.5 right-0.5 font-onest text-sm bg-gray-700 text-white rounded p-1 m-1 flex items-center"
          >
            {isCopied ? (
              <ClipboardCheck className="size-5" /> // Ícono de verificación
            ) : (
              <Clipboard className="size-5" /> // Ícono de copiar
            )}
            {buttonText}
          </button>
        )}
        <code>
          {children}
        </code>
      </pre>
    </div>
  );
};

const MarkdownViewer = ({ text }) => {
  return (
    <div className="markdown-container text-base text-pretty">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: PreBlock // Usa el nuevo componente CodeBlock aquí
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
