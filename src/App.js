import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import User from "./components/user-component/User";
import Header from "./Header";
import Menu from "./Menu";
import NotFound from "./components/not-found/not-found";
function App() {
  return (

      <Router>
          <div className="Wrapper">
              <Menu />
              <Header/>
              <Switch>
                  <Route exact path="/user">
                      <User/>
                  </Route>
                  <Route exact path="/">
                      <User/>
                  </Route>
                  <Route exact path="*">
                      <NotFound/>
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
