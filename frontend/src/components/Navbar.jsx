import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, LogOut, User as UserIcon } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container">
                <Link to={user?.role === 'Student' ? "/mis-misiones" : "/"} className="navbar-logo">
                    <Star className="logo-icon" fill="var(--warning)" strokeWidth={1.5} />
                    <span className="logo-text">PEKECODE</span>
                </Link>

                {user ? (
                    <div className="navbar-menu">
                        {user.role === 'Student' ? (
                            <Link to="/mis-misiones" className="nav-link">Mis Misiones</Link>
                        ) : (
                            <>
                                <Link to="/" className="nav-link">Dashboard</Link>
                                <Link to="/students" className="nav-link">Alumnos</Link>
                                <Link to="/evaluations" className="nav-link">Evaluaciones</Link>
                            </>
                        )}
                        <div className="navbar-user">
                            <span className="user-info">
                                <UserIcon size={16} />
                                {user.name} ({user.role === 'Student' ? 'Alumno' : (user.role === 'Admin' ? 'Admin' : 'Profe')})
                            </span>
                            <button onClick={handleLogout} className="btn-logout" title="Cerrar sesión">
                                <LogOut size={18} />
                                <span>Salir</span>
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
