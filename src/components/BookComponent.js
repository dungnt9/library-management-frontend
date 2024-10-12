import React, { useState } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';

function BookComponent({ books, onAdd, onEdit, onDelete, error, loading }) {
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBook({});
    setIsEditing(false);
    setLocalError(null);
  };

  const handleShowModal = (book = {}) => {
    setCurrentBook(book);
    setIsEditing(!!book.book_id); //nếu có thì set(true)
    setShowModal(true);
  };

  const handleSubmit = async (e) => {  // e là tham số cho sự kiện event, được kích hoạt khi gửi form
    e.preventDefault(); // ngăn trang web reload, tránh mất state hiện tại
    setLocalError(null);
    try {
      if (isEditing) {
        await onEdit(currentBook);      //thông qua hook useBooks
      } else {
        await onAdd(currentBook);
      }
      handleCloseModal();
    } catch (err) {
      setLocalError(err.message || 'An error occurred. Please try again.');
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

      <Button variant="primary" onClick={() => handleShowModal()} className="mb-3">
        Thêm sách
      </Button>

      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}   {/*deleteMessage có giá trị truthy (tức là không phải null, undefined, hay chuỗi rỗng)*/}
      
      {loading ? (
        <div className="text-center">
          <h3>Loading...</h3>
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
                  <Button variant="warning" onClick={() => handleShowModal(book)} className="me-2"> {/*margin-end: thêm khoảng cách bên phải*/}
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(book.book_id)}>
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
                // giữ nguyên các thuộc tính hiện tại của currentBook và  cập nhật thuộc tính title với giá trị mới từ input
                required
                // thuộc tính của input, yêu cầu phải nhập.
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
              {isEditing ? (
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