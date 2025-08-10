import { createBrowserRouter } from "react-router";
import HomeLayout from '../LayOuts/HomeLayout';
import Home from '../Pages/Home';
import AllBooks from '../Pages/AllBooks';
import AddBook from '../Pages/AddBook';
import BorrowBook from '../Pages/BorrowBook';
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import CategoryDetails from "../Pages/CategoryDetails";
import BookDetails from "../Pages/BookDetails";
import NotFound from "../Pages/NotFound";
import UpdatedBook from "../Pages/UpdatedBook";
import SearchResults from "../Components/SearchResult";
import Loading from "../Components/Loading";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch("https://libri-sphere-server.vercel.app/books"),
                hydrateFallbackElement: <Loading />

            },
            {
                path: 'all-books',
                element: <PrivateRoute><AllBooks /></PrivateRoute>,
                loader: () => fetch("https://libri-sphere-server.vercel.app/books"),
                hydrateFallbackElement: <Loading />

            },
            {
                path: "/search",
                element: <SearchResults />,
                hydrateFallbackElement: <Loading />

            },
            {
                path: 'books/:category',
                element: <PrivateRoute><CategoryDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://libri-sphere-server.vercel.app/books/${params.category}`),
                hydrateFallbackElement: <Loading />

            },
            {
                path: 'books/:category/:id',
                element: <PrivateRoute><BookDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://libri-sphere-server.vercel.app/books/${params.category}/${params.id}`),
                hydrateFallbackElement: <Loading />,
            },
            {
                path: 'add-books',
                element: <PrivateRoute><AddBook /></PrivateRoute>,
            },
            {
                path: 'update-book/:id',
                element: <PrivateRoute><UpdatedBook /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://libri-sphere-server.vercel.app/books/${params.category}/${params.id}`),
                hydrateFallbackElement: <Loading />
            },
            {
                path: 'borrowed-books',
                element: <PrivateRoute><BorrowBook /></PrivateRoute>,
                loader: () => fetch('https://libri-sphere-server.vercel.app/borrowed-books'),
                hydrateFallbackElement: <Loading />
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },

        ]
    },
    {
        path: "/*",
        Component: NotFound
    }
])