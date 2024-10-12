import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import BorrowOrderTable from './BorrowOrderTable';
import BorrowOrderModal from './BorrowOrderModal';

function BookBorrowComponent({ borrowOrders, onAdd, onEdit, onDelete, onReturnBook, error, loading }) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);
  const [mode, setMode] = useState('add');

  useEffect(() => {
    fetchReaders();
    fetchBooks();
  }, []);

  const fetchReaders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/readers');
      setReaders(response.data);
    } catch (err) {
      setLocalError('Failed to fetch readers');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
    } catch (err) {
      setLocalError('Failed to fetch books');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentOrder(null);
    setLocalError(null);
    setMode('add');
  };

  const handleShowModal = (order = null, mode = 'add') => {
    setMode(mode);
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleSubmit = async (formData, selectedBooks) => {
    try {
      if (!formData.reader_id) {throw new Error('Vui lòng chọn bạn đọc');}
      if (!formData.order_date) {throw new Error('Vui lòng chọn ngày mượn');}
      if (selectedBooks.length === 0) {throw new Error('Vui lòng thêm ít nhất một cuốn sách');}
      const invalidBooks = selectedBooks.filter(book => !book.book_id);
      if (invalidBooks.length > 0) {throw new Error('Vui lòng chọn sách');}
  
      const orderData = {
        reader_id: parseInt(formData.reader_id),
        order_date: formData.order_date,
        books: selectedBooks.map(book => ({
          book_id: parseInt(book.book_id),
          return_date: book.return_date || null
        }))
      };
  
      if (mode === 'edit' && currentOrder) {
        const editData = {
          ...orderData,
          order_id: currentOrder.order_id
        };
        await onEdit(editData);
      } else {
        await onAdd(orderData);
      }
      handleCloseModal();
    } catch (err) {
      setLocalError(err.message);
    }
  };  

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setDeleteMessage('Xóa thành công');
      setTimeout(() => setDeleteMessage(''), 5000);
    } catch (error) {
      setDeleteMessage('Xóa không thành công: ' + error.message);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => handleShowModal(null, 'add')} className="mb-3">
        Thêm đơn mượn sách
      </Button>

      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
      
      <BorrowOrderTable 
        borrowOrders={borrowOrders}
        loading={loading}
        onView={(order) => handleShowModal(order, 'view')}
        onEdit={(order) => handleShowModal(order, 'edit')}
        onReturn={(order) => handleShowModal(order, 'return')}
        onDelete={handleDelete}
      />

      <BorrowOrderModal
        show={showModal}
        onHide={handleCloseModal}
        mode={mode}
        currentOrder={currentOrder}
        readers={readers}
        books={books}
        onSubmit={handleSubmit}
        onReturnBook={onReturnBook}
        error={localError}
      />
    </>
  );
}

export default BookBorrowComponent;