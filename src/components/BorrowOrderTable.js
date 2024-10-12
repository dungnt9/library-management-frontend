import React from 'react';
import { Table, Button } from 'react-bootstrap';

function BorrowOrderTable({ borrowOrders, loading, onView, onEdit, onReturn, onDelete }) {
  if (loading) {
    return (
      <div className="text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
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
              <Button variant="info" onClick={() => onView(order)} className="me-2">
                Xem chi tiết
              </Button>
              <Button variant="warning" onClick={() => onEdit(order)} className="me-2">
                Sửa
              </Button>
              <Button variant="success" onClick={() => onReturn(order)} className="me-2">
                Trả sách
              </Button>
              <Button variant="danger" onClick={() => onDelete(order.order_id)}>
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BorrowOrderTable;