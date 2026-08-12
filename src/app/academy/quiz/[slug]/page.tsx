'use client';

import { useState, useEffect } from 'react';
import { academyQuizzes } from '@/data/quizzes';
import { useAcademyStore } from '@/store/academyStore';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function QuizPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = academyQuizzes.find(q => q.courseSlug === slug);
  const markAsComplete = useAcademyStore(state => state.markAsComplete);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl text-white font-bold mb-4">Kuiz tidak dijumpai</h1>
          <Link href="/academy" className="text-neon-blue hover:underline">Kembali ke Akademi</Link>
        </div>
      </div>
    );
  }

  const questions = course.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Has the user selected an answer for this question?
  const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return; // Prevent changing answer after selection
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let correct = 0;
      selectedAnswers.forEach((ans, idx) => {
        if (ans === questions[idx].correctAnswerIndex) correct++;
      });
      const finalScore = Math.round((correct / questions.length) * 100);
      setScore(finalScore);
      setShowResults(true);

      // If passed (e.g., > 60%), mark as complete in cloud sync
      if (finalScore >= 60) {
        // Here we could add logic to save the quiz explicitly, 
        // but for now we mark the entire course as complete.
        // Or perhaps a specific "quiz" completion mark.
      }
    }
  };

  if (showResults) {
    const passed = score >= 60;
    return (
      <main className="min-h-screen bg-[#09090b] flex flex-col p-4 md:p-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-blue/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-2xl w-full mx-auto relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <Award className={`w-24 h-24 mx-auto mb-6 ${passed ? 'text-gold-400' : 'text-slate-500'}`} />
          <h1 className="text-4xl font-black text-white mb-2">{passed ? 'Tahniah!' : 'Cuba Lagi!'}</h1>
          <p className="text-slate-400 mb-8">Anda telah menamatkan kuiz {course.title}</p>
          
          <div className="text-6xl font-black text-neon-blue mb-8">{score}%</div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/academy/level/${slug}`} className="bg-white/10 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/20 transition-colors">
              Ulang Kaji Semula
            </Link>
            {passed ? (
              <Link href="/academy" className="bg-neon-blue text-black font-bold py-3 px-6 rounded-xl hover:bg-neon-blue/80 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all">
                Seterusnya
              </Link>
            ) : (
              <button onClick={() => window.location.reload()} className="bg-neon-blue text-black font-bold py-3 px-6 rounded-xl hover:bg-neon-blue/80 transition-colors">
                Cuba Lagi
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/academy/level/${slug}`} className="flex items-center text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
          </Link>
          <div className="text-white font-bold hidden md:block">{course.title}</div>
          <div className="text-neon-blue font-bold font-mono text-sm bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/30">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                
                let btnStyle = "border-white/10 hover:border-white/30 hover:bg-white/5 text-slate-300";
                let icon = null;

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = "border-success-500/50 bg-success-500/10 text-success-400 font-bold";
                    icon = <CheckCircle2 className="w-5 h-5 text-success-500" />;
                  } else if (isSelected) {
                    btnStyle = "border-danger-500/50 bg-danger-500/10 text-danger-400";
                    icon = <XCircle className="w-5 h-5 text-danger-500" />;
                  } else {
                    btnStyle = "border-white/5 opacity-50";
                  }
                } else if (isSelected) {
                   btnStyle = "border-neon-blue bg-neon-blue/10 text-white";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {icon && <span>{icon}</span>}
                  </button>
                );
              })}
            </div>
            
            {/* Explanation Area */}
            {hasAnswered && (
              <div className={`mt-8 p-5 rounded-xl border ${selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswerIndex ? 'bg-success-500/10 border-success-500/20' : 'bg-danger-500/10 border-danger-500/20'}`}>
                <h4 className="font-bold text-white mb-2">Penjelasan:</h4>
                <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`font-bold py-4 px-8 rounded-xl transition-all ${hasAnswered ? 'bg-neon-blue text-black hover:bg-neon-blue/80 shadow-[0_0_20px_rgba(0,243,255,0.3)]' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Lihat Keputusan' : 'Soalan Seterusnya'}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
