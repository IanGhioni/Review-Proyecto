import { CircularProgress } from "@mui/material";
import "./cargando.css"

function Cargando() {
    return (
        <div className="loading-overlay">
            <CircularProgress color="error"/>
            Cargando...
        </div>
    );
}

export default Cargando;