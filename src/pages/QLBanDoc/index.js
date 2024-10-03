import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReaderComponent from '../../components/ReaderComponent';
import useReaders from '../../hooks/useReaders';

function QLBanDoc() {
  const { readers, addReader, editReader, deleteReader, error, loading } = useReaders();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Bạn đọc</h2>
      <div className="card">
        <div className="card-body">
          <ReaderComponent
            readers={readers}
            onAdd={addReader}
            onEdit={editReader}
            onDelete={deleteReader}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default QLBanDoc;