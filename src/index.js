import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { PostsProvider } from "./frontend/context/index-context";
import { BrowserRouter as Router} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux store/store"

// Call make Server
makeServer();

const root = ReactDOMClient.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Router>
          <PostsProvider>
            <App />
          </PostsProvider>
      </Router>
    </Provider>
  </React.StrictMode>
  
);
