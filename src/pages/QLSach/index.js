import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookComponent from '../../components/BookComponent';
import useBooks from '../../hooks/useBooks';

function QLSach() {
  const { books, addBook, editBook, deleteBook, error, loading } = useBooks();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sách</h2>
      <div className="card">
        <div className="card-body">
          <BookComponent
            books={books}
            onAdd={addBook}
            onEdit={editBook}
            onDelete={deleteBook}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default QLSach;