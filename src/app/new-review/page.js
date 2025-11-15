'use client';

import { useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from '@mui/material';
import "@/app/new-review/review-form.css"
import Navbar from '@/components/Navbar';

export default function NewReviewPage() {
    const [form, setForm] = useState({
        title: '',
        text: '',
        imageUrl: '',
        stars: 1,
        category: '',
        favorite: false
    });
    const [msg, setMsg] = useState('');
    const categorias = ['Película', 'Videojuego', 'Serie', 'Libro', 'Manga', 'Comic', 'Álbum']

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setForm(prev => ({
            ...prev,
            [name]: name === 'stars' ? Number(value) : value
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
        setMsg('Review creada correctamente');
        setForm({ title: '', text: '', imageUrl: '', stars: 1, category: '', favorite: false });
        } else {
        setMsg('Error al crear review');
        }
    };

    return (
        <div>
        <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6" style={{color: 'white'}}>Crear nueva review</h1>

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
            <Rating name="stars" 
                    value={form.stars} 
                    onChange={handleChange} 
                    precision={0.5}
                    style={{color: 'red'}}
            />
            </div>
            <Dropdown name='category' 
                    value={form.category} 
                    onChange={handleChange} 
                    options={categorias} 
                    optionLabel="category" 
                    placeholder="Categoria" 
            />
            <div className='flex flex-column gap-2 align-center'>
            
            <input type="checkbox" 
                name="favorite" 
                value={form.favorite} 
                onChange={(e) => {
                    setForm(prev => ({
                        ...prev,
                        favorite: e.target.checked
                    }));
                }}
            />
            <label>¿Favorito?</label>

            
            </div>
            <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
            Publicar
            </button>
        </form>

        {msg && <p className="mt-4" style={{color: 'white'}}>{msg}</p>}
        </div>
        </div>
    );
}
