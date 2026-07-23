"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type ContentType = 'articles' | 'brokers' | 'prop-firms' | 'bonus' | 'pamm' | 'leads' | 'omni-leads' | 'reviews' | 'scams' | 'settings';

// --- Helper Component untuk Pilihan (Multi-Select) ---
const MultiSelect = ({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) => {
  const selected = value.split(',').map(s => s.trim()).filter(Boolean);
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(o => o !== opt).join(', '));
    } else {
      onChange([...selected, opt].join(', '));
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-all ${
            selected.includes(opt) 
              ? 'bg-primary-600 border-primary-600 text-white shadow-sm' 
              : 'bg-white border-slate-200 text-slate-700 hover:border-primary-300 hover:bg-primary-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default function AdminPage() {
  const [contentType, setContentType] = useState<ContentType>('articles');
  const [itemsList, setItemsList] = useState<{slug: string, title: string}[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('new');
  const [leadsList, setLeadsList] = useState<any[]>([]);
  const [omniLeadsList, setOmniLeadsList] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [scamsList, setScamsList] = useState<any[]>([]);

  
  // Base State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  
  // Articles State
  const [category, setCategory] = useState('Edukasi');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  
  // Brokers State
  const [logo, setLogo] = useState('');
  const [rating, setRating] = useState('5.0');
  const [minDeposit, setMinDeposit] = useState('10');
  const [leverage, setLeverage] = useState('1:1000');
  const [spread, setSpread] = useState('0.0');
  const [regulators, setRegulators] = useState('FCA, CySEC, ASIC');
  const [isAd, setIsAd] = useState('false');
  const [isHidden, setIsHidden] = useState('false');
  // Extended Broker Details
  const [tradingDesk, setTradingDesk] = useState('STP/ECN');
  const [platforms, setPlatforms] = useState('MT4, MT5');
  const [assetClasses, setAssetClasses] = useState('Forex, Crypto, Metals, Indices');
  const [accountTypes, setAccountTypes] = useState('Standard, Raw Spread');
  const [baseCurrencies, setBaseCurrencies] = useState('USD, EUR, MYR');
  const [fundingMethods, setFundingMethods] = useState('Local Bank, Crypto, Visa');
  const [swapFree, setSwapFree] = useState('Ada (Islamic Account)');
  const [copyTrading, setCopyTrading] = useState('Ada (AutoTrade)');
  
  // Prop Firms State
  const [fee, setFee] = useState('49');
  const [maxFunding, setMaxFunding] = useState('400000');
  const [profitSplit, setProfitSplit] = useState('80');

  // Shared Link State (For Brokers & Prop Firms)
  const [affiliateLink, setAffiliateLink] = useState('https://');

  // Bonus State
  const [bonusType, setBonusType] = useState('No Deposit Bonus');
  const [bonusAmount, setBonusAmount] = useState('$30');
  const [bonusLink, setBonusLink] = useState('https://');

  const [whatsappNumber, setWhatsappNumber] = useState('60123456789');
  const [whatsappMessage, setWhatsappMessage] = useState('Hi ForexHubGlobal, saya nak tanya tentang broker...');
  const [supportEmail, setSupportEmail] = useState('support@forexhub.com.my');
  const [businessEmail, setBusinessEmail] = useState('partners@forexhub.com.my');
  const [operatingHours, setOperatingHours] = useState('Isnin - Jumaat, 9:00 Pagi - 6:00 Petang');

  // Ad Settings State
  const [heroAdImage, setHeroAdImage] = useState('');
  const [heroAdLink, setHeroAdLink] = useState('');
  const [articleAdImage, setArticleAdImage] = useState('');
  const [articleAdLink, setArticleAdLink] = useState('');
  const [mobileAdImage, setMobileAdImage] = useState('');
  const [mobileAdLink, setMobileAdLink] = useState('');
  const [sponsoredBrokerName, setSponsoredBrokerName] = useState('');
  const [sponsoredBrokerLogo, setSponsoredBrokerLogo] = useState('');
  const [sponsoredBrokerLink, setSponsoredBrokerLink] = useState('');

  // PAMM State
  const [manager, setManager] = useState('');
  const [strategy, setStrategy] = useState('');
  const [monthlyReturn, setMonthlyReturn] = useState('10-20%');
  const [riskLevel, setRiskLevel] = useState('Medium');
  const [minInvest, setMinInvest] = useState('100');
  const [pammLink, setPammLink] = useState('https://');

  // Scams State
  const [scamName, setScamName] = useState('');
  const [scamCategory, setScamCategory] = useState('Broker Palsu');
  const [scamReason, setScamReason] = useState('');
  const [scamStatus, setScamStatus] = useState('Sah Scam');

  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null, message: string }>({ type: null, message: '' });
  const [uploadStatus, setUploadStatus] = useState('');
  const [coverUploadStatus, setCoverUploadStatus] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Read URL params on initial load for direct edit links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type');
      const slug = params.get('slug');
      if (type) {
        setContentType(type as ContentType);
      }
      if (slug) {
        // We set a small timeout to ensure the list is fetched first by the other useEffect
        setTimeout(() => setSelectedSlug(slug), 500);
      }
    }
  }, []);

  // Fetch list when content type changes
  useEffect(() => {
    if (contentType === 'leads') {
      fetch('/api/get-leads')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setLeadsList(data.leads);
          }
        })
        .catch(err => console.error(err));
      return;
    }
    
    if (contentType === 'omni-leads') {
      fetch('/api/get-omni-leads')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOmniLeadsList(data.leads);
          }
        })
        .catch(err => console.error(err));
      return;
    }

    if (contentType === 'reviews') {
      fetch('/api/admin/reviews')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setReviewsList(data.reviews);
          }
        })
        .catch(err => console.error(err));
      return;
    }

    if (contentType === 'scams') {
      fetch('/api/scams')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setScamsList(data.scams);
          }
        })
        .catch(err => console.error(err));
      return;
    }

    if (contentType === 'settings') return;

    fetch(`/api/get-articles?collection=${contentType}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setItemsList(data.items);
          setSelectedSlug('new');
          resetForm();
        }
      })
      .catch(err => console.error(err));
  }, [contentType]);

  // Fetch specific item
  useEffect(() => {
    if (selectedSlug === 'new' || contentType === 'settings') {
      if (contentType === 'settings') {
         fetch(`/api/get-article?collection=settings&slug=main`)
         .then(res => res.json())
         .then(data => {
           if (data.success) {
             setWhatsappNumber(data.item.whatsappNumber || '60123456789');
             setWhatsappMessage(data.item.whatsappMessage || 'Hi ForexHubGlobal...');
             setSupportEmail(data.item.supportEmail || 'support@forexhub.com.my');
             setBusinessEmail(data.item.businessEmail || 'partners@forexhub.com.my');
             setOperatingHours(data.item.operatingHours || 'Isnin - Jumaat, 9:00 Pagi - 6:00 Petang');
             
             setHeroAdImage(data.item.heroAdImage || '');
             setHeroAdLink(data.item.heroAdLink || '');
             setArticleAdImage(data.item.articleAdImage || '');
             setArticleAdLink(data.item.articleAdLink || '');
             setMobileAdImage(data.item.mobileAdImage || '');
             setMobileAdLink(data.item.mobileAdLink || '');
             setSponsoredBrokerName(data.item.sponsoredBrokerName || '');
             setSponsoredBrokerLogo(data.item.sponsoredBrokerLogo || '');
             setSponsoredBrokerLink(data.item.sponsoredBrokerLink || '');
           }
         })
      } else {
        resetForm();
      }
      return;
    }

    fetch(`/api/get-article?collection=${contentType}&slug=${selectedSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const item = data.item;
          setTitle(item.title);
          setContent(item.rawContent);
          setOriginalSlug(item.slug);
          
          if (contentType === 'articles') {
            setCategory(item.category || 'Edukasi');
            setExcerpt(item.excerpt || '');
            setCoverImage(item.image?.startsWith('bg-') ? '' : (item.image || ''));
          } else if (contentType === 'brokers') {
            setLogo(item.logo || '');
            setRating(item.rating || '5.0');
            setMinDeposit(item.minDeposit || '10');
            setLeverage(item.leverage || '1:1000');
            setSpread(item.spread || '0.0');
            setRegulators(item.regulators || '');
            setAffiliateLink(item.affiliateLink || 'https://');
            setIsAd(item.isAd || 'false');
            setIsHidden(item.isHidden || 'false');
            setTradingDesk(item.tradingDesk || '');
            setPlatforms(item.platforms || '');
            setAssetClasses(item.assetClasses || '');
            setAccountTypes(item.accountTypes || '');
            setBaseCurrencies(item.baseCurrencies || '');
            setFundingMethods(item.fundingMethods || '');
            setSwapFree(item.swapFree || '');
            setCopyTrading(item.copyTrading || '');
          } else if (contentType === 'prop-firms') {
            setLogo(item.logo || '');
            setFee(item.fee || '49');
            setMaxFunding(item.maxFunding || '400000');
            setProfitSplit(item.profitSplit || '80');
            setAffiliateLink(item.affiliateLink || 'https://');
          } else if (contentType === 'bonus') {
            setLogo(item.logo || '');
            setBonusType(item.bonusType || 'No Deposit Bonus');
            setBonusAmount(item.bonusAmount || '$30');
            setBonusLink(item.bonusLink || 'https://');
          } else if (contentType === 'pamm') {
            setLogo(item.logo || '');
            setManager(item.manager || '');
            setStrategy(item.strategy || '');
            setMonthlyReturn(item.monthlyReturn || '10-20%');
            setRiskLevel(item.riskLevel || 'Medium');
            setMinInvest(item.minInvest || '100');
            setPammLink(item.pammLink || 'https://');
          }
        }
      })
      .catch(err => console.error(err));
  }, [selectedSlug, contentType]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setOriginalSlug('');
    setCategory('Edukasi');
    setExcerpt('');
    setCoverImage('');
    setLogo('');
    setRating('5.0');
    setMinDeposit('10');
    setLeverage('1:1000');
    setSpread('0.0');
    setRegulators('');
    setIsAd('false');
    setIsHidden('false');
    setTradingDesk('STP/ECN');
    setPlatforms('MT4, MT5');
    setAssetClasses('Forex, Crypto, Metals, Indices');
    setAccountTypes('Standard, Raw Spread');
    setBaseCurrencies('USD, EUR, MYR');
    setFundingMethods('Local Bank, Crypto, Visa');
    setSwapFree('Ada (Islamic Account)');
    setCopyTrading('Ada (AutoTrade)');
    setFee('49');
    setMaxFunding('400000');
    setProfitSplit('80');
    setAffiliateLink('https://');
    setBonusType('No Deposit Bonus');
    setBonusAmount('$30');
    setBonusLink('https://');
    setManager('');
    setStrategy('');
    setMonthlyReturn('10-20%');
    setRiskLevel('Medium');
    setMinInvest('100');
    setPammLink('https://');
    setScamName('');
    setScamCategory('Broker Palsu');
    setScamReason('');
    setScamStatus('Sah Scam');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Menyimpan data...' });

    let payload: any = { collection: contentType, originalSlug, title, content };

    if (contentType === 'articles') {
      payload = { ...payload, category, excerpt, image: coverImage || 'bg-primary-500', author: 'Admin ForexHub' };
    } else if (contentType === 'brokers') {
      payload = { ...payload, logo, rating, minDeposit, leverage, spread, regulators, affiliateLink, isAd, isHidden, tradingDesk, platforms, assetClasses, accountTypes, baseCurrencies, fundingMethods, swapFree, copyTrading };
    } else if (contentType === 'prop-firms') {
      payload = { ...payload, logo, fee, maxFunding, profitSplit, affiliateLink };
    } else if (contentType === 'bonus') {
      payload = { ...payload, logo, bonusType, bonusAmount, bonusLink };
    } else if (contentType === 'pamm') {
      payload = { ...payload, logo, manager, strategy, monthlyReturn, riskLevel, minInvest, pammLink };
    } else if (contentType === 'settings') {
      payload = { 
        collection: 'settings', originalSlug: 'main', title: 'Tetapan Utama', 
        whatsappNumber, whatsappMessage, 
        supportEmail, businessEmail, operatingHours,
        heroAdImage, heroAdLink, articleAdImage, articleAdLink, mobileAdImage, mobileAdLink, sponsoredBrokerName, sponsoredBrokerLogo, sponsoredBrokerLink
      };
    }

    if (contentType === 'scams') {
      try {
        const res = await fetch('/api/admin/scams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: scamName, category: scamCategory, reason: scamReason, status: scamStatus }),
        });
        const data = await res.json();
        if (res.ok) {
          setStatus({ type: 'success', message: 'Rekod scam berjaya ditambah!' });
          resetForm();
          setScamsList([data.scam, ...scamsList]);
        } else {
          setStatus({ type: 'error', message: data.error || 'Gagal menyimpan rekod.' });
        }
      } catch (error) {
        setStatus({ type: 'error', message: 'Masalah rangkaian komputer.' });
      }
      return;
    }

    try {
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Berjaya disimpan!' });
        if (selectedSlug === 'new' && contentType !== 'settings') resetForm();
        
        // Refresh list
        if (contentType !== 'settings') {
          fetch(`/api/get-articles?collection=${contentType}`)
            .then(r => r.json())
            .then(d => { if(d.success) setItemsList(d.items); });
        }

      } else {
        setStatus({ type: 'error', message: data.error || 'Gagal menyimpan data.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Masalah rangkaian komputer.' });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetType: 'markdown' | 'cover' | 'sponsorLogo' | 'heroAd' | 'articleAd' | 'mobileAd') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (targetType === 'markdown') setUploadStatus('Memuat naik...');
    else setCoverUploadStatus('Memuat naik...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        if (targetType === 'cover') {
          setCoverUploadStatus('');
          if (contentType === 'articles') setCoverImage(data.url);
          else setLogo(data.url);
        } else if (targetType === 'sponsorLogo') {
          setCoverUploadStatus('');
          setSponsoredBrokerLogo(data.url);
        } else if (targetType === 'heroAd') {
          setCoverUploadStatus('');
          setHeroAdImage(data.url);
        } else if (targetType === 'articleAd') {
          setCoverUploadStatus('');
          setArticleAdImage(data.url);
        } else if (targetType === 'mobileAd') {
          setCoverUploadStatus('');
          setMobileAdImage(data.url);
        } else {
          setUploadStatus('Berjaya dimuat naik!');
          setContent(prev => prev + `\n![Gambar](${data.url})\n`);
        }
      } else {
        if (targetType === 'markdown') setUploadStatus('Gagal: ' + data.error);
        else setCoverUploadStatus('Gagal memuat naik.');
      }
    } catch (error) {
      if (targetType === 'markdown') setUploadStatus('Ralat rangkaian.');
      else setCoverUploadStatus('Ralat rangkaian.');
    }

    e.target.value = ''; // Reset directly on the event target
  };

  const handleDeleteReview = async (slug: string, id: string) => {
    if (!confirm('Pasti ingin memadam ulasan ini?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?slug=${slug}&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviewsList(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const handleDeleteScam = async (id: string) => {
    if (!confirm('Pasti ingin memadam rekod scam ini?')) return;
    try {
      const res = await fetch(`/api/admin/scams?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setScamsList(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error('Error deleting scam:', err);
    }
  };

  const handleReplyReview = async (slug: string, id: string) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, id, adminReply: replyText })
      });
      if (res.ok) {
        setReviewsList(prev => prev.map(r => r.id === id ? { ...r, adminReply: replyText } : r));
        setReplyingTo(null);
        setReplyText('');
      }
    } catch (err) {
      console.error('Error replying to review:', err);
    }
  };

  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Papan Pemuka Admin</h1>
            <p className="text-slate-600">Pusat kawalan CMS untuk ForexHub Global.</p>
          </div>

          {/* Jenis Konten */}
          <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
            {[{id: 'articles', label: '📝 Artikel / Berita'}, {id: 'brokers', label: '🏦 Broker'}, {id: 'prop-firms', label: '🎯 Prop Firm'}, {id: 'bonus', label: '🎁 Bonus'}, {id: 'pamm', label: '📈 Akaun PAMM'}, {id: 'leads', label: '👥 Senarai Leads'}, {id: 'omni-leads', label: '🤖 OMNI Leads'}, {id: 'reviews', label: '⭐ Ulasan'}, {id: 'scams', label: '🚨 Scam Alert'}, {id: 'settings', label: '⚙️ Tetapan Umum'}].map(type => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id as ContentType)}
                className={`flex-none sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  contentType === type.id 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Pemilih Item (Hidden for Leads & Reviews & Scams) */}
          {contentType !== 'leads' && contentType !== 'omni-leads' && contentType !== 'reviews' && contentType !== 'scams' && contentType !== 'settings' && (
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Rekod (Kosongkan untuk tambah baru):</label>
              <select 
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none font-medium text-slate-700"
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
              >
                <option value="new">✨ + Tambah Baru</option>
                <optgroup label="Senarai Sedia Ada">
                  {itemsList.map(a => (
                    <option key={a.slug} value={a.slug}>✏️ {a.title}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            {contentType === 'omni-leads' ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Senarai Prospek OMNI AI</h2>
                {omniLeadsList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    Tiada data leads dijumpai.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200">
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Tarikh</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Nama</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Emel</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Telefon</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {omniLeadsList.map((lead, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">
                              {new Date(lead.date).toLocaleDateString('ms-MY')} {new Date(lead.date).toLocaleTimeString('ms-MY')}
                            </td>
                            <td className="py-3 px-4 text-sm font-semibold text-slate-900">{lead.name}</td>
                            <td className="py-3 px-4 text-sm text-slate-600">{lead.email}</td>
                            <td className="py-3 px-4 text-sm text-slate-600 font-mono">{lead.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : contentType === 'leads' ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Senarai Prospek (Leads)</h2>
                {leadsList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    Tiada data leads dijumpai.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200">
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Tarikh</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Nama</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Telefon</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Modal</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Instrumen</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Keperluan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leadsList.map(lead => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">
                              {new Date(lead.date).toLocaleDateString('ms-MY')}
                            </td>
                            <td className="py-3 px-4 text-sm font-bold text-slate-900 whitespace-nowrap">{lead.name}</td>
                            <td className="py-3 px-4 text-sm font-bold text-primary-600 whitespace-nowrap">{lead.phone}</td>
                            <td className="py-3 px-4 text-sm text-slate-700 whitespace-nowrap">{lead.modalAmt}</td>
                            <td className="py-3 px-4 text-sm text-slate-700 whitespace-nowrap">{lead.instrument}</td>
                            <td className="py-3 px-4 text-sm text-slate-500">{lead.requirements || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : contentType === 'reviews' ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Moderasi Ulasan Pengguna</h2>
                {reviewsList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    Tiada ulasan dijumpai.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviewsList.map(review => (
                      <div key={review.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm relative">
                        
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                              Broker: {review.slug}
                            </span>
                            <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                              {review.name}
                              <span className="text-gold-500 flex text-sm">
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                              </span>
                            </h4>
                            <div className="text-xs text-slate-500 mt-1 flex flex-col sm:flex-row gap-1 sm:gap-4">
                              <span>📅 {new Date(review.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                              {review.email && <span>📧 {review.email}</span>}
                              {review.phone && <span>📱 {review.phone}</span>}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setReplyingTo(replyingTo === review.id ? null : review.id);
                                setReplyText(review.adminReply || '');
                              }}
                              className="bg-white text-primary-600 hover:bg-primary-50 border border-primary-200 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                            >
                              Balas
                            </button>
                            <button 
                              onClick={() => handleDeleteReview(review.slug, review.id)}
                              className="bg-white text-danger-600 hover:bg-danger-50 border border-danger-200 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                            >
                              Padam
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-slate-700 mt-2 whitespace-pre-wrap text-sm break-words">{review.comment}</p>
                        
                        {review.adminReply && replyingTo !== review.id && (
                          <div className="mt-4 bg-primary-50 border border-primary-100 rounded-lg p-3">
                            <p className="text-xs font-bold text-primary-800 mb-1">Balasan Anda (Admin):</p>
                            <p className="text-sm text-primary-900 whitespace-pre-wrap break-words">{review.adminReply}</p>
                          </div>
                        )}

                        {replyingTo === review.id && (
                          <div className="mt-4 bg-white border border-primary-200 rounded-lg p-4 shadow-sm">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Teks Balasan Rasmi</label>
                            <textarea
                              rows={3}
                              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Terima kasih atas sokongan anda..."
                            />
                            <div className="flex justify-end gap-2 mt-3">
                              <button 
                                onClick={() => setReplyingTo(null)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                              >
                                Batal
                              </button>
                              <button 
                                onClick={() => handleReplyReview(review.slug, review.id)}
                                className="px-4 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
                              >
                                Simpan Balasan
                              </button>
                            </div>
                          </div>
                        )}
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : contentType === 'scams' ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 text-danger-600 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Pengurusan Scam Alert
                </h2>
                
                {status.type && (
                  <div className={`p-4 rounded-xl mb-6 font-semibold ${status.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'}`}>
                    {status.message}
                  </div>
                )}

                {/* Borang Tambah Scam */}
                <form onSubmit={handleSubmit} className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">Tambah Entiti Penipu Baharu</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Entiti / Syarikat <span className="text-danger-500">*</span></label>
                      <input type="text" required className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-danger-500 outline-none" value={scamName} onChange={(e) => setScamName(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                      <select className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-danger-500 outline-none" value={scamCategory} onChange={(e) => setScamCategory(e.target.value)}>
                        <option value="Broker Palsu">Broker Palsu</option>
                        <option value="Kelas Penipu">Kelas Penipu / Guru</option>
                        <option value="Skim Cepat Kaya">Skim Cepat Kaya / Pelaburan</option>
                        <option value="Individu (Scammer)">Individu (Scammer)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                      <select className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-danger-500 outline-none text-danger-700 font-bold" value={scamStatus} onChange={(e) => setScamStatus(e.target.value)}>
                        <option value="Sah Scam">Sah Scam</option>
                        <option value="Dalam Siasatan">Dalam Siasatan</option>
                        <option value="Amaran">Amaran (Berisiko)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Modus Operandi / Sebab Blacklist <span className="text-danger-500">*</span></label>
                      <textarea required rows={3} className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-danger-500 outline-none resize-none" value={scamReason} onChange={(e) => setScamReason(e.target.value)} placeholder="Contoh: Tidak benarkan pengeluaran wang (withdraw)..." />
                    </div>
                  </div>
                  <button type="submit" className="bg-danger-600 hover:bg-danger-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors">
                    Simpan ke dalam Blacklist
                  </button>
                </form>

                {/* Senarai Scam */}
                <h3 className="font-bold text-slate-800 mb-4 text-lg">Senarai Blacklist Semasa</h3>
                {scamsList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    Tiada rekod scam dijumpai.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200">
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Entiti</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Kategori</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Sebab</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Tarikh Mula</th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {scamsList.map(scam => (
                          <tr key={scam.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-sm font-bold text-slate-900 whitespace-nowrap">
                              {scam.name}
                              <div className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded ${scam.status === 'Sah Scam' ? 'bg-danger-100 text-danger-700' : 'bg-warning-100 text-warning-700'}`}>
                                {scam.status}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{scam.category}</td>
                            <td className="py-3 px-4 text-sm text-slate-600 max-w-xs truncate">{scam.reason}</td>
                            <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">{new Date(scam.dateAdded).toLocaleDateString('ms-MY')}</td>
                            <td className="py-3 px-4 text-sm">
                              <button onClick={() => handleDeleteScam(scam.id)} className="text-danger-600 hover:text-danger-800 font-bold p-2 bg-danger-50 rounded-lg hover:bg-danger-100 transition-colors">Padam</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <>
                {status.type && (
                  <div className={`p-4 rounded-xl mb-6 font-semibold ${status.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'}`}>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Gambar / Logo */}
                  {contentType !== 'settings' && (
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {contentType === 'articles' ? 'Gambar Muka Depan (Cover)' : 'Logo Rasmi (1:1)'}
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
                        {(contentType === 'articles' ? coverImage : logo) ? (
                          <div className={`relative mx-auto mb-4 rounded-lg overflow-hidden border border-slate-200 ${contentType === 'articles' ? 'w-full h-48' : 'w-32 h-32'}`}>
                            <img src={contentType === 'articles' ? coverImage : logo} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => contentType === 'articles' ? setCoverImage('') : setLogo('')}
                              className="absolute top-2 right-2 bg-danger-600 text-white rounded-full p-2 hover:bg-danger-700 shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                          </div>
                        ) : (
                          <div className="py-6">
                            <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <button 
                              type="button"
                              onClick={() => coverInputRef.current?.click()}
                              className="bg-white border border-slate-300 text-slate-700 text-sm font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-slate-50"
                            >
                              {coverUploadStatus || 'Pilih Gambar...'}
                            </button>
                            <input type="file" ref={coverInputRef} onChange={(e) => handleImageUpload(e, 'cover')} accept="image/*" className="hidden" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Title / Name */}
                  {contentType !== 'settings' && (
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {contentType === 'articles' ? 'Tajuk Artikel' : 'Nama Syarikat'} <span className="text-danger-500">*</span>
                      </label>
                      <input 
                        type="text" required
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Settings Field */}
                  {contentType === 'settings' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-primary-50 rounded-xl border border-primary-100">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                          Tetapan WhatsApp
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nombor WhatsApp Admin</label>
                            <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                            <p className="text-xs text-slate-500 mt-2 italic">Gunakan format antarabangsa tanpa '+'. Cth: 60123456789</p>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Mesej Default</label>
                            <textarea rows={2} className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={whatsappMessage} onChange={(e) => setWhatsappMessage(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Maklumat Perhubungan (Halaman Hubungi Kami)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">E-mel Sokongan</label>
                            <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">E-mel Kerjasama Perniagaan</label>
                            <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} />
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Waktu Operasi</label>
                            <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gold-50 rounded-xl border border-gold-200">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="text-xl">💰</span> Tetapan Ruang Iklan (Sponsorship)
                        </h4>
                        
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-bold text-sm text-primary-700 mb-3 border-b border-primary-200 pb-1">1. AI Finder & Tools (Sponsor Utama)</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Broker Penaja</label>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={sponsoredBrokerName} onChange={(e) => setSponsoredBrokerName(e.target.value)} placeholder="Cth: Exness" />
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-sm font-bold text-slate-700">URL Logo Broker</label>
                                  <label className="cursor-pointer bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs font-bold py-1 px-2 rounded">
                                    {coverUploadStatus && sponsoredBrokerLogo === '' ? 'Memuat naik...' : 'Upload'}
                                    <input type="file" onChange={(e) => handleImageUpload(e, 'sponsorLogo')} accept="image/*" className="hidden" />
                                  </label>
                                </div>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={sponsoredBrokerLogo} onChange={(e) => setSponsoredBrokerLogo(e.target.value)} placeholder="https://..." />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Affiliate Link / Referral</label>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={sponsoredBrokerLink} onChange={(e) => setSponsoredBrokerLink(e.target.value)} placeholder="https://..." />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm text-primary-700 mb-3 border-b border-primary-200 pb-1">2. Banner Muka Depan (Hero Banner)</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-sm font-bold text-slate-700">URL Gambar Banner</label>
                                  <label className="cursor-pointer bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs font-bold py-1 px-2 rounded">
                                    Upload
                                    <input type="file" onChange={(e) => handleImageUpload(e, 'heroAd')} accept="image/*" className="hidden" />
                                  </label>
                                </div>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={heroAdImage} onChange={(e) => setHeroAdImage(e.target.value)} placeholder="https://..." />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Link Banner (Destinasi)</label>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={heroAdLink} onChange={(e) => setHeroAdLink(e.target.value)} placeholder="https://..." />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm text-primary-700 mb-3 border-b border-primary-200 pb-1">3. Banner Dalam Artikel (Blog/Berita)</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-sm font-bold text-slate-700">URL Gambar Banner</label>
                                  <label className="cursor-pointer bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs font-bold py-1 px-2 rounded">
                                    Upload
                                    <input type="file" onChange={(e) => handleImageUpload(e, 'articleAd')} accept="image/*" className="hidden" />
                                  </label>
                                </div>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={articleAdImage} onChange={(e) => setArticleAdImage(e.target.value)} placeholder="https://..." />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Link Banner (Destinasi)</label>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={articleAdLink} onChange={(e) => setArticleAdLink(e.target.value)} placeholder="https://..." />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-bold text-sm text-primary-700 mb-3 border-b border-primary-200 pb-1">4. Banner Telefon Terapung (Mobile Sticky)</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-sm font-bold text-slate-700">URL Gambar Banner</label>
                                  <label className="cursor-pointer bg-primary-100 hover:bg-primary-200 text-primary-700 text-xs font-bold py-1 px-2 rounded">
                                    Upload
                                    <input type="file" onChange={(e) => handleImageUpload(e, 'mobileAd')} accept="image/*" className="hidden" />
                                  </label>
                                </div>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={mobileAdImage} onChange={(e) => setMobileAdImage(e.target.value)} placeholder="https://..." />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Link Banner (Destinasi)</label>
                                <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary-500 outline-none" value={mobileAdLink} onChange={(e) => setMobileAdLink(e.target.value)} placeholder="https://..." />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                  {/* Articles Specific Fields */}
                  {contentType === 'articles' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                        <select 
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                          value={category} onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="Review">Review</option>
                          <option value="Panduan">Panduan</option>
                          <option value="Edukasi">Edukasi</option>
                          <option value="Analisis Teknikal">Analisis Teknikal</option>
                          <option value="Berita">Berita</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Ringkasan (Excerpt)</label>
                        <textarea 
                          rows={2}
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                          value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Brokers Specific Fields */}
                  {contentType === 'brokers' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Rating (0-5)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={rating} onChange={(e) => setRating(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Min Deposit (USD)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={minDeposit} onChange={(e) => setMinDeposit(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Max Leverage</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={leverage} onChange={(e) => setLeverage(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Spread Bermula (Pips)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={spread} onChange={(e) => setSpread(e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Regulators</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={regulators} onChange={(e) => setRegulators(e.target.value)} />
                      </div>
                      
                      {/* Extended Fields */}
                      <div className="col-span-2 border-t border-slate-200 mt-2 pt-4">
                        <h4 className="font-bold text-slate-900 mb-4">Maklumat Tambahan Broker (Spesifikasi Penuh)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Platform Trading</label>
                            <MultiSelect 
                              options={['MT4', 'MT5', 'cTrader', 'TradingView', 'WebTrader', 'Proprietary App']} 
                              value={platforms} onChange={setPlatforms} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Jenis Akaun</label>
                            <MultiSelect 
                              options={['Standard', 'Cent/Micro', 'Raw Spread', 'Pro/VIP', 'ECN', 'Zero']} 
                              value={accountTypes} onChange={setAccountTypes} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Instrumen (Asset Classes)</label>
                            <MultiSelect 
                              options={['Forex', 'Crypto', 'Metals', 'Indices', 'Stocks', 'Commodities', 'Energies']} 
                              value={assetClasses} onChange={setAssetClasses} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Jenis Perlaksanaan (Trading Desk)</label>
                            <MultiSelect 
                              options={['STP', 'ECN', 'NDD', 'Market Maker (MM)', 'DMA']} 
                              value={tradingDesk} onChange={setTradingDesk} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Matawang Asas (Base Currencies)</label>
                            <MultiSelect 
                              options={['USD', 'EUR', 'GBP', 'MYR', 'SGD', 'AUD', 'JPY']} 
                              value={baseCurrencies} onChange={setBaseCurrencies} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Kaedah Deposit/Keluaran</label>
                            <MultiSelect 
                              options={['Local Bank Transfer', 'Visa/Mastercard', 'Crypto', 'Skrill/Neteller', 'Perfect Money']} 
                              value={fundingMethods} onChange={setFundingMethods} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Akaun Islamic (Swap Free)</label>
                            <MultiSelect 
                              options={['Ada (Automatik)', 'Ada (By Request)', 'Tiada']} 
                              value={swapFree} onChange={setSwapFree} 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700">Sistem Copy Trading</label>
                            <MultiSelect 
                              options={['PAMM', 'MAM', 'Platform Sendiri', 'ZuluTrade', 'Myfxbook AutoTrade', 'Tiada']} 
                              value={copyTrading} onChange={setCopyTrading} 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 mt-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Link Pendaftaran (Affiliate Link)</label>
                        <input type="text" placeholder="https://" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} />
                      </div>
                      <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm mt-2">
                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-1">Status Paparan Umum (Sembunyikan)</label>
                          <p className="text-xs text-slate-500">Jika aktifkan ini, broker akan disembunyikan sepenuhnya dari laman web (contohnya jika berhenti bayar iklan).</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={isHidden === 'true'} onChange={(e) => setIsHidden(e.target.checked ? 'true' : 'false')} />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>

                      <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-1">Status Tajaan Iklan (AD)</label>
                          <p className="text-xs text-slate-500">Aktifkan butang ini jika broker telah membayar untuk iklan. Simbol 'AD' akan dipaparkan pada logo mereka.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={isAd === 'true'} onChange={(e) => setIsAd(e.target.checked ? 'true' : 'false')} />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Prop Firms Specific Fields */}
                  {contentType === 'prop-firms' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Yuran Bermula (USD)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={fee} onChange={(e) => setFee(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Max Funding (USD)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={maxFunding} onChange={(e) => setMaxFunding(e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Profit Split (%)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={profitSplit} onChange={(e) => setProfitSplit(e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Link Pendaftaran (Affiliate Link)</label>
                        <input type="text" placeholder="https://" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Bonus Specific Fields */}
                  {contentType === 'bonus' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Bonus</label>
                        <select 
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none"
                          value={bonusType} onChange={(e) => setBonusType(e.target.value)}
                        >
                          <option value="No Deposit Bonus">No Deposit Bonus</option>
                          <option value="Deposit Bonus">Deposit Bonus</option>
                          <option value="Cashback">Cashback / Rebate</option>
                          <option value="Contest">Contest / Pertandingan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Jumlah Bonus (Cth: $30, 100%)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Link Pendaftaran (Affiliate Link)</label>
                        <input type="text" placeholder="https://" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={bonusLink} onChange={(e) => setBonusLink(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* PAMM Specific Fields */}
                  {contentType === 'pamm' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nama Pengurus (Manager)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={manager} onChange={(e) => setManager(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Strategi Trading</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={strategy} onChange={(e) => setStrategy(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Pulangan Bulanan (%)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Tahap Risiko</label>
                        <select className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                          <option value="Low">Low (Rendah)</option>
                          <option value="Medium">Medium (Sederhana)</option>
                          <option value="High">High (Tinggi)</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Min Deposit/Invest (USD)</label>
                        <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={minInvest} onChange={(e) => setMinInvest(e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Link Pendaftaran (PAMM / Copytrade Link)</label>
                        <input type="text" placeholder="https://" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none" value={pammLink} onChange={(e) => setPammLink(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Content Box */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-slate-700">Penerangan Penuh (Akan dipaparkan bila butang 'Info' ditekan)</label>
                      <div className="flex items-center gap-3">
                        {uploadStatus && <span className="text-xs text-primary-600 font-medium">{uploadStatus}</span>}
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-200">
                          Gambar Dalam
                        </button>
                        <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e, 'markdown')} accept="image/*" className="hidden" />
                      </div>
                    </div>
                    <textarea 
                      rows={10}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
                      value={content} onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={status.type === 'loading'}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-transform transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                    >
                      {status.type === 'loading' ? 'Menyimpan...' : (selectedSlug === 'new' ? 'Terbitkan Sekarang' : 'Simpan Kemas Kini')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
