import { useState, useEffect } from 'react';
import axios from 'axios';

function useBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiCall = async (method, url, data = null) => {
    setLoading(true);
    try {
      const response = await axios[method](`http://localhost:8000/api/books${url}`, data);
      setError(null);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || `Failed to ${method} book. Please try again.`;
      console.error(`Error ${method}ing book:`, error);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = () => apiCall('get', '').then(setBooks);
  
  useEffect(() => { fetchBooks(); }, []);

  return {
    books,
    error,
    loading,
    addBook: async (book) => { await apiCall('post', '', book); return fetchBooks(); },
    editBook: async (book) => { await apiCall('put', `/${book.book_id}`, book); return fetchBooks(); },
    deleteBook: async (id) => { await apiCall('delete', `/${id}`); setBooks(books => books.filter(b => b.book_id !== id)); }
  };
}

export default useBooks;