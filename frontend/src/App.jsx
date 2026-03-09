import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import Evaluations from './pages/Evaluations';
import StudentDashboard from './pages/StudentDashboard';
import TakeExam from './pages/TakeExam';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <Navbar />
                    <main className="main-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Rutas de Profesor/Admin */}
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/students" element={<Students />} />
                            <Route path="/evaluations" element={<Evaluations />} />

                            {/* Rutas de Alumnos (PEKECODE) */}
                            <Route path="/mis-misiones" element={<StudentDashboard />} />
                            <Route path="/examen/:id" element={<TakeExam />} />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
