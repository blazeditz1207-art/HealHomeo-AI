# HealHomeo AI v1.0

A responsive Next.js dual-portal demonstration for patient and homeopathic practitioner workflows. Includes a landing page, role-switchable dashboard, fictional sample records, evidence information, and an optional Gemini-powered information/documentation assistant.

## Quick start

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and optionally set `GEMINI_API_KEY` and a currently supported `GEMINI_MODEL`.
4. Run `npm run dev` and open http://localhost:3000.

## GitHub and Vercel

Unzip, create a new GitHub repository, upload the project files (including `app/` and `package.json`, not the enclosing folder if you want the project at repository root). Import the repository into Vercel using the Next.js preset. Add `GEMINI_API_KEY` and `GEMINI_MODEL` in Vercel project environment variables if you want live AI responses. Never commit `.env.local`.

## What works

- Responsive landing page and navigation
- Patient/practitioner role switcher and sample dashboards
- Fictional sample appointments, records, evidence and privacy views
- Optional server-side Gemini AI endpoint, with input length limit and safety-oriented system instructions
- No AI key required for the demo to run

## Important limitations

This is a **demo**, not a production clinical system. No authentication, verified practitioner access, patient consent enforcement, persistent database, actual bookings, real document uploads, audit logging, rate limiting, or comprehensive medical safety evaluation is implemented. The two roles are illustrative only and not an authorization boundary. Do not enter real personal or patient health information. The AI model may make mistakes and must not be used to diagnose, prescribe, or replace qualified medical care. Homeopathy has not been established as an effective treatment for health conditions by high-quality evidence. For a production launch, implement authenticated access, row-level security, privacy controls, clinical review, abuse protection and applicable legal compliance.
