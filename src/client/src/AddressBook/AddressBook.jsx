import React, { Suspense }  from 'react';
import ReactDom from 'react-dom';

const NavBarAppComponent = React.lazy(() => import('./NavBar.jsx'));
const SearchBoxComponent = React.lazy(() => import('./SearchBox.jsx'));

const Settings = require('./settings/settings.json');

class MainPage extends React.Component  {

render() {

  return (  

    <div>
      <Suspense fallback={<div>Загрузка...</div>}>
        <section>
          <NavBarAppComponent CorpName = {Settings.CorporationName}/>
          <SearchBoxComponent className="container-fluid"/>
        </section>
      </Suspense>
    </div>
  )
 }  
}

ReactDom.render(<MainPage/>, document.getElementById('react-app'));



