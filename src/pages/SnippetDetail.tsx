import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SubtleBackground } from '@/components/SubtleBackground';
import { SnippetDetailLayout } from '@/components/SnippetDetailLayout';
import { mockSnippets } from '@/data/mockData';

const SnippetDetail = () => {
  const { id } = useParams<{ id: string }>();

  const snippet = useMemo(() => {
    return mockSnippets.find(s => s.id === id);
  }, [id]);

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
