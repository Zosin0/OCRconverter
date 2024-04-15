import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState(null); // Definição de setError

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('language', language);
  
      const response = await axios.post('http://127.0.0.1:5000/api/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data && response.data.text) {
        console.log(response.data.text.trim());
        setText(response.data.text.trim());
      } else {
        setError('Resposta inválida do servidor');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Erro ao processar a solicitação');
    }
  };
    
  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#007BFF' }}>OCR App</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '20px' }} />
      <br />
      <select value={language} onChange={handleLanguageChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007BFF', marginBottom: '20px' }}>
        <option value="">Selecione uma língua: </option>
        <option value="eng">Inglês</option>
        <option value="spa">Espanhol</option>
        <option value="por">Português</option>
      </select>
      <br />
      <button onClick={handleUpload} style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Upload</button>
      <br />
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#007BFF' }}>Texto Extraído:</h2>
        <p style={{ backgroundColor: '#F0F0F0', padding: '20px', borderRadius: '5px', border: '1px solid #007BFF' }}>{text}</p>
      </div>
    </div>
  );
}

export default App;
