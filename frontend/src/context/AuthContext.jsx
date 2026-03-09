import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Configurar Axios por defecto
    axios.defaults.baseURL = 'http://localhost:5000';

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['x-auth-token'] = token;
                try {
                    const res = await axios.get('/api/auth/me');
                    setUser(res.data);
                } catch (err) {
                    console.error('Error al recuperar sesión:', err);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['x-auth-token'];
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            return { success: true };
        } catch (err) {
            console.error('Login error:', err.response?.data?.msg || err.message);
            return { success: false, msg: err.response?.data?.msg || 'Error al iniciar sesión' };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const res = await axios.post('/api/auth/register', { name, email, password, role });
            // Después del registro exitoso, se podría hacer login automático o redirigir al login
            return { success: true };
        } catch (err) {
            console.error('Register error:', err.response?.data?.msg || err.message);
            return { success: false, msg: err.response?.data?.msg || 'Error al registrarse' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
