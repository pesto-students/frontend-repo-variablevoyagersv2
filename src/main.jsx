import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import * as Sentry from '@sentry/react';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// Sentry.init({
// 	dsn: 'https://9b1222762237625da8be02f53c80bc93@o4507465140731904.ingest.us.sentry.io/4507465142632448',
// 	integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
// 	// Performance Monitoring
// 	tracesSampleRate: 1.0, //  Capture 100% of the transactions
// 	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
// 	tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
// 	// Session Replay
// 	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
// 	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<React.StrictMode>
			<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
				<App />
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					transition:Bounce
				/>
			</GoogleOAuthProvider>
		</React.StrictMode>
	</Provider>,
);
