import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookBorrowComponent from '../../components/BookBorrowComponent';
import useBookBorrowOrders from '../../hooks/useBookBorrowOrders';

function QLMuonTra() {
  const { borrowOrders, addBorrowOrder, editBorrowOrder, deleteBorrowOrder, returnBook, error, loading } = useBookBorrowOrders();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Mượn trả</h2>
      <div className="card">
        <div className="card-body">
          <BookBorrowComponent
            borrowOrders={borrowOrders}
            onAdd={addBorrowOrder}
            onEdit={editBorrowOrder}
            onDelete={deleteBorrowOrder}
            onReturnBook={returnBook}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default QLMuonTra;