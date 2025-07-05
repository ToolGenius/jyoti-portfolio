import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req, res) {
  const db = await open({
    filename: './feedback.db',
    driver: sqlite3.Database,
  });

  await db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    await db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    return res.status(200).json({ message: 'Message submitted successfully!' });
  }

  if (req.method === 'GET') {
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    return res.status(200).json({ messages });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
