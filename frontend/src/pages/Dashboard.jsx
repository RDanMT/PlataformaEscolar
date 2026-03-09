import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Matemáticas', promedio: 85 },
    { name: 'Ciencias', promedio: 90 },
    { name: 'Historia', promedio: 78 },
    { name: 'Literatura', promedio: 88 },
];

const Dashboard = () => {
    return (
        <div>
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h1 className="header-title">Tablero PEKECODE</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    ¡Mira cómo aprenden y crecen nuestros alumnos!
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3>Total Alumnos</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>42</p>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3>Exámenes Activos</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--secondary)' }}>3</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem', height: '400px' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Rendimiento Promedio por Materia</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="promedio" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
