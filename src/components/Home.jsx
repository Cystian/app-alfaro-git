// src/pages/Home.jsx
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBanner from '../components/SearchBanner';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
       <div className="mt-12">
      <SearchBanner />
      </div>
    </>
  );
};

export default Home;
