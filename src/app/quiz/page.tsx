"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const questions = [
    {
      id: 1,
      question: "Berapa banyak masa anda boleh luangkan untuk trading setiap hari?",
      options: [
        { label: "Kurang 1 jam (Suka biar trade jalan lama)", value: "swing" },
        { label: "1-3 jam (Cari setup malam selepas kerja)", value: "day" },
        { label: "Lebih 4 jam (Kadap depan chart je manjang)", value: "scalp" }
      ]
    },
    {
      id: 2,
      question: "Berapa anggaran modal permulaan anda?",
      options: [
        { label: "Bawah $50 (Nak try-try dulu)", value: "micro" },
        { label: "$100 - $500 (Boleh tahan la)", value: "standard" },
        { label: "Atas $1000 (Go big or go home!)", value: "pro" }
      ]
    },
    {
      id: 3,
      question: "Apa gaya trading (trading style) anda?",
      options: [
        { label: "Saya suka trade Gold (XAUUSD) pantas & ganas", value: "gold" },
        { label: "Saya suka kaji News (Fundamentals)", value: "news" },
        { label: "Saya jenis santai, swing seminggu", value: "swing_chill" }
      ]
    }
  ];

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [step]: val });
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(99); // Results step
    }
  };

  const getRecommendedBroker = () => {
    // Simple logic based on answers
    const ans1 = answers[1];
    const ans2 = answers[2];
    const ans3 = answers[3];

    if (ans3 === 'gold' && (ans1 === 'scalp' || ans1 === 'day')) return 'Exness';
    if (ans2 === 'micro') return 'XM Global';
    if (ans3 === 'news') return 'IC Markets';
    return 'Moneta Markets';
  };

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
            <div className="h-2 w-full bg-slate-100">
              <div 
                className="h-full bg-primary-500 transition-all duration-500"
                style={{ width: `${step === 99 ? 100 : (step / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-8 md:p-12">
              {step < 99 ? (
                <div key="quiz-questions" className="animate-fade-in-up">
                  <div className="text-sm font-bold text-primary-600 mb-4">Soalan {step} dari {questions.length}</div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">{questions[step-1].question}</h2>
                  
                  <div className="space-y-4">
                    {questions[step-1].options.map((opt) => (
                      <button 
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full text-left p-6 rounded-2xl border-2 border-slate-200 hover:border-primary-500 hover:bg-primary-50 font-semibold text-slate-700 hover:text-primary-700 transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div key="quiz-results" className="text-center animate-fade-in-up py-8">
                  <div className="w-20 h-20 bg-success-100 text-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Analisis Selesai!</h2>
                  <p className="text-lg text-slate-600 mb-8">Berdasarkan profil anda, broker yang paling sesuai untuk gaya trading anda ialah:</p>
                  
                  <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl shadow-primary-500/30">
                    <h3 className="text-4xl font-black mb-2">{getRecommendedBroker()}</h3>
                    <p className="opacity-90">Sangat sesuai untuk keperluan dan saiz modal anda.</p>
                  </div>

                  <Link href={`/broker/${getRecommendedBroker().toLowerCase().replace(' ', '-')}`} className="inline-block w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                    Baca Full Review & Daftar Sekarang
                  </Link>
                  <div className="mt-4">
                    <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-700 font-semibold text-sm">
                      Mula Semula Kuiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
