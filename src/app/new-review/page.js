'use client';

import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from '@mui/material';
import "@/app/new-review/review-form.css"
import Navbar from '@/components/Navbar';
import FullscreenImage from '../reviews/[id]/FullScreenImage';

export default function NewReviewPage() {
    const [form, setForm] = useState({
        title: '',
        text: '',
        imageUrl: '',
        stars: 1,
        category: '',
        favorite: false,
        otherImages: ''
    });
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [fullImagen, setFullImagen] = useState('');

    const categorias = ['Película', 'Videojuego', 'Serie', 'Libro', 'Manga', 'Comic', 'Álbum']

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "stars" ? Number(value) : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });

        console.log(form)

        if (res.ok) {
        setMsg('Review creada correctamente');
        setForm({ title: '', text: '', imageUrl: '', stars: 1, category: '', favorite: false, otherImages: '' });
        } else {
        setMsg('Error al crear review');
        }
    };

    return (
        <div>
        <Navbar/>
        <div className='container-new-review-form'>
            <div className='new-review-form'>
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
                    
                    <textarea
                    name="otherImages"
                    placeholder="Imagenes extra (Separar por espacio)"
                    value={form.otherImages}
                    onChange={handleChange}
                    rows="5"
                    className="border p-2 rounded resize-none"
                    />

                    <div className="flex items-center gap-2">
                    <label htmlFor="stars" className="font-medium">
                        Estrellas:
                    </label>
                    <Rating name="stars" 
                            value={form.stars} 
                            precision={0.5}
                            style={{color: 'red'}}
                            onChange={(event, newValue) => {
                                setForm(prev => ({
                                    ...prev,
                                    stars: newValue
                                }));
                            }}
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
            <div style={{color: 'white'}}>
                <p className="text-2xl font-bold mb-6" style={{color: 'white'}}>Para revisar si las imagenes cargan o no</p>
                <div className='w-200'>
                    <div>Imagen de portada:</div>
                    {form.imageUrl != '' && (
                        <img 
                            className='imagen-preview'
                            src={form.imageUrl}
                            onClick={() => { 
                                setFullImagen(form.imageUrl); 
                                setOpen(true)
                            }}
                            />
                    )}
                    <div className='mt-5'>Otras imagenes</div>
                    {form.otherImages != '' && (
                        <div className='otherImages-preview'>
                        {form.otherImages.trim().split(/\s+/).map((imagen) => (
                            <img 
                                key={imagen}
                                className='imagen-preview'
                                src={imagen}
                                onClick={() => { 
                                    setFullImagen(imagen); 
                                    setOpen(true)
                                }}
                            />
                        ))}
                        </div>
                    )}
                </div>
            </div>
            <FullscreenImage
                src={fullImagen}
                open={open}
                onClose={() => {setOpen(false); setFullImagen('')}}
            />
        </div>
        </div>
    );
}
