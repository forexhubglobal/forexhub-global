import ScamList from '@/components/ScamList';

import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function ScamAlertPage() {
  // Fetch scams
  let scams = [];
  try {
    const scamsPath = path.join(process.cwd(), 'content', 'scams.json');
    if (fs.existsSync(scamsPath)) {
      scams = JSON.parse(fs.readFileSync(scamsPath, 'utf-8'));
    }
  } catch (err) {
    console.error('Error fetching scams:', err);
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col font-sans selection:bg-danger-500 selection:text-white">
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-danger-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Senarai <span className="text-danger-600">Scam Alert</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Pusat rujukan utama untuk mengenali entiti, broker, dan skim penipuan pelaburan. Lindungi modal anda daripada terjebak dengan sindiket penipuan.
            </p>
          </div>

          <ScamList initialScams={scams} />
          
        </div>
      </main>

    </div>
  );
}
