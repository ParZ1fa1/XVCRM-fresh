import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from './db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Регистрация
app.post('/api/Register', (req: Request, res: Response): void => {
  (async () => {
    try {
      const { username, password } = req.body;

      const [existing] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
      if ((existing as any[]).length > 0) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

      res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })();
});

// ✅ Вход
app.post('/api/Login', (req: Request, res: Response): void => {
  (async () => {
    try {
      const { username, password } = req.body;

      const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
      const user = (rows as any[])[0];

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign({ id: user.id }, 'secret123', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error('Ошибка входа:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
