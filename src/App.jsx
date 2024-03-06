import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import RegisterPage from './pages/public/RegisterPage';
import LoginPage from './pages/public/LoginPage';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';
import NotFoundPage from './pages/public/NotFoundPage';
import OwnerLayout from './layouts/OwnerLayout';
import DashboardPage from './pages/owner/DashboardPage';
import { UserContextProvider } from './hooks/UserContext';
import AddPropertyPage from './pages/owner/AddPropertyPage';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;
function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route element={<PublicLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>
				<Route element={<OwnerLayout />}>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/add-property" element={<AddPropertyPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
