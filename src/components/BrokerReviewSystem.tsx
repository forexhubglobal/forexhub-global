'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Star, Send, UserCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: string;
  user_email: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export default function BrokerReviewSystem({ brokerSlug }: { brokerSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchReviews();
    checkUser();
  }, [brokerSlug]);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function fetchReviews() {
    const { data, error } = await supabase
      .from('broker_reviews')
      .select('*')
      .eq('broker_slug', brokerSlug)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    
    if (data) {
      setReviews(data);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    setMessage('');

    const { error } = await supabase.from('broker_reviews').insert({
      user_id: user.id,
      user_email: user.email,
      broker_slug: brokerSlug,
      rating,
      review_text: reviewText,
      status: 'pending' // Admin needs to approve
    });

    if (error) {
      setMessage('Ralat semasa menghantar ulasan.');
      console.error(error);
    } else {
      setMessage('Ulasan dihantar! Ia akan dipaparkan selepas disemak oleh Admin.');
      setReviewText('');
    }
    setSubmitting(false);
  }

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Ulasan Pengguna</h2>
          <p className="text-slate-400">Apa kata trader lain tentang broker ini?</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-gold-400">{avgRating}</div>
          <div className="flex text-gold-400 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={`w-4 h-4 ${i <= Number(avgRating) ? 'fill-gold-400' : 'text-slate-600'}`} />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-1">Daripada {reviews.length} ulasan</p>
        </div>
      </div>

      {/* Review Form */}
      <div className="mb-10 bg-black/40 rounded-xl p-6 border border-white/5">
        {user ? (
          <form onSubmit={handleSubmit}>
            <h3 className="text-white font-bold mb-4">Tulis ulasan anda</h3>
            
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  className={`p-1 transition-transform hover:scale-110 ${i <= rating ? 'text-gold-400 fill-gold-400' : 'text-slate-600'}`}
                >
                  <Star className={`w-8 h-8 ${i <= rating ? 'fill-gold-400' : ''}`} />
                </button>
              ))}
            </div>

            <textarea
              required
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Kongsi pengalaman anda menggunakan broker ini..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue mb-4 min-h-[100px]"
            />
            
            <div className="flex items-center justify-between">
              {message ? (
                <p className="text-neon-blue text-sm font-medium">{message}</p>
              ) : (
                <p className="text-slate-500 text-sm">Ulasan anda akan disemak sebelum diterbitkan.</p>
              )}
              
              <button 
                type="submit"
                disabled={submitting}
                className="bg-neon-blue text-black px-6 py-2 rounded-xl font-bold hover:bg-neon-blue/80 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? 'Menghantar...' : (
                  <>Hantar <Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <UserCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Log Masuk Diperlukan</h3>
            <p className="text-slate-400 mb-4 text-sm">Anda mesti log masuk untuk meninggalkan ulasan dan rating bagi broker ini.</p>
            <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl font-bold transition-colors inline-block border border-white/10">
              Log Masuk Sekarang
            </Link>
          </div>
        )}
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-slate-500 animate-pulse">Memuat turun ulasan...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-slate-500 bg-white/5 rounded-xl">Belum ada ulasan untuk broker ini. Jadilah yang pertama!</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neon-purple/20 text-neon-purple rounded-full flex items-center justify-center font-bold">
                    {review.user_email ? review.user_email[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">
                      {review.user_email ? review.user_email.split('@')[0] : 'Pengguna Tanpa Nama'}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {new Date(review.created_at).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="flex text-gold-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-gold-400' : 'text-slate-600'}`} />
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{review.review_text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
