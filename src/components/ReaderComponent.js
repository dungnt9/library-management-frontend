import React, { useState } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';

function ReaderComponent({ readers, onAdd, onEdit, onDelete, error, loading }) {
  const [showModal, setShowModal] = useState(false);
  const [currentReader, setCurrentReader] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentReader({});
    setIsEditing(false);
    setLocalError(null);
  };

  const handleShowModal = (reader = {}) => {
    setCurrentReader(reader);
    setIsEditing(!!reader.reader_id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    try {
      if (isEditing) {
        await onEdit(currentReader);
      } else {
        await onAdd(currentReader);
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
        Thêm bạn đọc
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
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {readers.map((reader) => (
              <tr key={reader.reader_id}>
                <td>{reader.reader_id}</td>
                <td>{reader.name}</td>
                <td>{reader.email}</td>
                <td>{reader.phone_number}</td>
                <td>{reader.address}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShowModal(reader)} className="me-2">
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(reader.reader_id)}>
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
          <Modal.Title>{isEditing ? 'Sửa bạn đọc' : 'Thêm bạn đọc'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {localError && <Alert variant="danger">{localError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={currentReader.name || ''}
                onChange={(e) => setCurrentReader({ ...currentReader, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentReader.email || ''}
                onChange={(e) => setCurrentReader({ ...currentReader, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                value={currentReader.phone_number || ''}
                onChange={(e) => setCurrentReader({ ...currentReader, phone_number: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentReader.address || ''}
                onChange={(e) => setCurrentReader({ ...currentReader, address: e.target.value })}
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

export default ReaderComponent;