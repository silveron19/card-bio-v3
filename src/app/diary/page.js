'use client';
import { useEffect, useState } from 'react';
import '@styles/diary.css';
import Link from 'next/link';
import axios from 'axios';

function Diary() {
  const endpoint = 'https://6555c36d84b36e3a431e44ff.mockapi.io/api/v1/diary';

  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isData, setIsData] = useState([]);
  const [tulis, setTulis] = useState('');
  const [diary, setDiary] = useState('');

  async function getDiary() {
    try {
      const res = await axios.get(endpoint);
      if (res.status !== 200) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }

      const diary = res.data;
      setDiaries(diary);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDiary();
  }, []);

  function handlerTekanEnter(event) {
    if (event.key === 'Enter') {
      handlerSubmitDiary();
    }
  }

  function handlerInputDiary(event) {
    event.preventDefault();
    setDiary(event.target.value);
    setTulis(event.target.value)
  }

  function handlerSubmitDiary(event) {
    postDiary();
    setDiary('');
  }

  async function postDiary() {
    try {
      const res = await axios.post(endpoint, {
        judul: diary,
      });

      setIsData([...isData, res.data]);

      setTulis('');
      getDiary();
    } catch (error) {
      alert('failed to POST API');
    }
  }
  return (
    <section className="diary">
      <div className="banner-container">
        <div className="cta-banner-wrapper">
          <input
            className={'cta-input'}
            type="text"
            placeholder="Tambahkan judul diary"
            onChange={handlerInputDiary}
            onKeyDown={handlerTekanEnter}
            value={tulis}
          />
          <div className="cta-button" onClick={handlerSubmitDiary}>
            <p>Tambahkan</p>
          </div>
        </div>
      </div>
      {loading ? (
        <p className="waiting-text">Loading...</p>
      ) : diaries.length > 0 ? (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id}>
              <Link href={`/diary/${diary.judul}/${diary.isi_diary}`}>
                <div className="diary-container">
                  <h1>{diary.judul}</h1>
                  <p>{diary.isi_diary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="waiting-text">Oops! Something went wrong.</p>
      )}
    </section>
  );
}

export default Diary;
