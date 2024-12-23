import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/Layout';
// import Login from '@/pages/Login';
import AuthRoute from '@/components/AuthRoute'
// import Article from '@/pages/Article';
// import Home from '@/pages/Home';
// import Publish from '@/pages/Publish';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        path: '/',
        // 用<Suspense>标签包裹
        element: <Suspense fallback={"加载中..."}><Home/></Suspense> 
        
      },
      {
        path: '/publish',
        element: <Suspense fallback={"加载中..."}><Publish/></Suspense> 
      },
      {
        path: '/article',
        element: <Suspense fallback={"加载中..."}><Article/></Suspense> 
      },
      
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router;