import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DataProvider } from './DataContext'; // Import the DataProvider
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        {/* Wrap your App with the DataProvider */}
        <DataProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DataProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
