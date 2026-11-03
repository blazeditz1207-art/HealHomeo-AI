
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Activity, BookOpen, CalendarDays, ClipboardList,
  FileText, HeartPulse, LayoutDashboard, MessageCircle,
  ShieldCheck, Users, Menu, X, Send, Bell,
  Search, ArrowUpRight, Sparkles, Clock,
  Stethoscope, ChevronRight
} from 'lucide-react';

type Role = 'patient' | 'practitioner';

const patientItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'AI Companion', icon: MessageCircle },
  { name: 'Health Vault', icon: FileText },
  { name: 'Appointments', icon: CalendarDays },
  { name: 'Evidence Explorer', icon: BookOpen },
  { name: 'Privacy & Consent', icon: ShieldCheck }
];

const practitionerItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Case Workspace', icon: ClipboardList },
  { name: 'Patients', icon: Users },
  { name: 'Appointments', icon: CalendarDays },
  { name: 'Research Library', icon: BookOpen },
  { name: 'Documents', icon: FileText }
];

const demoAppointments = [
  { name: 'Demo Patient A', date: 'Nov 03, 2026', time: '10:30 AM', status: 'Confirmed' },
  { name: 'Demo Patient B', date: 'Nov 04, 2026', time: '12:00 PM', status: 'Requested' }
];

