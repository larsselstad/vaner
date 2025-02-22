import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Authenticator } from '@aws-amplify/ui-react';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Authenticator hideSignUp>
                <App />
            </Authenticator>
        </React.StrictMode>
    );
}
