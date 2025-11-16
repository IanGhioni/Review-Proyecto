'use client'

import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "./paginaFavoritos.css"

export default function PaginaDeFavs() {
    const [reviews, setReviews] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [cargando, setCargando] = useState(true)
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(20);
    const [categoria, setCategoria] = useState(""); 

    const router = useRouter()

    useEffect(() => {
        document.title = 'Mis reviews';
        fetchReviews();
    }, [page, rows, categoria]);

    const fetchReviews = async () => {
        setCargando(true)
        const res = await fetch(`/api/reviews?page=${page + 1}&limit=${rows}&category=${categoria}&favorites=true`);
        const data = await res.json();
        await setReviews(Array.isArray(data.data) ? data.data : []);
        setTotalRecords(data.pagination?.total || 0);
        setCargando(false)
    };


    return(
        <div>
            <Navbar/>
            {cargando ? (
                <div className="favs-container">
                    <p style={{color: 'white'}}>Cargandooooo</p>
                </div>
            ) : (
                <div className="favs-container">
                    <div className="container-fav-cards">
                        {reviews.map((r) => (
                            <div key={r._id} className="flex items-center justify-center">
                            <div key={r._id} className="container-individual-card">
                                <img className="imgen-fav" src={r.imageUrl}
                                    onClick={() => router.push(`/reviews/${r._id}`)}
                                />
                                <p className="texto-titulo">{r.title}</p>
                                <Rating 
                                    value={r.stars} 
                                    precision={0.5}
                                    
                                    icon={<StarIcon fontSize="inherit" style={{ color: "#ffee00ff" }} />}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: "#bbb" }}/>}
                                    readOnly
                                />
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
        </div>
    )
}