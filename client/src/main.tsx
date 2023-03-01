import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css"
import UserProvider from './contexts/UserContext'
import ItemProvider from './contexts/ItemContext'
import ShoppingCartProvider from './contexts/ShoppingCartContext'
import './styles/index.css'
import ButtonProvider from './contexts/ButtonContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ButtonProvider>
        <UserProvider>
          <ItemProvider>
            <ShoppingCartProvider>
              <App />
            </ShoppingCartProvider>
          </ItemProvider>
        </UserProvider>
      </ButtonProvider>
  </React.StrictMode>,
)