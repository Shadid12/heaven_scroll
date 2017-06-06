import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// components
import Home from './components/Home';
import MixTape from './components/MixTape'

// router libraries
import { Route, Router, IndexRoute, browserHistory }  from 'react-router';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Home} />
		<Route path="/mix" component={MixTape} />
	</Router>, 
	document.getElementById('root'));
registerServiceWorker();
