import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';

function App() {
  return (
    <>
      <Layout>
        <Routes />
      </Layout>
      <Toaster />
    </>
  );
}

export default App;