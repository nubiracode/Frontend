import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function useFonts() {
  useEffect(() => {
    if (document.getElementById("br-gfonts")) return;
    const link = document.createElement("link");
    link.id = "br-gfonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

interface Step {
  num: number;
  label: string;
  img: string;
  route?: string;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  avatar: string;
  steps: Step[];
}

const PHASES: Phase[] = [
  {
    id: "limpieza",
    title: "Limpieza",
    subtitle: "La base de toda buena rutina",
    avatar: "/19.png",
    steps: [
      { num: 1, label: "Limpieza oleosa", img: "/6.png", route: '/limpieza-oleosa' },
      { num: 2, label: "Limpieza acuosa", img: "/7.png", route: '/limpieza-acuosa' },
      { num: 3, label: "Exfoliante",      img: "/8.png", route: '/exfoliantes' },
    ],
  },
  {
    id: "tratamiento",
    title: "Tratamiento",
    subtitle: "Activos que transforman tu piel",
    avatar: "/20.png",
    steps: [
      { num: 4, label: "Tónico",     img: "/9.png", route: '/tonicos' },
      { num: 5, label: "Mascarilla", img: "/10.png", route: '/mascarillas' },
      { num: 6, label: "Escencia",   img: "/11.png", route: '/escencias' },
    ],
  },
  {
    id: "hidratacion",
    title: "Hidratación",
    subtitle: "Sella y nutre en profundidad",
    avatar: "/18.png",
    steps: [
      { num: 7, label: "Sérum",            img: "/12.png", route: '/serums' },
      { num: 8, label: "Contorno",         img: "/13.png", route: '/contorno-de-ojos' },
      { num: 9, label: "Crema hidratante", img: "/14.png" },
    ],
  },
  {
    id: "proteccion",
    title: "Protección & Acabado",
    subtitle: "El último paso que no puedes saltarte",
    avatar: "/17.png",
    steps: [
      { num: 10, label: "Bloqueador solar", img: "/15.png" },
      { num: 11, label: "Maquillaje",       img: "/16.png" },
    ],
  },
];

/* ─── Step Card ─────────────────────────────────────────── */
function StepCard({ step, index }: { step: Step; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleClick = () => {
    if (step.route) {
      navigate(step.route);
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 cursor-pointer"
      onClick={handleClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .5s ease ${index * 0.13}s, transform .5s ease ${index * 0.13}s`,
      }}
    >
      {/* número */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-base shrink-0"
        style={{
          background: "linear-gradient(135deg,#f9a8d4,#ec4899)",
          fontFamily: "Jost, sans-serif",
          boxShadow: "0 3px 12px rgba(236,72,153,0.4)",
        }}
      >
        {step.num}
      </div>

      {/* imagen */}
      <div
        className="w-46 h-46 flex items-center justify-center"
        style={{ transition: "transform .25s ease" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
        }}
      >
        <img
          src={step.img}
          alt={step.label}
          className="w-full h-full object-contain drop-shadow-lg"
          draggable={false}
        />
      </div>

      {/* label */}
      <p
        className="text-base text-center text-rose-700 leading-tight"
        style={{ fontFamily: "Jost, sans-serif", fontWeight: 500, maxWidth: "12rem" }}
      >
        {step.label}
      </p>
    </div>
  );
}

/* ─── Connector ─────────────────────────────────────────── */
function StepArrow() {
  return (
    <svg width="40" height="18" viewBox="0 0 40 18" className="hidden md:block shrink-0" style={{ marginTop: "3.5rem" }}>
      <path d="M0 9 Q20 2 40 9" stroke="#f9a8d4" strokeWidth="1.8" fill="none" strokeDasharray="4 3" />
      <polygon points="35,6 40,9 35,12" fill="#f9a8d4" />
    </svg>
  );
}

/* ─── Phase Row ─────────────────────────────────────────── */
function PhaseRow({ phase }: { phase: Phase }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12 w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity .6s ease, transform .6s ease",
      }}
    >
      {/* Avatar — izquierda fija, ancho fijo */}
      <div className="flex flex-col items-center gap-4 shrink-0" style={{ width: "210px" }}>
        <img
          src={phase.avatar}
          alt={phase.title}
          className="object-contain object-bottom drop-shadow-sm w-full h-full object-contain drop-shadow-lg"
          draggable={false}
        />
        <div className="text-center">
          <h3
            className="leading-tight text-rose-700"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 600,
              fontSize: "2rem",
            }}
          >
            {phase.title}
          </h3>
          <p
            className="text-rose-400 mt-1 leading-snug"
            style={{ fontFamily: "Jost, sans-serif", fontWeight: 400, fontSize: "13px" }}
          >
            {phase.subtitle}
          </p>
        </div>
      </div>

      {/* línea conector */}
      <div className="hidden md:block shrink-0" style={{ marginBottom: "72px" }}>
        <svg width="48" height="2">
          <line x1="0" y1="1" x2="48" y2="1" stroke="#f9a8d4" strokeWidth="2" strokeDasharray="5 3" />
        </svg>
      </div>

      {/* Steps — flex, ocupa el resto */}
      <div className="flex flex-wrap justify-center md:justify-start items-end gap-4 md:gap-8 flex-1">
        {phase.steps.map((step, i) => (
          <div key={step.num} className="flex items-end gap-4 md:gap-8">
            <StepCard step={step} index={i} />
            {i < phase.steps.length - 1 && <StepArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}


export default function BeautyRoutine() {
  useFonts();

  return (
   <section
      className="w-full py-20 flex justify-center bg-gradient-to-r from-pink-150 via-pink-50 to-pink-150"
    >
      {/* dot pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 0,
        }}
      />

       <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-10 xl:px-44">
        {/* Título */}
        <div className="text-center mb-20">
          <h2
            className="text-rose-700 leading-tight"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 600,
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
            }}
          >
            Rutina de Skincare
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-16 h-px bg-pink-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-pink-300" />
            <div className="w-16 h-px bg-pink-300" />
          </div>
        </div>

        {/* Fases */}
        <div className="space-y-20 md:space-y-28">
          {PHASES.map((phase, i) => (
            <div key={phase.id}>
              <PhaseRow phase={phase} />

              {i < PHASES.length - 1 && (
                <div className="mt-20 flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-pink-300 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.55)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-400" />
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p
          className="text-center text-rose-300 mt-24"
          style={{ fontFamily: "Jost, sans-serif", fontWeight: 300, fontSize: "12px" }}
        >
          * Adapta los pasos según tu tipo de piel. Consulta con tu dermatóloga si tienes dudas.
        </p>
      </div>
    </section>
  );
}