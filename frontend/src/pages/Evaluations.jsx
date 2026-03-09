import { useState } from 'react';
import { Plus, ClipboardList } from 'lucide-react';

const Evaluations = () => {
    const [evaluations] = useState([
        { id: 1, title: 'Examen de Medio Curso - Matemáticas', date: '2026-03-10' },
        { id: 2, title: 'Prueba de Comprensión Lectora', date: '2026-03-15' },
    ]);

    return (
        <div>
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ClipboardList /> Misiones y Exámenes
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>¡Crea aventuras para que los peques demuestren lo que saben!</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} /> Nueva Evaluación
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {evaluations.map((evalItem) => (
                    <div key={evalItem.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>{evalItem.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fecha: {evalItem.date}</p>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn" style={{ background: 'var(--bg-color)', border: '1px solid var(--border)', width: '100%' }}>
                                Calificar Alumnos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Evaluations;
