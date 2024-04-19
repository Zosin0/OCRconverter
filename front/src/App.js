import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
        console.log(response.data.text);
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
    <div className="app-container">
      <nav className="navbar">
        <h1>OCR ReaderApp</h1>
      </nav>
      <div className="content">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <select value={language} onChange={handleLanguageChange}>
          <option value="">Selecione uma língua: </option>
          <option value="eng">Inglês</option>
          <option value="spa">Espanhol</option>
          <option value="por">Português</option>
        </select>
        <button onClick={handleUpload}>Upload</button>
        <div className="extracted-text">
          <h2>Texto Extraído:</h2>
          <p>{text}</p>
        </div>
        <div className="footer">
          <h2>O que é um OCR Reader?</h2>
          <p>Um OCR Reader é uma ferramenta que utiliza a tecnologia de Reconhecimento Óptico de Caracteres (OCR) para extrair texto de imagens ou documentos digitalizados.</p>
          <p>Este aplicativo foi desenvolvido por 4 alunos do CEUB:</p>           


          <div className="team-photos">
            <div className="team-photo">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczNHwC1Px3tKtElniiT4-wnx6_g7TA5mgq83QHYG-u3VW_4RtT4GF1p_TayFyQPCtYHZjPyiArMbzlh8lFaxdkKQ3d4FjNt0i3OUUynwFvBR1IEDgUg0aTe7VQS22DDQkrTdshyDclWmfebQhDkH4IuXSg=w725-h966-s-no-gm?authuser=0" alt="Integrante 1" />
            </div>
            <div className="team-photo">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczO0MLG50kQVf-EVazlfU-b9jvgBmpJheCtSTlbf1xDSaIqE-HS_U6JHZwHANcmj0lgdWJtBnBiFCM2rfmyMnD74hWU1nNkC0NfPb0PhI6I2LwFaoSCqwOqeEja_BhdlaNYJwy08XR1W11YX2M50HlNxUw=w640-h640-s-no-gm?authuser=0" alt="Integrante 2" />
            </div>
            <div className="team-photo">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczNRoSBBGxNKC7xxAH7C1wVKzYiQl78DUezhOKVpnZ2jEwquwcBVzXLlZa6Stt6HkJsh6Xm4gzEEKORPKVclrIvYQAIKJ44iRThzqtJvKWEkPgo7Pmq2RtiWvwn8G6hzw5caVIAwPGcFbREBM3Fzx5R_HA=w640-h641-s-no-gm?authuser=0" alt="Integrante 3" />
            </div>
            <div className="team-photo">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczOwAxOaoCodlhMQE1BEAfjGaVIk9rQwAFJ0vLBgadoqOwwdxa9Ms-TjWVw5KMrmPo6NE5t51W0fYMnVfsYVDxw2MpD58FEfPwjOQiQq-IvMWYF9eGAhlZwbOxHRpmlC7MgPKUQa7a-HVtGGVzlmlDL-5Q=w640-h640-s-no-gm?authuser=0" alt="Integrante 4" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;