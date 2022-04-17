import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider, PostsProvider } from "./frontend/context/index-context";
import { BrowserRouter as Router} from "react-router-dom"

// Call make Server
makeServer();

const root = ReactDOMClient.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
  
);
