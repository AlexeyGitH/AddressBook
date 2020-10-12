
import React, { Suspense }   from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

const Dashboards = React.lazy(() => import('./components/Dashboards.jsx'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Загрузка...</div>}>
      <Dashboards />
    </Suspense>  
  </Provider>,
  document.getElementById('react-app')
)

