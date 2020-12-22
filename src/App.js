import Login from './container/Login/Login.page';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const App = () => {
  return (
    <>
        <Router>
          <Switch>
              <Route exact path="/" component={Login} />
          </Switch>
        </Router>
    </>
  );
}

export default App;
