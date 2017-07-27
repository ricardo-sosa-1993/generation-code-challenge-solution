import "./style/css/index.css";
import "./style/css/bootstrap.css";
import "./style/css/bootstrap-theme.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
