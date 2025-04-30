import React from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  // Redirect to About page as the main landing page
  return <Navigate to="/about" replace />;
}

export default Home; 