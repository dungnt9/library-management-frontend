import { useState, useEffect } from 'react';
import axios from 'axios';

function useBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (newBook) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/books', newBook);
      await fetchBooks(); // Refresh list after adding
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw new Error(error.response?.data?.message || 'Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const editBook = async (updatedBook) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/api/books/${updatedBook.book_id}`, updatedBook);
      await fetchBooks(); // Refresh list after editing
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error editing book:', error);
      throw new Error(error.response?.data?.message || 'Failed to edit book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      await fetchBooks(); // Refresh list after deleting
      setError(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { books, addBook, editBook, deleteBook, error, loading };
}

export default useBooks;