import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import Error from './pages/Error';
import Landing from './pages/Landing';
import SignIn from './components/SignIn';
import Login from "./components/Login"
import Home from "./pages/Home"
import { Toaster } from 'react-hot-toast';
import Blog from './pages/Blog';
import WriteBlog from './pages/WriteBlog';
import {Provider} from "react-redux"
import {appStore} from './redux/appStore';
import {persistor} from "./redux/appStore";
import { PersistGate } from 'redux-persist/integration/react'
import DoubtStore from './pages/DoubtStore';
import DoubtPage from './pages/DoubtPage';
import Summarizer from './pages/Summarizer';
import Profile from './pages/Profile';
// import dotenv from "dotenv";

// dotenv.config({
//   path:"../frontend/.env"
// })

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/signUp",
        element:<SignIn/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/blog/:id",
        element:<Blog/>
      },
      {
        path:"/blog/write",
        element:<WriteBlog/>
      },
      {
        path:"/doubts",
        element:<DoubtStore/>
      },
      {
        path:"/doubts/:id",
        element:<DoubtPage/>
      },
      {
        path:"/summarize",
        element:<Summarizer/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={appStore}>
  <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={appRouter}>
      <App />
      <Toaster/>
    </RouterProvider>
  </PersistGate>
</Provider>
);



