import React from 'react';

import { storiesOf } from '@storybook/react';
import ModalWindow from '../src/app/ModalWindow';

import {Provider} from 'react-redux';
import {createStore} from 'redux'; 

import reducer from '../src/app/reducers';

const store = createStore(reducer);

storiesOf('ModalWindow', module)
  .add('ModalWindow', () => (
		<Provider store={store}>
			<ModalWindow title="Структура номеров"/>
		</Provider>
		));


