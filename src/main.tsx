import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Authenticator } from '@aws-amplify/ui-react';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Authenticator>
                <App />
            </Authenticator>
        </React.StrictMode>
    );
}
