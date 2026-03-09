import { useState } from 'react';
import { Plus, Users } from 'lucide-react';

const Students = () => {
    const [students] = useState([
        { id: 1, name: 'Ana', lastName: 'García', group: 'A', gradeLevel: 5 },
        { id: 2, name: 'Carlos', lastName: 'López', group: 'B', gradeLevel: 5 },
        { id: 3, name: 'María', lastName: 'Martínez', group: 'A', gradeLevel: 5 },
    ]);

    return (
        <div>
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users /> Mis Alumnos
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>¡Conoce a los peques de tu grupo!</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} /> Nuevo Alumno
                </button>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-main)' }}>Nombre</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-main)' }}>Apellidos</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-main)' }}>Grado y Grupo</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-main)' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>{student.name}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>{student.lastName}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>{student.gradeLevel}° {student.group}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <button className="btn" style={{ background: 'var(--bg-color)', border: '1px solid var(--border)' }}>
                                        Ver Calificaciones
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;
