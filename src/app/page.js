'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ReviewCard from "@/components/ReviewCard";
import { useRouter } from 'next/navigation';
import "./homePageStyle.css"
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [pelisFav, setPelisFav] = useState([])
  const [juegosFav, setJuegosFav] = useState([])
  const [albumesFav, setAlbumesFav] = useState([])
  const [blog, setBlog] = useState([])
  const [cargando, setCargando] = useState(true)

  const router = useRouter();

  useEffect(() => {
      document.title = 'Pagina principal';
      fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setCargando(true)
        const res = await fetch(`/api/reviews?page=1&limit=3&category=`);
        const resPelisFav = (await fetch('/api/reviews?favorites=true&limit=3&category=Película'));
        const resJuegosFav = (await fetch('/api/reviews?favorites=true&limit=3&category=Videojuego'));
        const resAlbumesFav = (await fetch('/api/reviews?favorites=true&limit=3&category=Álbum'));


        
        const data = await res.json();
        const pelisFav = await resPelisFav.json()
        const juegosFav = await resJuegosFav.json()
        const albumesFav = await resAlbumesFav.json()
      
        await setReviews(Array.isArray(data.data) ? data.data : []);
        await setPelisFav(Array.isArray(pelisFav.data) ? pelisFav.data : [])
        await setJuegosFav(Array.isArray(juegosFav.data) ? juegosFav.data : [])
        await setAlbumesFav(Array.isArray(albumesFav.data) ? albumesFav.data : [])
        setCargando(false)
    };



  return (
    <div className="container-home-page">
      <Navbar/>
      {cargando ? 
        <div className="flex flex-row justify-center items-center size-full gap-3">
          <CircularProgress color="inherit"/>
          Cargando
        </div>
      :
      <div>
      <div className="text-title">
        Bienvenido a mi blog personal, donde subo reviews y algun dia escriba cositas :P
      </div>
      <div className="container-contenido">
        <div className="left-side-container">
          <div className="favorito-titulo">
            ‣ Pelís favoritas:
            <ul>
              <div className="favorites-container">
              {pelisFav.map((peli) => (
                <li key={peli._id}>
                  <img className="img-fav"src={peli.imageUrl} alt={peli.title} onClick={() => router.push(`/reviews/${peli._id}`)} loading="lazy"/>
                </li>
              ))}
              </div>
            </ul>
          </div>
          <div className="favorito-titulo">
            ‣ Álbumes favoritos:
            <ul>
              <div className="favorites-container">
              {albumesFav.map((album) => (
                <li key={album._id}>
                  <img className="img-fav"src={album.imageUrl} alt={album.title} onClick={() => router.push(`/reviews/${album._id}`)} loading="lazy"/>
                </li>
              ))}
              </div>
            </ul>
          </div>
          <div className="favorito-titulo">
            ‣ Videojuegos favoritos:
            <ul>
              <div className="favorites-container">
              {juegosFav.map((juego) => (
                <li key={juego._id}>
                  <img className="img-fav" src={juego.imageUrl} alt={juego.title} onClick={() => router.push(`/reviews/${juego._id}`)} loading="lazy"/>
                </li>
              ))}
              </div>
            </ul>
          </div>
          <div className="boton-favs">Ver todos mis favs</div>
        </div>
        <div className="right-side-container">
          <div>
            <div className="right-side-titulo">
              <div className="titulo-mis-reviews">Mis ultimas reviews:</div>
              <div className="ver-todas" onClick={() => router.push('/reviews')}>Ver todas</div>
            </div>
            <div>
              <ul className="space-y-4">
                        {reviews.map((review) => (
                        <li key={review._id}>
                            <ReviewCard review={review} />
                        </li>
                        ))}
                    </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      }
    </div>

  );
}