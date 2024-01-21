import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetAlbums from "./components/GetAlbums";
import UserProfilePage from "./components/UserProfilePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AlbumDetails from "./components/AlbumDetails/AlbumDetails";
import CreateAlbumForm from "./components/AlbumForms/CreateAlbumForm";
import EditAlbumForm from "./components/AlbumForms/EditAlbumForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={GetAlbums} />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path='/current' component={UserProfilePage} />
          <Route path="/albums/new" component={CreateAlbumForm} />
          <Route exact path="/albums/:albumId" component={AlbumDetails} />
          <Route exact path="/albums/:albumId/edit" component={EditAlbumForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
