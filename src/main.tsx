import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@/components/theme-provider'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css'
import '@/index.css'
import App from '@/App'
import { persistor, store } from '@/store/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { SelectionProvider } from '@/context/SelectionContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <SelectionProvider>
            <App />
            {/* <ToastContainer /> */}
          </SelectionProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)