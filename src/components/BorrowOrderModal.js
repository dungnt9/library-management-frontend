import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Table } from 'react-bootstrap';

function BorrowOrderModal({ show, onHide, mode, currentOrder, readers, books, onSubmit, onReturnBook, error }) {
  const [formData, setFormData] = useState({
    reader_id: '',
    order_date: new Date().toISOString().split('T')[0],
    books: []
  });
  const [selectedBooks, setSelectedBooks] = useState([{ book_id: '', return_date: '' }]);

  useEffect(() => {
    if (currentOrder && (mode === 'edit' || mode === 'view')) {
      setFormData({
        reader_id: currentOrder.reader_id,
        order_date: currentOrder.order_date,
        books: currentOrder.detailed_borrow_orders
      });
      setSelectedBooks(currentOrder.detailed_borrow_orders);
    } else {
      setFormData({
        reader_id: '',
        order_date: new Date().toISOString().split('T')[0],
        books: []
      });
      setSelectedBooks([{ book_id: '', return_date: '' }]);
    }
  }, [currentOrder, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, selectedBooks);
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

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'view' ? 'Chi tiết đơn mượn' : 
           mode === 'edit' ? 'Sửa đơn mượn' : 
           mode === 'return' ? 'Trả sách' : 'Thêm đơn mượn sách'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

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
                        <Button variant="primary" onClick={() => onReturnBook(detail.detail_id)}>
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
            <Button variant="secondary" onClick={onHide} className="me-2">
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
  );
}

export default BorrowOrderModal;