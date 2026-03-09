import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Star, AlertCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setErrorMsg(result.msg);
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-box">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%' }}>
                        <Star size={32} color="white" fill="white" />
                    </div>
                </div>
                <h2 className="header-title">¡Hola!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                    Bienvenido a <strong>PEKECODE</strong>
                </p>

                {errorMsg && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                        <AlertCircle size={18} /> {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                placeholder="ejemplo@escuela.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '2.5rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '2.5rem' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Iniciar Sesión
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', paddingTop: '1.5rem', borderTop: '2px dashed var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>¿Aún no tienes cuenta?</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="btn"
                        style={{ width: '100%', background: 'white', color: 'var(--secondary)', border: '2px solid var(--secondary)' }}
                    >
                        Crear nuevo usuario
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
