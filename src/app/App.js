import React, {} from 'react';
import './App.css';
import ContextWrapper from '../ContextWrapper';
import RouterPaths from './RouterPaths';



function App() {
  document.title = "WorkShop";

  return (
    <ContextWrapper>
      <RouterPaths />
      {/* <Router>
        <div className="App">
          <Navingation />
          <div className="Container">
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/post" component={Input} />
              <Route path="/search" component={SearchPage} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/regval" component={RegisterFormValidation} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
              <Route path="/user/:id" component={SpecificUser} />
              <Route path="/addBook" component={AddBook} />
              <Route path="/books" component={Books} />
              <Route path="/details/:id" component={Deatils} />
              <Route path="/favoriteBooks" component={FavoriteBooks} />
              <Route path="/genres/:type" component={GenresView} />
              <Route path="/author/:type" component={AuthorsView} />
              <Route path="/publisher/:type" component={PublishersView} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
          <Aside />
          <Footer />
        </div>
      </Router> */}
    </ContextWrapper>
  );
}

export default App;
