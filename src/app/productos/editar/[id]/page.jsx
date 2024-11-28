// src/app/productos/editar/[id]/page.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditarProducto({ params }) {
    const router = useRouter();
    const { id } = params;

    const [empresa, setEmpresa] = useState("");
    const [producto, setProducto] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEditProducto = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/P/modificarProducto/${id}`, {
                empresa,
                producto
            });
            console.log("Respuesta del servidor:", response.data);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error al modificar el producto:", error);
            if (error.response) {
                alert(`Error al modificar el producto: ${error.response.data.error || "Error desconocido"} (Código: ${error.response.status})`);
            } else if (error.request) {
                alert("Error: No se recibió respuesta del servidor. Verifica la conexión.");
            } else {
                alert(`Error al configurar la solicitud: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#800080" }}>Editar Producto</h2>
            <form onSubmit={handleEditProducto} className="p-4 rounded shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#f3e5f5" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Empresa</label>
                    <input
                        type="text"
                        className="form-control rounded"
                        placeholder="Nombre de la empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Producto</label>
                    <input
                        type="text"
                        className="form-control rounded"
                        placeholder="Nombre del producto"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <button type="submit" className="btn w-100 rounded" style={{ backgroundColor: "#9c27b0", color: "#fff" }}>Guardar Cambios</button>
            </form>
        </div>
    );
}
