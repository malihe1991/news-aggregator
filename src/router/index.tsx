import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import routeConfig, { TRoute } from './route-config';

function generateRoutes(routes: TRoute[]) {
  return routes.map((route: TRoute) => {
    const Component = route.component;

    return (
      <Route path={route.path} element={<Component />} key={route.path}>
        {route.children?.length ? generateRoutes(route.children) : null}
      </Route>
    );
  });
}

const Router = () => {
  const routes = useMemo(() => generateRoutes(routeConfig), []);

  return <Routes>{routes}</Routes>;
};

export default Router;
