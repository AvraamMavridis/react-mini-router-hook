import React, { useState, useEffect } from 'react';
import RenderRoute from './routeBuild';

const RouterContext = React.createContext({ path: undefined, setPath: () => null });

function Route(props) {
  const { path, location } = React.useContext(RouterContext);
  return RenderRoute(props.component || props.children, props.path, path, location)
}

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

  const contextState = { path, setPath, location: props.location };

  return (
    <RouterContext.Provider value={contextState}>
      {props.children}
    </RouterContext.Provider>
  );
}

function Link(props) {
  const { setPath } = React.useContext(RouterContext)

  return <a onClick={() => setPath(props.to)} {...props} />
}

export {
  Route,
  Router,
  RouterContext,
  Link
};
