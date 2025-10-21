import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <main className=""> {/* Padding untuk navbar fixed */}
        <Outlet /> {/* Tempat halaman aktif dirender */}
      </main>
    </div>
  );
};

export default App;