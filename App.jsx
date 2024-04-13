import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [file, setFile] = useState(null);
  const [fname, setFname] = useState('');

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3100/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file');
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h5>File Name:</h5>
            <input
              type="text"
              className="form-control"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
