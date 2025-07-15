import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider }from "@apollo/client"

const client = new ApolloClient ({
  url: "http://localhost:8000/",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render (
  <StrictMode>
    <ApolloClient client = { client } >
      <App />
    </ApolloClient>
  </StrictMode>,
)


