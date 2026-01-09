import { useParams, useNavigate } from 'react-router-dom';
import { SubtleBackground } from '@/components/SubtleBackground';
import { WorkbenchLayout } from '@/components/WorkbenchLayout';
import { useSnippets } from '@/context/SnippetContext';

const SnippetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSnippetById } = useSnippets();

  const snippet = getSnippetById(id || '');

  if (!snippet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Snippet Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <SubtleBackground />
      <div className="relative z-10">
        <WorkbenchLayout snippet={snippet} />
      </div>
    </div>
  );
};

export default SnippetDetail;
