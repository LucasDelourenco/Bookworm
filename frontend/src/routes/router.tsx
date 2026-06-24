import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import MoreSearchPage from "../pages/MoreSeachPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <Navigate to="/home" replace />},
            {path: "home", element: <HomePage />},
            {path: "more-searched", element: <MoreSearchPage />},
            {path: "search", element: <SearchPage />},

        ]
    }
])
export default router;