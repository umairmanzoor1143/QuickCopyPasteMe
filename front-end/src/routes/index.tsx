import { HTMLAttributes, Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { privateRoutes } from './PrivateRoutes';
import { publicRoutes } from './PublicRoutes';

export function Loadable<T>(
  Component: React.ComponentType<any>
) {
  return (props: HTMLAttributes<T> & { [key: string]: any }) => (
    <Suspense fallback={ <div></div>}>
      <Component {...props} />
    </Suspense>
  );
}

const Index = () => {
  const publicElement = useRoutes([
    ...publicRoutes,
    ...privateRoutes,
    {
      path: '*',
      element: <div>Not Found</div>,
    },
  ]);
  return (
    <div className='main-container-wrapper h-100' id='main-container-wrapper'>
      {publicElement}
    </div>
  );
};

export default Index;
