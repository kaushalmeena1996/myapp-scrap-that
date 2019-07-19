import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <Page />
      <Footer />
    </React.Fragment>
  );
}

export default App;
