import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LibraryView from './components/library/library-view';
import { Toolbar } from './components/toolbar/toolbar';

const App = <BrowserRouter>
    <Toolbar/>
    <LibraryView/>
</BrowserRouter>;

ReactDOM.render(App, document.getElementById('app'));