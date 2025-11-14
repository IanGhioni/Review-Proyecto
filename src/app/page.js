'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import "./homePageStyle.css"

export default function Home() {

  useEffect(() => {
    document.title = 'Pagina principal';
  }, [])

  return (
    <div className="container-home-page">
      <Navbar/>
    </div>

  );
}
