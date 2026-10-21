import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Clock3, Heart, LoaderCircle, MapPin, Sprout } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import botanicalCorners from "@/assets/botanical-corners.png"; 
import botanicaldivider from "@/assets/botanical-divider.png"; 
import botanicallado from "@/assets/botanical-lado.png"; 
import botanicalcenter from "@/assets/botanical-center.png"; 

import imagi1 from "@/assets/imagi1.png"; 


// ou caminho relativo, ex: "../assets/botanical-corners.png"

const WEDDING_DATE = new Date("2026-12-19T20:00:00-03:00").getTime();
const MAP_QUERY = "Paróquia Nossa Senhora da Assunção, Rua Olegário Maciel, 820, Porteirinha, Minas Gerais, Brasil";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function getCountdown(): Countdown {
  const remaining = Math.max(0, WEDDING_DATE - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeartDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={`heart-divider${light ? " heart-divider--light" : ""}`} aria-hidden="true">
      <span />
      <Heart size={13} strokeWidth={1.35} />
      <span />
    </div>
  );
}

export default function Home() {
  const [countdown, setCountdown] = useState(getCountdown);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formState === "sending") return;
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    setGuestName(name);
    setFormState("sending");

    window.setTimeout(() => {
      try {
        const response = {
          name,
          companions: Number(formData.get("companions") ?? 0),
          message: String(formData.get("message") ?? "").trim(),
          submittedAt: new Date().toISOString(),
        };
        window.localStorage.setItem("leonardo-sirleia-rsvp", JSON.stringify(response));
        setFormState("sent");
      } catch {
        setFormState("idle");
        window.alert("Não foi possível salvar sua resposta neste dispositivo. Tente novamente.");
      }
    }, 650);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Leonardo e Sirleia — início">
          <span className="brand-monogram">L<span>&</span>S</span>
          <span className="brand-caption">19 · 12 · 2026</span>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#celebracao">Nossa história</a>
          <a href="#cerimonia">Cerimônia</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <img className="botanical botanical--hero" src={botanicalCorners}alt="" aria-hidden="true" />
        <img className="botanical botanical--blessing" src={botanicalcenter} alt="" aria-hidden="true" />

        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-copy">
            <motion.div
              className="hero-intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="eyebrow"><Sprout size={15} strokeWidth={1.4} /> Um convite feito com amor</span>
              <div className="wreath-mark" aria-label="Leonardo e Sirleia">
                <svg viewBox="0 0 170 114" role="img" aria-hidden="true">
                  <path d="M35 94C12 72 21 39 61 18M135 94c23-22 14-55-26-76" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M31 79c-15 1-22-7-23-18 13-1 22 5 23 18Zm4-21C20 54 16 44 20 33c13 4 19 13 15 25Zm9-20C33 30 34 20 41 11c11 8 13 18 3 27Zm9-12c-3-12 2-21 12-27 8 11 6 21-5 28Zm-16 44c-14 5-24 0-29-10 12-5 22-2 29 10Zm98 9c15 1 22-7 23-18-13-1-22 5-23 18Zm-4-21c15-4 19-14 15-25-13 4-19 13-15 25Zm-9-20c11-8 10-18 3-27-11 8-13 18-3 27Zm-9-12c3-12-2-21-12-27-8 11-6 21 5 28Zm16 44c14 5 24 0 29-10-12-5-22-2-29 10Z" fill="currentColor" opacity=".54" />
                  <path d="M35 94c18 8 34 11 50 11s32-3 50-11" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span>L <i>&</i> S</span>
              </div>
              <h1 className="hero-names"><span>Leonardo</span><i>&</i><span>Sirleia</span></h1>
              <p className="hero-invitation">Convidam você para o nosso casamento<br className="desktop-break" /> e o início de uma vida a dois</p>
              <HeartDivider />
              <p className="hero-date"><CalendarDays size={15} strokeWidth={1.5} /> Sábado, 19 de dezembro de 2026 <span className="date-dot">·</span> às 20:00</p>
            </motion.div>
          </div>

          <Reveal className="hero-card-wrap" delay={0.14}>
            <div className="invitation-card">
              <div className="card-corner card-corner--tl" />
              <div className="card-corner card-corner--br" />
              <p className="card-kicker">Reserve esta data</p>
              <div className="card-day">19</div>
              <p className="card-month">DEZEMBRO <span>·</span> 2026</p>
              <div className="card-rule"><span /><Heart size={12} strokeWidth={1.4} /><span /></div>
              <p className="card-venue">Uma noite para guardar<br />no coração, para sempre.</p>
              <div className="card-time"><Clock3 size={14} strokeWidth={1.5} /> 20:00</div>
              <a href="#cerimonia" className="text-link">Descubra os detalhes <ArrowDown size={14} /></a>
            </div>
            <span className="card-note">uma nova estação começa</span>
          </Reveal>
        </div>

        <div className="countdown-shell" aria-label="Contagem regressiva para o casamento">
          <p className="countdown-title">A contagem para o nosso sim</p>
          <div className="countdown" aria-live="off">
            {([
              ["days", "dias"], ["hours", "horas"], ["minutes", "minutos"], ["seconds", "segundos"],
            ] as const).map(([unit, label]) => (
              <div className="countdown-unit" key={unit}>
                <span className="countdown-number">{String(countdown[unit]).padStart(2, "0")}</span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <a href="#celebracao" className="scroll-cue" aria-label="Desça para conhecer a celebração"><span /><span>Deslize para descobrir</span></a>
      </section>

      <section className="blessing-section section-pad" id="celebracao">
<img className="botanical botanical--hero" src={botanicalCorners} alt="" aria-hidden="true" />
        <img className="botanical botanical--blessing" src={botanicalcenter} alt="" aria-hidden="true" />
        <Reveal className="blessing-content">
          <span className="eyebrow section-eyebrow">Uma promessa, uma vida inteira</span>
          <blockquote>
            “O amor é bondoso, é paciente. Não inveja, não se vangloria, não se orgulha”
            <cite>1 Coríntios 13.4</cite>
          </blockquote>
          <HeartDivider />
          <p className="blessing-line">Com a bênção de Deus<br /><span>e de seus pais</span></p>
          <p className="parents-label">Com carinho e gratidão, homenageamos</p>
          <div className="parents-grid">
            <div className="parent-card">
              <span className="parent-overline">Pais do noivo</span>
              <p>Geraldo Nunes Lopes<br />de Oliveira</p>
              <span className="parent-and">&</span>
              <p>Rosane de Clesia Barbosa<br />Nogueira</p>
            </div>
            <div className="parent-card">
              <span className="parent-overline">Pais da noiva</span>
              <p>José Barbosa Soares</p>
              <span className="parent-and">&</span>
              <p>Nelzita Barbosa de Souza <span className="memoria">(in memória)</span></p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="ceremony-section section-pad"  id="cerimonia">



        <Reveal className="ceremony-heading">
          <span className="eyebrow section-eyebrow">O momento mais esperado</span>
          <h2>Uma bênção<br /><em>para sempre.</em></h2>
          <HeartDivider />
          <p className="ceremony-label">Cerimônia Religiosa</p>
          <h3>Paróquia Nossa Senhora<br />da Assunção</h3>
          <address><MapPin size={16} strokeWidth={1.5} />Rua Olegário Maciel, 820<br /><span>Porteirinha, Minas Gerais, Brasil</span></address>
          <a className="button button-primary" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
            Como Chegar <span>(Abrir no Google Maps)</span><ArrowUpRight size={16} />
          </a>
          <p className="ceremony-date"><CalendarDays size={15} /> 19 de dezembro de 2026 <i>·</i> 20:00</p>
        </Reveal>
        <Reveal className="map-card" delay={0.15}>
          <div className="map-frame">
            <iframe title="Mapa da Paróquia Nossa Senhora da Assunção em Porteirinha" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`} />
            <div className="map-pin-card"><span><MapPin size={16} /></span><div><strong>Paróquia Nossa Senhora da Assunção</strong><small>Porteirinha · Minas Gerais</small></div></div>
          </div>
          <p className="map-caption">Será uma alegria ter você pertinho da gente.</p>
        </Reveal>
      </section>

     

      <footer className="site-footer">
        <HeartDivider light />
        <p className="footer-names">Leonardo <i>&</i> Sirleia</p>
        <p>Com amor, aguardamos você. <span>·</span> 19.12.2026</p>
        <a href="#inicio" className="back-top">Voltar ao início ↑</a>
      </footer>
    </main>
  );
}
