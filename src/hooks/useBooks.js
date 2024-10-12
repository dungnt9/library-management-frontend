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
      const message = error.response?.data?.message || `Failed to ${method} book. Please try again.`; //Optional Chaining (?.) tránh gây lỗi khi truy cập vào thuộc tính của đối tượng có thể là undefined/null
      console.error(`Error ${method}ing book:`, error);
      throw new Error(message); //Error là đối tượng tích hợp sẵn trong JS
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = () => apiCall('get', '').then(setBooks); //gọi ngay khi component lần đầu được render, data trả về đc truyển vào setBooks
  
  useEffect(() => { fetchBooks(); }, []);

  return {       //return 1 đối tượng gồm thuộc tính và phương thức
    books,
    error,
    loading,
    addBook: async (book) => {
      await apiCall('post', '', book);
      return fetchBooks();
    },
    editBook: async (book) => {
      await apiCall('put', `/${book.book_id}`, book);  //Template literals tạo chuỗi động, ${} để chèn giá trị biến
      return fetchBooks();
    },
    deleteBook: async (id) => {
      await apiCall('delete', `/${id}`);
      setBooks(books => books.filter(b => b.book_id !== id));
    }
  };
  
}

export default useBooks;