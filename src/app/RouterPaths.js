import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Navingation from '../navigation/Navigation';
import SearchPage from '../shared/search/SearchPage';
import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import RegisterForm from '../forms/register/RegisterForm';
import LoginForm from '../forms/login/Login';
import Profile from '../profile/Profile';
import ErrorPage from '../errComponent/ErrorPage';
import { UserContext } from '../ContextWrapper';
import Logout from '../forms/logout/Logout';
import Books from '../books/Books';
import Deatils from '../books/detailsPage/Details';
import AddBook from '../books/addBook/AddBook';
import FavoriteBooks from '../books/favoriteBooks/FavoriteBooks';
import SpecificUser from '../profile/specUser/SpecificUser';
import GenresView from '../books/booksByGenres/GenresView';
import AuthorsView from '../books/booksByAuthor/AuthorsView';
import PublishersView from '../books/booksByPublisher/PublishersView';
import EditBook from '../books/editBook/EditBook';
import AllComments from '../profile/allComments/AllComments';
import SuggestBook from '../books/suggestBook/suggestBook/SuggestBook';
import ViewSuggestedBooks from '../books/suggestBook/viewSuggestedBooks/ViewSuggestedBooks';



const RouterPaths = (props) => {
  document.title = "WorkShop";
  const { user, logged } = useContext(UserContext);
  const { role } = user;
  document.title = "Books";

  return (
    <Router>
      <div className="App">
        <Navingation />
        <div className="Container">
          <Switch>
            <Route path="/" exact component={Books} />
            <Route path="/search" component={SearchPage} />
            <Route path="/register" render={(props) => logged === false ? <RegisterForm {...props} /> : <ErrorPage />} />
            <Route path="/login" render={(props) => logged === false ? <LoginForm {...props} /> : <ErrorPage />} />
            <Route path="/logout" render={(props) => logged === true ? <Logout {...props} /> : <ErrorPage />} />
            <Route path="/books" component={Books} />
            <Route path="/details/:id" component={Deatils} />
            <Route path="/profile" render={() => role !== undefined ? <Profile /> : <ErrorPage />} />
            <Route path="/allComments/:id" component={AllComments} />
            <Route path="/addBook" render={(props) => role === 'admin' ? <AddBook {...props} /> : <ErrorPage />} />
            <Route path="/editBook/:id" render={(props) => role === 'admin' ? <EditBook {...props} /> : <ErrorPage />} />
            <Route path="/suggestBook" render={(props) => role === 'user' ? <SuggestBook {...props} /> : <ErrorPage />} />
            <Route path="/viewSuggestedBooks" render={(props) => role === 'admin' ? <ViewSuggestedBooks {...props} /> : <ErrorPage />} />
            <Route path="/user/:id" component={SpecificUser} />
            <Route path="/favoriteBooks" render={() => role !== undefined ? <FavoriteBooks /> : <ErrorPage />} />
            <Route path="/genres/:type" component={GenresView} />
            <Route path="/author/:type" component={AuthorsView} />
            <Route path="/publisher/:type" component={PublishersView} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
        <Aside />
        <Footer />
      </div>
    </Router>
  );
}

export default RouterPaths;
