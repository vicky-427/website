// client/src/components/FileManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setFiles([...files, response.data]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    }
    setUploading(false);
  };

  const handleFileDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:5000/api/files/${filename}`);
      setFiles(files.filter(file => file.name !== filename));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete file');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Project Documents</h3>
      
      <div className="mb-8">
        <label className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-full uppercase tracking-wide hover:scale-105 transition-transform cursor-pointer">
          {uploading ? 'Uploading...' : 'Upload File'}
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold mb-2 truncate">{file.name}</p>
            <div className="flex space-x-4">
              <a
                href={`http://localhost:5000${file.path}`}
                download
                className="text-green-600 hover:text-green-800 font-bold"
              >
                Download
              </a>
              <button
                onClick={() => handleFileDelete(file.name)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;