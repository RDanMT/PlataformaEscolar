import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';

const TakeExam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [completed, setCompleted] = useState(false);

    // Mock exam data
    const exam = {
        title: 'Aventura Matemática',
        questions: [
            { id: 1, text: '¿Cuánto es 2 manzanas + 3 manzanas?', options: ['4 manzanas', '5 manzanas', '6 manzanas'], answer: 1 },
            { id: 2, text: '¿Qué número sigue: 1, 2, 3, __ ?', options: ['4', '5', '6'], answer: 0 }
        ]
    };

    const handleAnswer = (index) => {
        if (currentQuestion < exam.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCompleted(true);
        }
    };

    if (completed) {
        return (
            <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto', border: '4px solid var(--success)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Star size={48} fill="var(--warning)" color="var(--warning)" className="animate-bounce" style={{ animationDelay: '0s' }} />
                    <Star size={64} fill="var(--warning)" color="var(--warning)" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <Star size={48} fill="var(--warning)" color="var(--warning)" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                <h1 className="header-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>¡FELICIDADES!</h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '3rem' }}>
                    Has completado la misión con muchísimo éxito.
                </p>
                <button onClick={() => navigate('/mis-misiones')} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                    Volver a mis misiones
                </button>
            </div>
        );
    }

    const question = exam.questions[currentQuestion];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '6px solid var(--primary)' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{exam.title}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Pregunta {currentQuestion + 1} de {exam.questions.length}
                </div>
            </div>

            <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>{question.text}</h2>

                <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                    {question.options.map((opt, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                border: '3px solid var(--secondary)',
                                borderRadius: '50px',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                color: 'var(--secondary)',
                                cursor: 'pointer',
                                background: 'white',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.background = 'var(--secondary)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = 'var(--secondary)';
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TakeExam;
