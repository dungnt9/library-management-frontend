import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/borrow-orders';

function useBookBorrowOrders() {
  const [borrowOrders, setBorrowOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBorrowOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);   // kiểu destructuring cũng tốt, thay vì response.data
      setBorrowOrders(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching borrow orders:', error);
      setError('Failed to fetch borrow orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowOrders();
  }, []);

  const apiCall = async (method, url, data = null) => {
    setLoading(true);
    try {
      const response = await axios[method](url, data);
      await fetchBorrowOrders();
      setError(null);
      return response.data;
    } catch (error) {
      console.error(`Error in ${method} operation:`, error);
      throw new Error(error.response?.data?.message || `Failed to ${method}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const addBorrowOrder = (newOrder) => {
    const orderWithReturnDates = {
      ...newOrder,        //Spread Operator: copy thuộc tính từ đối tượng newOrder vào đối tượng orderWithReturnDates.
      books: newOrder.books.map(book => ({      //xử lý thuộc tính books
        book_id: book.book_id,
        return_date: book.return_date || null
      }))
    };
    return apiCall('post', API_URL, orderWithReturnDates);
  };

  const editBorrowOrder = (updatedOrder) => {
    const formattedOrder = {               //định dạng lại dữ liệu
      reader_id: parseInt(updatedOrder.reader_id),    //chuyển string sang số nguyên
      order_date: updatedOrder.order_date,
      books: updatedOrder.books.map(book => ({
        book_id: parseInt(book.book_id),
        return_date: book.return_date || null
      }))
    };
    return apiCall('put', `${API_URL}/${updatedOrder.order_id}`, formattedOrder);
  };

  const deleteBorrowOrder = (id) => apiCall('delete', `${API_URL}/${id}`);

  const returnBook = (detailId) => apiCall('put', `${API_URL}/${detailId}/return`);

  return {
    borrowOrders,
    addBorrowOrder,
    editBorrowOrder,
    deleteBorrowOrder,
    returnBook,
    error,
    loading,
    fetchBorrowOrders
  };
}

export default useBookBorrowOrders;