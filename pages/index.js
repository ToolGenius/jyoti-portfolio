import Head from 'next/head';
import { motion } from 'framer-motion';
import '../styles/globals.css';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(data.message);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>Jyoti Rajput | Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <motion.header 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white text-center py-16 px-4"
        >
          <h1 className="text-4xl font-bold">Jyoti Rajput</h1>
          <p className="mt-2 text-lg">B.Com Graduate | Computer Applications | Admin & Back-Office Enthusiast</p>
        </motion.header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          <motion.section 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Leave a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Submit</button>
            </form>
            {status && <p className="mt-2 text-green-600">{status}</p>}
          </motion.section>
        </main>

        <footer className="text-center py-4 text-sm text-gray-500">
          &copy; 2025 Jyoti Rajput. All rights reserved.
        </footer>
      </div>
    </>
  );
}
