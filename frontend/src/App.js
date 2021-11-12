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
import NotesList from "./components/Notes";
import CreateNote from "./components/CreateNotes"
import EditNote from "./components/EditNotes"
import FilteredNotes from './components/filteredNotes'


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
          <Route path="/notebooks/:notebookId">
            <FilteredNotes/>
          </Route>
          <Route path='/new-notebook'>
            <CreateNotebook/>
          </Route>
          <Route path='/edit-notebook/:notebookId'>
            <EditNotebook/>
          </Route>
          <Route path= '/notes'>
            <NotesList/>
          </Route>
          <Route path= '/new-note'>
            <CreateNote/>
          </Route>
          <Route path= '/edit-note/:notebookId'>
            <EditNote/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
