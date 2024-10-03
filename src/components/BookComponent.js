import React, { useState } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';

function BookComponent({ books, onAdd, onEdit, onDelete, error, loading }) {
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBook({});
    setIsEditing(false);
    setLocalError(null);
  };

  const handleShowModal = (book = {}) => {
    setCurrentBook(book);
    setIsEditing(!!book.book_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    try {
      if (isEditing) {
        await onEdit(currentBook);
      } else {
        await onAdd(currentBook);
      }
      handleCloseModal();
    } catch (err) {
      setLocalError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => handleShowModal()} className="mb-3">
        Thêm sách
      </Button>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Nhà xuất bản</th>
              <th>Giá</th>
              <th>Năm xuất bản</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.price}</td>
                <td>{book.publication_year}</td>
                <td>{book.quantity}</td>
                <td>{book.is_available ? 'Có sẵn' : 'Không có sẵn'}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShowModal(book)} className="me-2">
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(book.book_id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Sửa sách' : 'Thêm sách'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {localError && <Alert variant="danger">{localError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.title || ''}
                onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.author || ''}
                onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.publisher || ''}
                onChange={(e) => setCurrentBook({ ...currentBook, publisher: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={currentBook.price || ''}
                onChange={(e) => setCurrentBook({ ...currentBook, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Năm xuất bản</Form.Label>
              <Form.Control
                type="number"
                value={currentBook.publication_year || ''}
                onChange={(e) => setCurrentBook({ ...currentBook, publication_year: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                value={currentBook.quantity || ''}
                onChange={(e) => setCurrentBook({ ...currentBook, quantity: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox"
                label="Có sẵn"
                checked={currentBook.is_available || false}
                onChange={(e) => setCurrentBook({ ...currentBook, is_available: e.target.checked })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : isEditing ? (
                'Cập nhật'
              ) : (
                'Thêm'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BookComponent;