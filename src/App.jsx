import { RouterProvider } from 'react-router-dom';
import './App.css';

import { router } from './routes/router';

import useCurrentUser from './hooks/useCurrentUser';

function App() {
	useCurrentUser();

	return <RouterProvider router={router} />;
}

export default App;
