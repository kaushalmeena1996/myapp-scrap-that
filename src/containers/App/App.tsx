import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Header from '../../components/Header/Header';
import Page from '../../components/Page/Page';

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Page />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
