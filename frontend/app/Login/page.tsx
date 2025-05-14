'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/Login', form);
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err) {
        console.error(err);

      setError('Неверный логин или пароль');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <button type="submit">Войти</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
