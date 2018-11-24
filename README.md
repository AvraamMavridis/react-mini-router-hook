# react-mini-router-hook

Mini Router for React based on Hooks and Context.


### Declare your Routes

```js
import { Router, Route } from "react-mini-router-hook";

export default function App() {
  return (
  <Router location={window.location.pathname}>
    <Route path="/" component={Home} />
    <Route path="/users/:id" component={Users} />
  </Router>);
}
```

### Change route from a component

```js
import { RouterContext } from 'react-mini-router-hook';

export default function NavBar() {
  const { setPath } = React.useContext(RouterContext);

  return (
    <ul>
      <li onClick={() => setPath('/users/1')}>Menu Item 1</li>
      <li onClick={() => setPath('/users/2')}>Menu Item 1</li>
  <ul>);
}
```

### Get current path

```js
import { RouterContext } from 'react-mini-router-hook';

export default function Helmet() {
  const { path } = React.useContext(RouterContext);

  return (<title>{path}</title>);
}
```
