import { Resend } from 'resend';

// We will initialize resend only if the key exists to avoid crashing if it's not set
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendWelcomeEmail(email: string, name: string) {
  if (!resend) {
    console.log(`[EMAIL PREVIEW] Welcome email to ${email} (API Key not set)`);
    return { success: true, preview: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'ForexHub Global <onboarding@forexhubglobal.com>',
      to: [email],
      subject: 'Selamat Datang ke ForexHub Global! 🚀',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background-color: #09090b; color: white; padding: 20px; border-radius: 10px;">
          <h1 style="color: #00f3ff; text-align: center;">ForexHub Global</h1>
          <p style="font-size: 16px;">Hai ${name},</p>
          <p style="font-size: 16px;">Terima kasih kerana mendaftar dengan ForexHub Global! Permohonan/Pendaftaran anda telah berjaya diterima.</p>
          <p style="font-size: 16px;">Pasukan admin kami sedang menyemak butiran anda dan akan menghubungi anda secepat mungkin untuk langkah seterusnya.</p>
          <br/>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://forexhubglobal.com/dashboard" style="background-color: #00f3ff; color: black; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px;">Log Masuk ke Dashboard</a>
          </div>
          <p style="font-size: 14px; color: #888; text-align: center;">Ini adalah e-mel automatik, sila jangan balas.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { success: false, error: err };
  }
}

export async function sendOmniWelcomeEmail(email: string, name: string) {
  if (!resend) {
    console.log(`[EMAIL PREVIEW] OMNI Welcome email to ${email} (API Key not set)`);
    return { success: true, preview: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'OMNI AI Terminal <omni@forexhubglobal.com>',
      to: [email],
      subject: 'Akses OMNI AI Terminal Anda 🤖',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background-color: #09090b; color: white; padding: 20px; border-radius: 10px; border: 1px solid #bc13fe;">
          <h1 style="color: #bc13fe; text-align: center;">OMNI AI Terminal</h1>
          <p style="font-size: 16px;">Hai ${name},</p>
          <p style="font-size: 16px;">Permohonan anda untuk mendapatkan sistem OMNI AI telah diterima.</p>
          <p style="font-size: 16px;">Oleh kerana sistem ini eksklusif, admin akan melakukan pengesahan profil anda dalam masa 24 jam. Anda akan menerima link muat turun (download) selepas pengesahan berjaya.</p>
          <br/>
          <p style="font-size: 14px; color: #888; text-align: center;">Ini adalah e-mel automatik, sila jangan balas.</p>
        </div>
      `,
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
