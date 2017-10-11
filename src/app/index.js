import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import ModalWindow from './ModalWindow';

import {Provider} from 'react-redux';
import {createStore} from 'redux'; 


import reducer from './reducers';


const store = createStore(reducer);

ReactDOM.render(
    <div className="container">
		<Provider store={store}>
			<ModalWindow title="Структура номеров"/>
		</Provider>
    </div>,
    document.getElementById('root'));