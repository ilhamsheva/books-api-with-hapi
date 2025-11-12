import { addBookHandler, deleteBookHandler, getAllBooksHandler, getDetailBookHandler, updateBookHandler } from "./handler.js";

export const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },

    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBookHandler,
    },

    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler,
    },

    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler,
    }
];