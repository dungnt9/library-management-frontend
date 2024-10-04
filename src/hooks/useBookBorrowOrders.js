import { useState, useEffect } from 'react';
import axios from 'axios';

function useBookBorrowOrders() {
  const [borrowOrders, setBorrowOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBorrowOrders();
  }, []);

  const fetchBorrowOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/borrow-orders');
      setBorrowOrders(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching borrow orders:', error);
      setError('Failed to fetch borrow orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  const addBorrowOrder = async (newOrder) => {
    setLoading(true);
    try {
      const orderWithReturnDates = {
        ...newOrder,
        books: newOrder.books.map(book => ({
          book_id: book.book_id,
          return_date: book.return_date || null // Cho phép null
        }))
      };
  
      const response = await axios.post('http://localhost:8000/api/borrow-orders', orderWithReturnDates);
      await fetchBorrowOrders();
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error adding borrow order:', error);
      throw new Error(error.response?.data?.message || 'Failed to add borrow order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const editBorrowOrder = async (updatedOrder) => {
    setLoading(true);
    try {
      const formattedOrder = {
        reader_id: parseInt(updatedOrder.reader_id),
        order_date: updatedOrder.order_date,
        books: updatedOrder.books.map(book => ({
          book_id: parseInt(book.book_id),
          return_date: book.return_date || null
        }))
      };
  
      const response = await axios.put(
        `http://localhost:8000/api/borrow-orders/${updatedOrder.order_id}`, 
        formattedOrder
      );
      
      // Refresh the list after successful update
      await fetchBorrowOrders();
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error editing borrow order:', error);
      throw new Error(error.response?.data?.message || 'Failed to edit borrow order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBorrowOrder = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/borrow-orders/${id}`);
      setBorrowOrders(prevOrders => prevOrders.filter(order => order.order_id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting borrow order:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete borrow order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (detailId) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/api/borrow-orders/${detailId}/return`);
      await fetchBorrowOrders(); // Refresh the list after returning
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error returning book:', error);
      throw new Error(error.response?.data?.message || 'Failed to return book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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