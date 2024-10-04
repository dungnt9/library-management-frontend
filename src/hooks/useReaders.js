import { useState, useEffect } from 'react';
import axios from 'axios';

function useReaders() {
  const [readers, setReaders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReaders();
  }, []);

  const fetchReaders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/readers');
      setReaders(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching readers:', error);
      setError('Failed to fetch readers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addReader = async (newReader) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/readers', {
        name: newReader.name.trim(),
        email: newReader.email.trim(),
        phone_number: newReader.phone_number?.trim() || null,
        address: newReader.address?.trim() || null
      });
      await fetchReaders(); // Refresh list after adding
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error adding reader:', error);
      throw new Error(error.response?.data?.message || 'Failed to add reader. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const editReader = async (updatedReader) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/api/readers/${updatedReader.reader_id}`, {
        name: updatedReader.name.trim(),
        email: updatedReader.email.trim(),
        phone_number: updatedReader.phone_number?.trim() || null,
        address: updatedReader.address?.trim() || null
      });
      await fetchReaders(); // Refresh list after editing
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error editing reader:', error);
      throw new Error(error.response?.data?.message || 'Failed to edit reader. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteReader = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/readers/${id}`);
      // Thay vì fetchReaders(), chúng ta sẽ cập nhật state trực tiếp
      setReaders(prevReaders => prevReaders.filter(reader => reader.reader_id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting reader:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete reader. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { readers, addReader, editReader, deleteReader, error, loading };
}

export default useReaders;