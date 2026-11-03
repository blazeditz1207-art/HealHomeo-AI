
import Link from "next/link";
import {
  Activity, ArrowRight, BrainCircuit, ShieldCheck,
  Stethoscope, HeartPulse, FileText, BookOpen,
  CalendarDays, Sparkles, ChevronRight
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-powered assistance",
    text: "Organize health information and prepare structured consultation summaries."
  },
  {
    icon: Stethoscope,
    title: "Practitioner workspace",
    text: "A dedicated environment for case documentation and practice management."
  },
  {
    icon: HeartPulse,
    title: "Patient health companion",
    text: "Keep health documents, appointments and consultation notes organized."
  },
  {
    icon: BookOpen,
    title: "Evidence explorer",
    text: "Explore traditional references alongside independently assessed scientific evidence."
  }
];

export default function Home() {
  return (
    <main className="site">

      <nav className="site-nav">
        <Link href="/" className="brand">
          <span className="brand-symbol">✳</span>
          HealHomeo <span className="brand-ai">AI</span>
        </Link>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#platform">Platform</a>
          <a href="#about">About</a>
        </div>

        <Link href="/dashboard" className="nav-cta">
          Launch Platform <ArrowRight size={16}/>
        </Link>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14}/> INTELLIGENCE MEETS CARE
          </div>

          <h1>
            A smarter way to
            <span> organize healthcare.</span>
          </h1>

          <p>
            One connected platform for patients and homeopathic
            practitioners. Organize health information, prepare
            consultations and explore knowledge with AI assistance.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard?role=patient" className="primary-btn">
              Explore Patient Portal <ArrowRight size={17}/>
            </Link>

            <Link href="/dashboard?role=practitioner" className="outline-btn">
              Practitioner Portal
            </Link>
          </div>

          <div className="trust-line">
            <ShieldCheck size={17}/>
            Privacy-conscious design · Evidence-aware information
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-one"/>
          <div className="visual-orbit orbit-two"/>

          <div className="visual-center">
            <div className="visual-logo"><Activity size={43}/></div>
            <h3>HealHomeo AI</h3>
            <span>CONNECTED CARE ECOSYSTEM</span>
          </div>

          <div className="floating-card floating-top">
            <BrainCircuit size={20}/>
            <div>
              <b>AI Intelligence</b>
              <small>Structured assistance</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <HeartPulse size={20}/>
            <div>
              <b>Health Workspace</b>
              <small>Patient-centred records</small>
            </div>
          </div>
        </div>
      </section>

      <section className="audience-section" id="platform">
        <div className="section-heading">
          <span className="eyebrow">ONE PLATFORM · TWO EXPERIENCES</span>
          <h2>Designed around the people who matter.</h2>
          <p>Different workflows. One connected ecosystem.</p>
        </div>

        <div className="audience-grid">
          <article className="audience-card patient-card">
            <div className="audience-icon"><HeartPulse size={27}/></div>
            <span className="card-label">FOR INDIVIDUALS</span>
            <h3>Your health, better organized.</h3>
            <p>
              Prepare for consultations, organize personal health
              documents and keep track of appointments.
            </p>
            <Link href="/dashboard?role=patient">
              Enter Patient Portal <ChevronRight size={17}/>
            </Link>
          </article>

          <article className="audience-card practitioner-card">
            <div className="audience-icon"><Stethoscope size={27}/></div>
            <span className="card-label">FOR PRACTITIONERS</span>
            <h3>Your practice, intelligently organized.</h3>
            <p>
              Explore case documentation, patient workflows,
              research references and AI-assisted summaries.
            </p>
            <Link href="/dashboard?role=practitioner">
              Enter Practitioner Portal <ChevronRight size={17}/>
            </Link>
          </article>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">THE ECOSYSTEM</span>
          <h2>Everything connected. Nothing complicated.</h2>
          <p>Tools designed to make healthcare information easier to manage.</p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon"><Icon size={24}/></div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="closing-section" id="about">
        <div>
          <span className="eyebrow">HEALHOMEO AI</span>
          <h2>Better organized care starts with better information.</h2>
          <p>
            An AI-assisted information and practice-management platform.
            AI outputs are informational and require appropriate professional review.
          </p>
        </div>
        <Link href="/dashboard" className="primary-btn">
          Explore the platform <ArrowRight size={17}/>
        </Link>
      </section>

      <footer className="site-footer">
        <Link href="/" className="brand">
          ✳ HealHomeo <span className="brand-ai">AI</span>
        </Link>
        <span>© 2026 HealHomeo AI · Demonstration platform</span>
        <span>Not a diagnostic or emergency service.</span>
      </footer>

    </main>
  );
      }
            
