import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');

//Starting point for the front-end
//Since we only have one page no need to use routes here
ReactDOM.render((
	<App />
), rootElement);