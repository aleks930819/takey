import Spinner from '@/components/ui/spinner';

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner color="primary" size="md" />
    </div>
  );
};

export default LoadingScreen;
