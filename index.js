import { useState } from 'react';

export default function Home() {
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Memproses...');

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link, type: 'video' }) 
      });

      const data = await res.json();
      if (data.status === 'success') {
        setDownloadLink(data.download_url);
        setStatus('Download siap!');
      } else {
        setStatus('Terjadi kesalahan!');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Downloader Semua Sosmed</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Link Sosmed: </label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Masukkan link dari TikTok/YouTube/Instagram"
            required
          />
        </div>
        <button type="submit">Download</button>
      </form>

      <div>{status}</div>
      {downloadLink && (
        <div>
          <a href={downloadLink} download>Download File</a>
        </div>
      )}
    </div>
  );
}
