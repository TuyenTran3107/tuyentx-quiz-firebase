import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createStore } from 'redux'
import allReducers from './reducers/allReducers.ts'
import { Provider } from 'react-redux'

const store = createStore(allReducers);
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
