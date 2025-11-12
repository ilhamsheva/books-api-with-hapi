const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = async (req, h) => {
    const id = nanoid(16);

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
    }

    return h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    }).code(500);
}

const getAllBooksHandler = async (req, h) => {
    const { name, reading, finished } = req.query;
    
    let filteredBooks = books;
    
    if (name) {
        filteredBooks = filteredBooks.filter(book => 
            book.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter(book => 
            book.reading === (reading === '1')
        );
    }
    
    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter(book => 
            (book.pageCount === book.readPage) === (finished === '1')
        );
    }
    
    return h.response({
        status: 'success',
        data: {
            books: filteredBooks.map(({ id, name, publisher }) => ({
                id,
                name,
                publisher
            }))
        }
    }).code(200);
};

const getDetailBookHandler = async (req, h) => {
    const { bookId } = req.params;


    const book = books.find((b) => b.id === bookId);    ;


    if (book !== undefined) {
        return h.response({
            status: 'success',
            data: {
                book,
            },
        }).code(200);   
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
};

const updateBookHandler = async (req, h) => {
    const { bookId } = req.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt: new Date().toISOString(),
    };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
}

const deleteBookHandler = async (req, h) => {
    const { bookId } = req.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    books.splice(index, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getDetailBookHandler,
    updateBookHandler,
    deleteBookHandler,
};