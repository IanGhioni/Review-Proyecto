"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import FullscreenImage from "./FullScreenImage";
import "./singleReviewContainer.css"
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Divider } from "primereact/divider";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function ClientReview({ review }) {
    const [open, setOpen] = useState(false);
    const [fullImagen, setFullImagen] = useState('');

    if (review.otherImages) {
        const array = review.otherImages.trim().split(/\s+/);
    }

    return (
        <div>
            <Navbar />
            <div className="single-review-page-container">
                <div className="container-review-contenido">
                    <img
                    className="img-review"
                    src={review.imageUrl}
                    onClick={() => { 
                        setFullImagen(review.imageUrl); 
                        setOpen(true)
                    }}
                    loading="lazy"
                    ></img>
                    <Divider layout="vertical"/>
                    <div>
                        <h1 className="review-titulo">{review.title}</h1>
                        <div className="category-star-container">
                            <p className="review-categoria">{review.category}</p>
                            <Rating 
                            value={review.stars} 
                            precision={0.5} 
                            icon={<StarIcon fontSize="inherit" style={{ color: "#ff1e00ff" }} />}
                            emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: "#bbb" }}/>}
                            readOnly/>
                        </div>
                        {review.favorite ? (
                            <div className="flex flex-row item-center gap-2 italic">
                                <Rating max={1}value={1} icon={<FavoriteIcon fontSize="inherit" />} readOnly style={{color: 'red'}}/>
                                De mis favs jiji
                            </div>
                        ) : (
                            <></>
                        )}
                        <p className="texto-review">‣ {review.text}</p>
                        {review.otherImages && (
                            <div>
                                <p className='otherImages-div italic underline'>Imagenes:</p>
                                <div className="otherImages-container">
                                    {review.otherImages.trim().split(/\s+/).map((imagen) => (
                                        <img 
                                            className='otherImages-img' 
                                            key={imagen} 
                                            src={imagen}
                                            onClick={() => { 
                                                setFullImagen(imagen); 
                                                setOpen(true)
                                            }}>
                                        </img>
                                    ))}
                                </div>
                            </div>
                        )}
                        <FullscreenImage
                            src={fullImagen}
                            open={open}
                            onClose={() => {setOpen(false); setFullImagen('')}}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}
