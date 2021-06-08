import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/NavBar";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [currentUser, setCurrentUser] = useState();

  return (
    <div>
      <Router>
        <Switch>
          <Redirect exact path="/" to="signin" />
          <Route
            path="/signin"
            exact
            render={() => <SignIn setCurrentUser={setCurrentUser}/>}
          />
          <PrivateRoute
            path="/navbar"
            exact
            component={Navbar}
            currentUser={currentUser}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