export default function Dashboard() {
  const [role, setRole] = useState<Role>('patient');
  const [section, setSection] = useState('Overview');
  const [mobile, setMobile] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{who:string;text:string}[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('role');
    if (selected === 'patient' || selected === 'practitioner') {
      setRole(selected);
    }
  }, []);

  const items = role === 'patient' ? patientItems : practitionerItems;

  function changeRole(newRole: Role) {
    setRole(newRole);
    setSection('Overview');
    setMobile(false);
    setMessages([]);
    window.history.replaceState({}, '', `/dashboard?role=${newRole}`);
  }

  async function sendMessage() {
    const question = input.trim();
    if (!question || busy) return;

    setInput('');
    setMessages(old => [...old, {who:'You',text:question}]);
    setBusy(true);

    try {
      const conversation = [
        ...messages.map(m => ({
          role: m.who === 'You' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: question }
      ];

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          message: question,
          role,
          messages: conversation
        })
      });

      const data = await response.json();

      setMessages(old => [...old, {
        who: 'Assistant',
        text: data.reply || data.error || 'No response available.'
      }]);
    } catch {
      setMessages(old => [...old, {
        who: 'Assistant',
        text: 'Connection unavailable. Please try again.'
      }]);
    } finally {
      setBusy(false);
    }
  }

  const isAssistant = section === 'AI Companion' || section === 'Case Workspace';

  return (
    <div className="app-shell">

      {mobile && <button className="sidebar-overlay" onClick={() => setMobile(false)} aria-label="Close navigation"/>}

      <aside className={`app-sidebar ${mobile ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <Link href="/" className="brand">✳ HealHomeo <span>AI</span></Link>
          <button className="icon-button mobile-only" onClick={() => setMobile(false)}><X/></button>
        </div>

        <div className="role-switch">
          <button className={role === 'patient' ? 'active' : ''} onClick={() => changeRole('patient')}>Patient</button>
          <button className={role === 'practitioner' ? 'active' : ''} onClick={() => changeRole('practitioner')}>Practitioner</button>
        </div>

        <div className="sidebar-caption">WORKSPACE</div>

        <nav className="sidebar-nav">
          {items.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.name}
                className={section === item.name ? 'nav-active' : ''}
                onClick={() => {setSection(item.name);setMobile(false);}}>
                <Icon size={19}/>
                <span>{item.name}</span>
                <ChevronRight size={15} className="nav-chevron"/>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <ShieldCheck size={18}/>
          <div><b>Demo environment</b><small>Fictional data only</small></div>
        </div>
      </aside>

      <div className="app-main">

        <header className="app-header">
          <button className="icon-button mobile-only" onClick={() => setMobile(true)}><Menu/></button>

          <div className="header-title">
            <span>{role.toUpperCase()} PORTAL</span>
            <h2>{section}</h2>
          </div>

          <div className="header-actions">
            <span className="demo-badge"><span/> DEMO MODE</span>
            <button className="icon-button" aria-label="Notifications"><Bell/></button>
            <div className="profile-avatar">{role === 'patient' ? 'P' : 'D'}</div>
          </div>
        </header>

        <main className="dashboard-content">

          {section === 'Overview' && (
            <>
              <section className="dashboard-welcome">
                <div>
                  <span className="welcome-label"><Sparkles size={15}/> YOUR WORKSPACE</span>
                  <h1>{role === 'patient' ? 'Your health, in one place.' : 'Your practice, organized.'}</h1>
                  <p>{role === 'patient'
                    ? 'Keep your health information organized and prepare for better consultations.'
                    : 'Organize case information and explore AI-assisted documentation.'}</p>
                  <button className="welcome-button" onClick={() => setSection(role === 'patient' ? 'AI Companion' : 'Case Workspace')}>
                    Open AI Workspace <ArrowUpRight size={17}/>
                  </button>
                </div>
                <div className="welcome-art"><HeartPulse size={65}/></div>
              </section>

              <div className="section-intro">
                <div><span className="eyebrow">AT A GLANCE</span><h3>Workspace overview</h3></div>
                <span className="sample-label">SAMPLE DATA</span>
              </div>

              <div className="overview-stats">
                {(role === 'patient'
                  ? [
                    {n:'02',label:'Upcoming appointments',icon:CalendarDays},
                    {n:'03',label:'Demo documents',icon:FileText},
                    {n:'01',label:'Consultation briefs',icon:ClipboardList}
                  ]
                  : [
                    {n:'12',label:'Demo patient records',icon:Users},
                    {n:'04',label:'Upcoming consultations',icon:CalendarDays},
                    {n:'08',label:'Draft case notes',icon:FileText}
                  ]
                ).map(stat => {
                  const Icon = stat.icon;
                  return <article className="overview-stat" key={stat.label}>
                    <div className="stat-icon"><Icon size={21}/></div>
                    <strong>{stat.n}</strong>
                    <span>{stat.label}</span>
                  </article>;
                })}
              </div>

              <div className="dashboard-columns">
                <section className="dashboard-panel">
                  <div className="panel-heading">
                    <div><span className="eyebrow">YOUR SCHEDULE</span><h3>Upcoming appointments</h3></div>
                    <CalendarDays size={21}/>
                  </div>
                  {demoAppointments.map(a => (
                    <div className="appointment-row" key={a.name}>
                      <div className="appointment-date"><CalendarDays size={20}/></div>
                      <div className="appointment-details">
                        <b>{role === 'patient' ? 'Demo Practitioner' : a.name}</b>
                        <span>{a.date} · {a.time}</span>
                      </div>
                      <span className="status-tag">{a.status}</span>
                    </div>
                  ))}
                  <button className="text-action" onClick={() => setSection('Appointments')}>View appointments <ArrowUpRight size={16}/></button>
                </section>

                <section className="dashboard-panel">
                  <div className="panel-heading">
                    <div><span className="eyebrow">GET STARTED</span><h3>Quick actions</h3></div>
                    <Activity size={21}/>
                  </div>
                  <button className="action-row" onClick={() => setSection(role === 'patient' ? 'AI Companion' : 'Case Workspace')}>
                    <div className="action-icon"><BrainCircuit size={20}/></div>
                    <span><b>AI Workspace</b><small>Organize information</small></span>
                    <ChevronRight size={17}/>
                  </button>
                  <button className="action-row" onClick={() => setSection(role === 'patient' ? 'Health Vault' : 'Patients')}>
                    <div className="action-icon"><FileText size={20}/></div>
                    <span><b>{role === 'patient' ? 'Health Vault' : 'Patient records'}</b><small>Explore sample records</small></span>
                    <ChevronRight size={17}/>
                  </button>
                  <button className="action-row" onClick={() => setSection(role === 'patient' ? 'Evidence Explorer' : 'Research Library')}>
                    <div className="action-icon"><BookOpen size={20}/></div>
                    <span><b>Research Library</b><small>Explore health information</small></span>
                    <ChevronRight size={17}/>
                  </button>
                </section>
              </div>
            </>
          )}

          {isAssistant && (
            <section className="dashboard-panel assistant-panel">
              <div className="panel-heading">
                <div><span className="eyebrow">HEALHOMEO INTELLIGENCE</span><h3>{section}</h3></div>
                <BrainCircuit size={24}/>
              </div>
              <div className="assistant-notice">
                AI provides informational assistance, not diagnosis or prescriptions. Do not enter identifiable health information.
              </div>
              <div className="chat-messages">
                <div className="chat-bubble assistant-bubble">
                  <Sparkles size={17}/>
                  <p>Welcome to HealHomeo AI. I can help organize general health information and consultation notes. What would you like to explore?</p>
                </div>
                {messages.map((m,i) => (
                  <div key={i} className={`chat-bubble ${m.who === 'You' ? 'user-bubble' : 'assistant-bubble'}`}>
                    <p>{m.text}</p>
                  </div>
                ))}
                {busy && <div className="chat-bubble assistant-bubble"><p>Preparing response...</p></div>}
              </div>
              <form className="chat-composer" onSubmit={e => {e.preventDefault();sendMessage();}}>
                <input value={input} onChange={e => setInput(e.target.value)} maxLength={3000} placeholder="Ask a general health information question..." aria-label="Message"/>
                <button type="submit" disabled={busy || !input.trim()}><Send size={19}/></button>
              </form>
            </section>
          )}

          {!isAssistant && section !== 'Overview' && (
            <section className="dashboard-panel module-panel">
              <div className="panel-heading">
                <div><span className="eyebrow">WORKSPACE MODULE</span><h3>{section}</h3></div>
                <Activity size={23}/>
              </div>

              {section === 'Evidence Explorer' || section === 'Research Library' ? (
                <>
                  <p>Explore traditional homeopathic literature separately from scientific evidence. Historical descriptions do not establish clinical effectiveness.</p>
                  <a className="evidence-link" href="https://www.nccih.nih.gov/health/homeopathy" target="_blank" rel="noopener noreferrer">
                    <BookOpen size={19}/> Read the NCCIH evidence overview <ArrowUpRight size={16}/>
                  </a>
                  <div className="assistant-notice">Do not delay or replace evidence-based medical care with homeopathy.</div>
                </>
              ) : section === 'Privacy & Consent' ? (
                <><p>This demonstration does not store patient records or manage real consent.</p><div className="assistant-notice">Production access requires verified identities, explicit consent, server-side authorization and audit logs.</div></>
              ) : (
                <>
                  <p className="module-description">Explore the sample workflow. Persistent records, document uploads and booking are not connected to a backend yet.</p>
                  <div className="module-grid">
                    {(section === 'Appointments'
                      ? ['Demo appointment · Nov 03','Demo appointment · Nov 04']
                      : section === 'Health Vault' || section === 'Documents'
                      ? ['Example consultation summary','Example report placeholder']
                      : section === 'Patients'
                      ? ['Demo Patient A','Demo Patient B']
                      : ['Example case note','Example follow-up record']
                    ).map(x => <article className="module-card" key={x}><FileText size={24}/><b>{x}</b><small>Fictional sample · Read-only</small></article>)}
                  </div>
                </>
              )}
            </section>
          )}

        </main>
      </div>
    </div>
  );
    }
                   
