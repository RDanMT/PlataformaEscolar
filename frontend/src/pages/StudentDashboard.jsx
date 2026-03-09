import { PlayCircle, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    // Mock data for student evaluations
    const missions = [
        { id: 1, title: 'Aventura Matemática', status: 'pending', subject: 'Matemáticas' },
        { id: 2, title: 'Exploradores de la Ciencia', status: 'completed', subject: 'Ciencias', score: 95 },
        { id: 3, title: 'Letras Mágicas', status: 'pending', subject: 'Español' }
    ];

    return (
        <div>
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                <h1 className="header-title" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trophy color="var(--tertiary)" size={36} /> ¡Tus Misiones, PEKE-Genio!
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    ¡Completa tus misiones para ganar estrellas!
                </p>
            </div>

            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star fill="var(--warning)" color="var(--warning)" /> Misiones Pendientes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {missions.filter(m => m.status === 'pending').map(mission => (
                    <div key={mission.id} className="glass-card" style={{ padding: '1.5rem', border: '3px solid var(--secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(0, 194, 255, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <PlayCircle size={48} color="var(--secondary)" />
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{mission.title}</h3>
                        <span style={{ background: 'var(--bg-color)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                            {mission.subject}
                        </span>
                        <Link to={`/examen/${mission.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                            ¡JUGAR MISIÓN!
                        </Link>
                    </div>
                ))}
            </div>

            <h2 style={{ marginBottom: '1.5rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy fill="var(--success)" color="var(--success)" /> Misiones Logradas
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {missions.filter(m => m.status === 'completed').map(mission => (
                    <div key={mission.id} className="glass-card" style={{ padding: '1.5rem', opacity: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{mission.title}</h3>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{mission.subject}</span>
                        </div>
                        <div style={{ background: 'var(--success)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Star fill="white" size={16} /> {mission.score} pts
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
