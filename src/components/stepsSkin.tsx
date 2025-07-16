
const routineSteps = [
  { number: '1', label: 'Limpieza oleosa', iconSrc: '/oleo.png', href: '/rutina/limpieza-oleosa' },
  { number: '2', label: 'Limpieza Acuosa', iconSrc: '/limpiador.png', href: '/rutina/limpieza-acuosa' },
  { number: '3', label: 'Activos & Exfoliantes', iconSrc: '/exfol.png', href: '/rutina/exfoliantes' },
  { number: '4', label: 'Tónico', iconSrc: '/tonico.png', href: '/rutina/tonicos' },
  { number: '5', label: 'Esencia', iconSrc: '/frascos.png', href: '/rutina/esencias' },
  { number: '6', label: 'Serum', iconSrc: '/serum.png', href: '/rutina/serums' },
  { number: '7', label: 'Mascarilla', iconSrc: '/mascarilla.png', href: '/rutina/mascarillas' },
  { number: '8', label: 'Contorno de Ojos', iconSrc: '/contorno.png', href: '/rutina/contorno-de-ojos' },
  { number: '9', label: 'Crema Hidratante', iconSrc: '/crema.png', href: '/rutina/hidratantes' },
  { number: '10', label: 'Protector Solar', iconSrc: '/bloqueador.png', href: '/rutina/protector-solar' },
  { number: '11', label: 'Potenciadores', iconSrc: '/potenciadores.png', href: '/rutina/potenciadores' },
  { number: '12', label: 'Masajes', iconSrc: '/tratamiento.png', href: '/rutina/masajes' },
  { number: '13', label: 'Maquillaje', iconSrc: '/makeup.png', href: '/rutina/maquillaje' },
];

const cardStyles =
  'group flex items-center justify-center w-[15rem] h-[14rem] shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 bg-[#ffe7f1] cursor-pointer';

type RoutineStepProps = {
  number: string;
  label: string;
  iconSrc: string;
};

const RoutineStepContent = ({ number, label, iconSrc }: RoutineStepProps) => (
  <div className="flex flex-col items-center text-center">
    <span className="text-xl font-bold bg-[#ffbcd4] text-white px-3 py-1 rounded-full shadow-sm mb-2">
      Paso {number}
    </span>

    <div className="w-20 h-0.5 bg-[#f46096ff] my-1" />

    <img
      src={iconSrc}
      alt={label}
      className="w-20 h-20 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
    />

    <p className="uppercase font-medium tracking-tight text-md mt-3 max-w-[140px] transition-colors duration-200 group-hover:text-[#f46096ff]">
      {label}
    </p>
  </div>
);

const KBeautyRoutine = () => {
  return (
    <section className="bg-[#ffd6f3] text-[#ff97bdff] py-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-20 h-0.5 bg-[#f46096ff] mt-10" />

        <h1 className="text-4xl md:text-5xl font-serif tracking-[0.2em] my-4 text-center text-[#ff97bdff]">
          RUTINA K-BEAUTY
        </h1>

        <h2 className="text-xl md:text-2xl font-serif tracking-tight my-2 text-center text-[#ff97bdff]">
          Escoge tu producto ideal en cada paso
        </h2>

        <div className="w-20 h-0.5 bg-[#f46096ff] mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6 w-full justify-items-center">
          {routineSteps.map((step) => (
            <a key={step.number} href={step.href} className={cardStyles}>
              <RoutineStepContent {...step} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KBeautyRoutine;