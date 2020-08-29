import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainQuotesPage from './containers/MainQuotesPage/MainQuotesPage';
import HeaderNavigation from './components/HeaderNavigation/HeaderNavigation';
import AddQuote from './containers/AddQuote/AddQuote';
import CategoryQuotePage from './containers/CategoryQuotePage/CategoryQuotePage';
import EditQuote from './containers/EditQuote/EditQuote';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderNavigation />
        <Switch>
          <Route path="/quotes/addNewQuote/" component={AddQuote} />
          <Route path="/quotes/categories/all/:id/:fireBaseId/edit/" component={EditQuote} />
          <Route path="/quotes/categories/all/:id/" component={CategoryQuotePage} />
          <Route path="/quotes/categories/all/" exact component={MainQuotesPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
