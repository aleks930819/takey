import { Spinner } from '@/components/ui';

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner color="primary" size="md" />
    </div>
  );
};

export default Loading;
