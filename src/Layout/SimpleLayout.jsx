import Footer from '../components/Footer';

const SimpleLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default SimpleLayout;
