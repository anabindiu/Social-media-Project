import { Navigate,Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Task_List from "./pages/Task_List";
import Settings from "./pages/Settings";
import Note_app from "./pages/Notes";
import Features from "./pages/Features";
import Calendar from "./pages/Calendar"
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import "./App.css";

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <Welcome/> : <Navigate to="/login" />,
    children: [
      { path: '/profile', element: <Profile /> },
      { path: '/features', element: <Features /> },

      { path: '/settings', element: <Settings /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/notes', element: <Note_app /> },
      { path: '/taskList', element: <Task_List /> },

      { path: '/', element: <Navigate to="/" /> },
      
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <Login /> : <Navigate to="/profile" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;