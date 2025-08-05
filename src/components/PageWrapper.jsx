// src/components/PageWrapper.jsx
import { useEffect, useState } from 'react';

const PageWrapper = ({ children }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`page-transition ${active ? 'page-transition-active' : ''}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
