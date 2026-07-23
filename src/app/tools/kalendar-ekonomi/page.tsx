import KalendarEkonomi from '@/components/KalendarEkonomi';

export const metadata = {
  title: 'Kalendar Ekonomi - ForexHub Global',
  description: 'Kalendar ekonomi forex terkini dengan update masa nyata. Pantau berita dan event penting yang menggerakkan pasaran.',
};

export default function EconomicCalendarPage() {
  return (
    <>
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Kalendar Ekonomi Masa Nyata</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pantau jadual berita ekonomi penting seperti NFP, CPI, dan FOMC untuk merancang strategi trading anda.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-2 sm:p-6">
            <KalendarEkonomi />
          </div>
        </div>
      </main>
    </>
  );
}
