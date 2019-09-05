import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
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
