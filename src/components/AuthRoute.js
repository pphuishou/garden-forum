// 如果没有token则跳到login页。
import tokenPersistence from '@/utils/token';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({children}) => {
  const token = tokenPersistence.getToken();
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}

export default AuthRoute;