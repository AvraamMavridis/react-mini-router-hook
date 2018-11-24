import React, { createElement, Children, useState, useEffect } from 'react';
import routeBuild from './routeBuild';

const routes = {};

function Route() {}

function normalizeRoute(path, parent) {
  if (!path) return parent ? parent.route : '/';
  if (path[0] === '/') return path;
  if (parent == null) return path;
  return `${ parent.route }/${ path }`;
}

function RouterRender(props) {
  function addRoutes(routes, parent) {
    Children.forEach(routes, r => addRoute(r, parent));
  }

  function addRoute(el, parent) {
    const { path, component, children, ...routeProps } = el.props;

    const render = (params, renderProps) => {
      const finalProps = { ...props, ...routeProps, ...renderProps, params };
      const children = createElement(component, finalProps);
      return parent ? parent.render(params, { children }) : children;
    };

    const route = normalizeRoute(path, parent).replace(/\/\//g, '/');
    routes[route] = render;

    if (children) addRoutes(children, { route, render });
  }

  addRoutes(props.children);
  const router = routeBuild(routes);
  return router(props.location, { children: null });
}

const RouterContext = React.createContext({ path: undefined, setPath: () => null });

function Router(props) {
  const [ path, setState ] = useState(props.location);
  function setPath(p, pathTitle = '', pathState = {}) {
    window.history.pushState(pathState, pathTitle, p);
    setState(p);
  }

  function updateOnBrowserButtons() {
    if (window.location.pathname !== path) {
      setState(window.location.pathname);
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', updateOnBrowserButtons);

    return () => {
      window.removeEventListener('popstate', updateOnBrowserButtons);
    };
  });

  const contextState = { path, setPath };

  return (
    <RouterContext.Provider value={contextState}>
      <RouterRender {...props} location={path || props.location} />
    </RouterContext.Provider>
  );
}

export {
  Route,
  Router,
  RouterContext
};
