import { useState, useEffect } from 'react';
import axios from 'axios';

function useReaders() {
  const [readers, setReaders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiCall = async (method, url = '', data = null) => {
    setLoading(true);
    try {
      const response = await axios[method](`http://localhost:8000/api/readers${url}`, data);
      setError(null);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || `Failed to ${method} reader. Please try again.`;
      console.error(`Error ${method}ing reader:`, error);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const prepareReaderData = (reader) => ({       //chuẩn hóa dữ liệu
    name: reader.name.trim(),   //loại bỏ khoảng trắng ở đầu và cuối chuỗi
    email: reader.email.trim(),
    phone_number: reader.phone_number?.trim() || null,
    address: reader.address?.trim() || null
  });

  const fetchReaders = () => apiCall('get').then(setReaders);

  useEffect(() => { fetchReaders(); }, []);

  return {
    readers,
    error,
    loading,
    addReader: async (reader) => { 
      await apiCall('post', '', prepareReaderData(reader)); return fetchReaders(); 
    },
    editReader: async (reader) => { 
      await apiCall('put', `/${reader.reader_id}`, prepareReaderData(reader)); return fetchReaders(); 
    },
    deleteReader: async (id) => { 
      await apiCall('delete', `/${id}`); setReaders(r => r.filter(reader => reader.reader_id !== id)); 
    }
  };
}

export default useReaders;