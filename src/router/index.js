import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import AuthRoute from '@/components/AuthRoute'
import Article from '@/pages/Article';
import Home from '@/pages/Home';
import Publish from '@/pages/Publish';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        path: '/',
        element: <Home/>
        
      },
      {
        path: '/publish',
        element: <Publish/>
      },
      {
        path: '/article',
        element: <Article/>
      },
      
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router;