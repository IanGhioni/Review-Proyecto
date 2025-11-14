'use client';

import { useState, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import { Divider } from 'primereact/divider';
import CircularProgress from '@mui/material/CircularProgress';
import ReviewCard from "@/components/ReviewCard";
import "./paginator.css"
import "./reviewsPage.css"
import Navbar from "@/components/Navbar";

export default function Home() {
    const [reviews, setReviews] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [cargando, setCargando] = useState(true)
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);
    const [categoria, setCategoria] = useState(""); 


    useEffect(() => {
        fetchReviews();
        setCargando(false)
    }, [page, rows, categoria]);

    const fetchReviews = async () => {
        setCargando(true)
        const res = await fetch(`/api/reviews?page=${page + 1}&limit=${rows}&category=${categoria}`);
        const data = await res.json();
        await setReviews(Array.isArray(data.data) ? data.data : []);
        setTotalRecords(data.pagination?.total || 0);
    };

    const onPageChange = (e) => {
        setPage(e.page);
        setRows(e.rows);
    };

    const seleccionarCategoria = (cat) => {
        setCategoria(cat);
        setPage(0);
    };

    const emoji = "(⁠.⁠ ⁠❛⁠ ⁠ᴗ⁠ ⁠❛⁠.⁠)"

    return (
        <div>
            <Navbar/>
        {cargando ? 
            <div className="cargandoContainer"> 
            <div className="color-circular">
            <CircularProgress color="inherit"/>
            </div>
            Cargando
            </div> 
            :
            <div>
            {reviews.length == 0 ? 
            <div className="page-container">
                <div className="w-370 titulo-reviews">{emoji} Mis reviews</div>
                <div className="no-reviews">
                <div className="filter-container">
                    <button className={`buttonFilter ${categoria === "" ? "active" : ""}`} onClick={() => seleccionarCategoria("")}>Todos</button>
                    <button className={`buttonFilter ${categoria === "Videojuego" ? "active" : ""}`} onClick={() => seleccionarCategoria("Videojuego")}>Videojuego</button>
                    <button className={`buttonFilter ${categoria === "Película" ? "active" : ""}`} onClick={() => seleccionarCategoria("Película")}>Película</button>
                    <button className={`buttonFilter ${categoria === "Serie" ? "active" : ""}`} onClick={() => seleccionarCategoria("Serie")}>Serie</button>
                    <button className={`buttonFilter ${categoria === "Libro" ? "active" : ""}`} onClick={() => seleccionarCategoria("Libro")}>Libro</button>
                    <button className={`buttonFilter ${categoria === "Manga" ? "active" : ""}`} onClick={() => seleccionarCategoria("Manga")}>Manga</button>
                    <button className={`buttonFilter ${categoria === "Comic" ? "active" : ""}`} onClick={() => seleccionarCategoria("Comic")}>Comic</button>
                    <button className={`buttonFilter ${categoria === "Álbum" ? "active" : ""}`} onClick={() => seleccionarCategoria("Álbum")}>Musica</button>
                </div>
                <div className="no-reviews-text">Opa! No hay reviews para mostrar.</div> 
            </div>
            </div>
            :
            <div className="page-container">
                <div className="w-370 titulo-reviews">{emoji} Mis reviews</div>
                <div className="filter-card-container">
                <div className="filter-container">
                    <button className={`buttonFilter ${categoria === "" ? "active" : ""}`} onClick={() => seleccionarCategoria("")}>Todos</button>
                    <button className={`buttonFilter ${categoria === "Videojuego" ? "active" : ""}`} onClick={() => seleccionarCategoria("Videojuego")}>Videojuego</button>
                    <button className={`buttonFilter ${categoria === "Película" ? "active" : ""}`} onClick={() => seleccionarCategoria("Película")}>Película</button>
                    <button className={`buttonFilter ${categoria === "Serie" ? "active" : ""}`} onClick={() => seleccionarCategoria("Serie")}>Serie</button>
                    <button className={`buttonFilter ${categoria === "Libro" ? "active" : ""}`} onClick={() => seleccionarCategoria("Libro")}>Libro</button>
                    <button className={`buttonFilter ${categoria === "Manga" ? "active" : ""}`} onClick={() => seleccionarCategoria("Manga")}>Manga</button>
                    <button className={`buttonFilter ${categoria === "Comic" ? "active" : ""}`} onClick={() => seleccionarCategoria("Comic")}>Comic</button>
                    <button className={`buttonFilter ${categoria === "Álbum" ? "active" : ""}`} onClick={() => seleccionarCategoria("Álbum")}>Musica</button>
                </div>
                <Divider layout="vertical"/>
                <ul className="space-y-4">
                    {reviews.map((review) => (
                    <li key={review._id}>
                        <ReviewCard review={review} />
                    </li>
                    ))}
                </ul>
                </div>
                <Paginator
                first={page * rows}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                />
                </div>
            }
            </div>
        }
        
        </div>

    );
}
