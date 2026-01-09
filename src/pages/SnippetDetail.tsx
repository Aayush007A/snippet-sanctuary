import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { SnippetDetailLayout } from '@/components/SnippetDetailLayout';
// import { mockSnippets } from '@/data/mockData';
import { useSnippets } from '@/context/SnippetContext';

const SnippetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getSnippetById } = useSnippets();

  const snippet = useMemo(() => {
    return getSnippetById(id || '');
  }, [id, getSnippetById]);

  if (!snippet) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <SubtleBackground />
      <Navbar />
      <SnippetDetailLayout snippet={snippet} />
    </div>
  );
};

export default SnippetDetail;
