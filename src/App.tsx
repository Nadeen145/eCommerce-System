import React, { useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from './components/AppHeader/Header';
import { PageLayout } from './components/Pages/PageLayout';
import { Pages } from './Constants';
import axios from 'axios';

function App() {

  const [page, setPage] = React.useState<Pages>(Pages.Login);
  const changePage = (newPage: Pages) => {
    setPage(newPage);
  }

  return (
    <div className="root">
      <PageLayout page={page} changePage={changePage} />
    </div>
  );
}

export default App;