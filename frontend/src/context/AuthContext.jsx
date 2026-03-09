import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Semilla de usuarios falsos iniciales para GitHub Pages
    const initializeMockDb = () => {
        if (!localStorage.getItem('peke_users')) {
            const initialUsers = [
                { id: '1', name: 'Admin Principal', email: 'admin@escuela.com', password: '123', role: 'Admin' },
                { id: '2', name: 'Maestra Ana', email: 'ana@escuela.com', password: '123', role: 'Teacher' },
                { id: '3', name: 'Carlitos', email: 'carlitos@escuela.com', password: '123', role: 'Student' }
            ];
            localStorage.setItem('peke_users', JSON.stringify(initialUsers));
        }
    };

    useEffect(() => {
        initializeMockDb();

        const checkLoggedIn = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // El "token" simulado será simplemente un string con los datos del usuario JSON.stringify'd
                    const userData = JSON.parse(token);
                    setUser(userData);
                } catch (err) {
                    console.error('Error al recuperar sesión simulada:', err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const users = JSON.parse(localStorage.getItem('peke_users')) || [];
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                const { password, ...userWithoutPassword } = foundUser;
                const fakeToken = JSON.stringify(userWithoutPassword); // Mock Token

                localStorage.setItem('token', fakeToken);
                setUser(userWithoutPassword);
                return { success: true };
            } else {
                return { success: false, msg: 'Credenciales inválidas (Prueba usando admin@escuela.com y 123)' };
            }
        } catch (err) {
            return { success: false, msg: 'Error de simulación al iniciar sesión' };
        }
    };

    const register = async (name, email, password, role) => {
        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const users = JSON.parse(localStorage.getItem('peke_users')) || [];

            if (users.find(u => u.email === email)) {
                return { success: false, msg: 'El correo electrónico ya está registrado' };
            }

            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                role
            };

            users.push(newUser);
            localStorage.setItem('peke_users', JSON.stringify(users));

            return { success: true };
        } catch (err) {
            return { success: false, msg: 'Error de simulación al registrarse' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
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
