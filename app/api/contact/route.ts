import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zohocloud.ca',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message, website } = body;

    // Honeypot — bots fill this, humans don't
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Validation
    const errors: Record<string, string> = {};
    if (!name?.trim())    errors.name    = 'Name is required';
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                          errors.email   = 'Valid email is required';
    if (!phone?.trim())   errors.phone   = 'Phone number is required';
    if (!service?.trim()) errors.service = 'Please select a service';
    if (!message?.trim() || message.trim().length < 20)
                          errors.message = 'Message must be at least 20 characters';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Singh Construction Calgary" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `New Enquiry: ${service} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px;">
          <div style="background:#0D0D0D;padding:20px 24px;border-radius:6px 6px 0 0;text-align:center;">
            <h1 style="color:#fcb900;margin:0;font-size:20px;letter-spacing:1px;">SINGH CONSTRUCTION CALGARY</h1>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px;">New Client Enquiry</p>
          </div>
          <div style="background:#fff;padding:28px 24px;border-radius:0 0 6px 6px;border:1px solid #e5e5e5;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;width:140px;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a1a;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#1a1a1a;"><a href="mailto:${email}" style="color:#fcb900;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#1a1a1a;"><a href="tel:${phone}" style="color:#fcb900;">${phone}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;">Service</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#1a1a1a;">${service}</td></tr>
              ${budget ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;">Budget</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#1a1a1a;">${budget}</td></tr>` : ''}
              <tr><td style="padding:10px 0;color:#666;font-size:13px;vertical-align:top;">Message</td>
                  <td style="padding:10px 0;color:#1a1a1a;line-height:1.7;">${message.replace(/\n/g, '<br>')}</td></tr>
            </table>
            <div style="margin-top:24px;padding:14px 18px;background:#fcb900;border-radius:6px;text-align:center;">
              <a href="mailto:${email}" style="color:#0D0D0D;font-weight:700;font-size:14px;text-decoration:none;">Reply to ${name} →</a>
            </div>
          </div>
          <p style="text-align:center;color:#999;font-size:11px;margin-top:16px;">Submitted from singhconstructions.ca</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
