import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css"
import UserProvider from './contexts/UserContext'
import ItemProvider from './contexts/ItemContext'
import ShoppingCartProvider from './contexts/ShoppingCartContext'
import './styles/index.css'
import NavbarProvider from './contexts/NavbarContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavbarProvider>
      <UserProvider>
        <ItemProvider>
          <ShoppingCartProvider>
            <App />
          </ShoppingCartProvider>
        </ItemProvider>
      </UserProvider>
    </NavbarProvider>
  </React.StrictMode>,
)