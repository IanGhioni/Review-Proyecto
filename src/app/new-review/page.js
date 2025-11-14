'use client';

import { useState } from 'react';
import "./background-blur.css"

export default function NewReviewPage() {
    const [form, setForm] = useState({
        title: '',
        text: '',
        imageUrl: '',
        stars: 1,
        category: '',
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: name === 'stars' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });

        if (res.ok) {
        setMsg('✅ Review creada correctamente');
        setForm({ title: '', text: '', imageUrl: '', stars: 1, category: '' });
        } else {
        setMsg('❌ Error al crear review');
        }
    };

    return (
        <div className='background-blur'>
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">Crear nueva review</h1>

        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-2xl shadow-md"
        >
            <input
            type="text"
            name="title"
            placeholder="Título del contenido"
            value={form.title}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            />

            <textarea
            name="text"
            placeholder="Tu reseña"
            value={form.text}
            onChange={handleChange}
            required
            rows="5"
            className="border p-2 rounded resize-none"
            />

            <input
            type="text"
            name="imageUrl"
            placeholder="URL de imagen"
            value={form.imageUrl}
            onChange={handleChange}
            className="border p-2 rounded"
            />

            <div className="flex items-center gap-2">
            <label htmlFor="stars" className="font-medium">
                Estrellas:
            </label>
            <input
                type="number"
                id="stars"
                name="stars"
                min="1"
                max="5"
                value={form.stars}
                onChange={handleChange}
                className="border p-2 rounded w-16 text-center"
            />
            </div>

            <input
            type="text"
            name="category"
            placeholder="Categoría (libro, película, álbum, etc.)"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
            />

            <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
            Publicar
            </button>
        </form>

        {msg && <p className="mt-4">{msg}</p>}
        </div>
        </div>
    );
}
