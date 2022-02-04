import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NotebooksList from "./components/Notebooks";
import CreateNotebook from './components/CreateNotebooks'
import EditNotebook from './components/EditNotebooks'
import NotesList from "./components/Notes";
import CreateNote from "./components/CreateNotes"
import EditNote from "./components/EditNotes"
import OneNotebookPage from "./components/OneNotebook/OneNotebook"
import SearchResults from "./components/SearchResults/SearchResults";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";

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
            <Footer/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
            <Footer/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
            <Footer/>
          </Route>
          <Route path="/notebooks" exact={true}>
            <NotebooksList/>
            <Footer/>
          </Route>
          <Route path= '/notebooks/:id' exact={true}>
            <OneNotebookPage/>
            <Footer/>
          </Route>
          <Route path='/new-notebook'>
            <CreateNotebook/>
            <Footer/>
          </Route>
          <Route path='/edit-notebook/:notebookId'>
            <EditNotebook/>
            <Footer/>
          </Route>
          <Route path= '/notes'>
            <NotesList/>
            <Footer/>
          </Route>
          <Route path= '/new-note'>
            <CreateNote/>
            <Footer/>
          </Route>
          <Route path= '/edit-note/:noteId'>
            <EditNote/>
            <Footer/>
          </Route>
          <Route path= '/profile' exact={true}>
            <ProfilePage/>
            <Footer/>
          </Route>
          <Route path= '/edit-profile' exact={true}>
            <EditProfilePage/>
            <Footer/>
          </Route>
          <Route path= '/search/:searchTerm' exact={true}>
            <SearchResults/>
            <Footer/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
