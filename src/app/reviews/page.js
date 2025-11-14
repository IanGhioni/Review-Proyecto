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

    useEffect(() => {
        fetchReviews();
        setCargando(false)
    }, [page, rows]);

    const fetchReviews = async () => {
        setCargando(true)
        const res = await fetch(`/api/reviews?page=${page + 1}&limit=${rows}`);
        const data = await res.json();
        await setReviews(Array.isArray(data.data) ? data.data : []);
        setTotalRecords(data.pagination?.total || 0);
    };

    const onPageChange = (e) => {
        setPage(e.page);
        setRows(e.rows);
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
            <div className="no-reviews">
                No hay reviews para mostrar. 
            </div>
            :
            <div className="page-container">
                <div className="w-370 titulo-reviews">{emoji} Mis reviews</div>
                <div className="filter-card-container">
                <div className="filter-container">
                    <button className="buttonFilter">Todos</button>
                    <button className="buttonFilter">Película</button>
                    <button className="buttonFilter">Serie</button>
                    <button className="buttonFilter">Libro</button>
                    <button className="buttonFilter">Manga</button>
                    <button className="buttonFilter">Comic</button>
                    <button className="buttonFilter">Musica</button>
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
