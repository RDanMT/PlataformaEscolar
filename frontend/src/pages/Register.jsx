import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, UserPlus, Star, AlertCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [errorMsg, setErrorMsg] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        const result = await register(name, email, password, role);
        if (result.success) {
            alert('Usuario creado correctamente. Por favor, inicia sesión.');
            navigate('/login');
        } else {
            setErrorMsg(result.msg);
        }
    };

    return (
        <div className="auth-container" style={{ padding: '2rem 0' }}>
            <div className="glass-card auth-box" style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '50%' }}>
                        <UserPlus size={32} color="white" />
                    </div>
                </div>
                <h2 className="header-title">Crear Cuenta</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
                    Únete a la familia <strong>PEKECODE</strong>
                </p>

                {errorMsg && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                        <AlertCircle size={18} /> {errorMsg}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Ej. Juan Pérez"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ paddingLeft: '2.5rem' }}
                                required
                            />
                        </div>
                    </div>

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
                                minLength="6"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tipo de Cuenta</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: '2px solid var(--border)',
                                borderRadius: '16px',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.9)',
                                color: 'var(--text-main)',
                                outline: 'none'
                            }}
                        >
                            <option value="Student">Alumno</option>
                            <option value="Teacher">Profesor / Maestro</option>
                            <option value="Admin">Administrador</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}>
                        ¡Registrarme!
                        <ArrowRight size={18} />
                    </button>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>¿Ya tienes cuenta? </span>
                        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                            Iniciar sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
