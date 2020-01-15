import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

import booksReducer from './src/store/reducers/Books'
import authReducer from './src/store/reducers/Auth'
import NavigatorContainer from './src/NavigatorContainer';


const reducers = combineReducers({
  Books: booksReducer,
  Auth: authReducer
})

const store = createStore(reducers, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={ fetchFonts }
        onFinish={ () => {
          setFontLoaded(true);
        } }
      />
    );
  }
  return (
    <Provider store={ store }>
      <NavigatorContainer />
    </Provider>

  );
}
