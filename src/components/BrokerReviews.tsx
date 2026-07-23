"use client";

import { useState, useEffect } from 'react';

type Review = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  comment: string;
  date: string;
  adminReply?: string;
};

export default function BrokerReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchReviews();
  }, [slug]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !comment.trim()) return;

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, email, phone, rating, comment })
      });

      if (res.ok) {
        const data = await res.json();
        // Prepend new review to the list
        setReviews([data.review, ...reviews]);
        
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setRating(5);
        setComment('');
        setMessage({ type: 'success', text: 'Komen anda berjaya dihantar!' });
        
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        setMessage({ type: 'error', text: 'Gagal menghantar komen. Sila cuba lagi.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ralat pelayan. Sila cuba lagi nanti.' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < count ? 'text-gold-500' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Ulasan Pengguna</h2>
          <p className="text-slate-500 text-sm">Baca pengalaman pedagang lain atau kongsikan pengalaman anda sendiri.</p>
        </div>
        
        {/* Rating Summary */}
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
          <div className="text-3xl font-black text-slate-900">{averageRating}</div>
          <div>
            <div className="flex">{renderStars(Math.round(Number(averageRating)))}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{reviews.length} Ulasan Keseluruhan</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-8 md:gap-10">
        
        {/* Submit Review Form */}
        <div className="md:col-span-1">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 md:sticky md:top-28">
            <h3 className="font-bold text-slate-900 mb-4">Tinggalkan Ulasan</h3>
            
            {message.text && (
              <div className={`p-3 mb-4 rounded-lg text-sm font-semibold ${message.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  placeholder="Nama atau Alias"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Emel</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  placeholder="emel@anda.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">No Telefon</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Penilaian (Bintang)</label>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${rating >= star ? 'text-gold-500 hover:bg-gold-50' : 'text-slate-300 hover:text-gold-400 hover:bg-slate-100'}`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Komen Anda</label>
                <textarea 
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder="Kongsikan pengalaman anda dengan broker ini..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors disabled:opacity-50"
              >
                {submitting ? 'Menghantar...' : 'Hantar Ulasan'}
              </button>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-6">
          {loading ? (
            <div className="text-center py-10 text-slate-500 animate-pulse">Memuatkan ulasan...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">Belum Ada Ulasan</h3>
              <p className="text-slate-500 text-sm">Jadilah orang pertama yang meninggalkan ulasan untuk broker ini.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{review.name}</h4>
                      <div className="text-xs text-slate-400">
                        {new Date(review.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-slate-600 mt-3 whitespace-pre-wrap break-words">{review.comment}</p>
                
                {/* Admin Reply Box */}
                {review.adminReply && (
                  <div className="mt-4 bg-slate-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      <h5 className="font-bold text-slate-900 text-sm">Balasan dari ForexHub Global</h5>
                    </div>
                    <p className="text-slate-700 text-sm whitespace-pre-wrap break-words">{review.adminReply}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
      </div>
    </section>
  );
}
