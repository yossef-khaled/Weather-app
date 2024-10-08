import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import CityWeather from './pages/city-weather';
import App from './App.tsx';
import Home from './pages/home/index.tsx';
import ErrorPage from './pages/error/index.tsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/cities/:cityName",
        element: <CityWeather />,
      },
      {
        path: "/",
        element: <Home/>,
      }
    ],
    errorElement: <ErrorPage/>
  },
  {

  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
