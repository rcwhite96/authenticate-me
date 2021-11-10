import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AboutPage from './components/AboutPage'
import NotebooksList from "./components/Notebooks";
import CreateNotebook from './components/CreateNotebooks'
import EditNotebook from './components/EditNotebooks'




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SplashPage/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/notebooks">
            <NotebooksList/>
          </Route>
          <Route path='/new-notebook'>
            <CreateNotebook/>
          </Route>
          <Route path='/edit-notebook/:notebookId'>
            <EditNotebook/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
