import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function BookBorrowComponent({ borrowOrders, onAdd, onEdit, onDelete, onReturnBook, error, loading }) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([{ book_id: '', return_date: '' }]);
  const [formData, setFormData] = useState({
    reader_id: '',
    order_date: new Date().toISOString().split('T')[0],
    books: []
  });
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
    setSelectedBooks([{ book_id: '', return_date: '' }]);
    setFormData({
      reader_id: '',
      order_date: new Date().toISOString().split('T')[0],
      books: []
    });
    setMode('add');
  };


  const handleShowModal = (order = null, mode = 'add') => {
    setMode(mode);
    setCurrentOrder(order);
    if (order) {
      // Format dates and set initial form data for editing
      const formattedDetailedOrders = order.detailed_borrow_orders.map(detail => ({
        book_id: detail.book_id.toString(),
        return_date: detail.return_date ? new Date(detail.return_date).toISOString().split('T')[0] : null
      }));
  
      setFormData({
        reader_id: order.reader_id.toString(),
        order_date: new Date(order.order_date).toISOString().split('T')[0],
        books: formattedDetailedOrders
      });
      setSelectedBooks(formattedDetailedOrders);
    } else {
      // Reset form for new order
      setFormData({
        reader_id: '',
        order_date: new Date().toISOString().split('T')[0],
        books: []
      });
      setSelectedBooks([{ book_id: '', return_date: null }]);
    }
    setShowModal(true);
  };

  const handleAddBookField = () => {
    setSelectedBooks([...selectedBooks, { book_id: '', return_date: '' }]);
  };

  const handleRemoveBookField = (index) => {
    const updatedBooks = selectedBooks.filter((_, i) => i !== index);
    setSelectedBooks(updatedBooks);
  };

  const handleBookSelect = (bookId, index) => {
    const updatedSelectedBooks = [...selectedBooks];
    updatedSelectedBooks[index] = { ...updatedSelectedBooks[index], book_id: bookId };
    setSelectedBooks(updatedSelectedBooks);
  };

  const handleReturnDateChange = (date, index) => {
    const updatedSelectedBooks = [...selectedBooks];
    updatedSelectedBooks[index] = { ...updatedSelectedBooks[index], return_date: date };
    setSelectedBooks(updatedSelectedBooks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.reader_id) {
        throw new Error('Vui lòng chọn bạn đọc');
      }
      
      if (!formData.order_date) {
        throw new Error('Vui lòng chọn ngày mượn');
      }
      
      if (selectedBooks.length === 0) {
        throw new Error('Vui lòng thêm ít nhất một cuốn sách');
      }
      
      const invalidBooks = selectedBooks.filter(book => !book.book_id);
      if (invalidBooks.length > 0) {
        throw new Error('Vui lòng chọn sách');
      }
  
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

  const handleReturnBook = async (detailId) => {
    try {
      await onReturnBook(detailId);
      handleCloseModal();
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setDeleteMessage('Xóa thành công');
      setTimeout(() => setDeleteMessage(''), 3000); // Ẩn thông báo sau 3 giây
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
      
      {loading ? (
        <div className="text-center">
          <h3>Loading...</h3>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Tên bạn đọc</th>
              <th>Ngày mượn</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {borrowOrders.map((order, index) => (
              <tr key={order.order_id}>
                <td>{index + 1}</td>
                <td>{order.order_id}</td>
                <td>{order.reader?.name}</td>
                <td>{order.order_date ? new Date(order.order_date).toLocaleDateString() : ''}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowModal(order, 'view')} className="me-2">
                    Xem chi tiết
                  </Button>
                  <Button variant="warning" onClick={() => handleShowModal(order, 'edit')} className="me-2">
                    Sửa
                  </Button>
                  <Button variant="success" onClick={() => handleShowModal(order, 'return')} className="me-2">
                    Trả sách
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(order.order_id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === 'view' ? 'Chi tiết đơn mượn' : 
             mode === 'edit' ? 'Sửa đơn mượn' : 
             mode === 'return' ? 'Trả sách' : 'Thêm đơn mượn sách'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {localError && <Alert variant="danger">{localError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Bạn đọc</Form.Label>
              <Form.Select
                required
                value={formData.reader_id}
                onChange={(e) => setFormData({ ...formData, reader_id: e.target.value })}
                disabled={mode === 'view' || mode === 'return'}
              >
                <option value="">Chọn bạn đọc</option>
                {readers.map(reader => (
                  <option key={reader.reader_id} value={reader.reader_id}>
                    {reader.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày mượn</Form.Label>
              <Form.Control
                type="date"
                value={formData.order_date}
                onChange={(e) => setFormData({ ...formData, order_date: e.target.value })}
                disabled={mode === 'view' || mode === 'return'}
              />
            </Form.Group>

            {mode === 'return' ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tên sách</th>
                    <th>Ngày trả</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrder.detailed_borrow_orders.map((detail) => (
                    <tr key={detail.detail_id}>
                      <td>{books.find(book => book.book_id === detail.book_id)?.title}</td>
                      <td>{detail.return_date ? new Date(detail.return_date).toLocaleDateString() : 'Chưa trả'}</td>
                      <td>
                        {!detail.return_date && (
                          <Button variant="primary" onClick={() => handleReturnBook(detail.detail_id)}>
                            Trả sách
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="mb-3">
                <label className="form-label">Sách mượn</label>
                {selectedBooks.map((book, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Select
                      required
                      value={book.book_id}
                      onChange={(e) => handleBookSelect(e.target.value, index)}
                      className="me-2"
                      disabled={mode === 'view'}
                    >
                      <option value="">Chọn sách</option>
                      {books.map(book => (
                        <option key={book.book_id} value={book.book_id}>
                          {book.title}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control
                      type="date"
                      value={book.return_date}
                      onChange={(e) => handleReturnDateChange(e.target.value, index)}
                      className="me-2"
                      disabled={mode === 'view'}
                    />
                    {mode !== 'view' && (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveBookField(index)}
                        disabled={selectedBooks.length === 1}
                      >
                        -
                      </Button>
                    )}
                  </div>
                ))}
                {mode !== 'view' && (
                  <Button variant="secondary" onClick={handleAddBookField}>
                    + Thêm sách
                  </Button>
                )}
              </div>
            )}

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Đóng
              </Button>
              {(mode === 'add' || mode === 'edit') && (
                <Button variant="primary" type="submit">
                  {mode === 'edit' ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default BookBorrowComponent;