import Navbar from "../shared/components/navbar";

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
  <div className="flex flex-col items-center text-center p-4">
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
    <div>
      <Navbar />
      <section className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100  text-[#ff97bdff] py-16 px-4 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Sección de bienvenida y formulario de planificación */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg mb-12 w-full max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-serif tracking-wide mb-4 text-[#f46096ff]">
              PLANIFICA TU RUTINA IDEAL
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-700 mb-6">
              ¡Descubre los productos perfectos para ti en cada paso de tu rutina K-Beauty!
              Comienza contándonos un poco sobre tu piel.
            </p>
            <div className="w-24 h-1 bg-[#ffbcd4] mx-auto mb-8" />

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <label htmlFor="skinType" className="block text-gray-800 text-lg font-semibold mb-2">
                  Tipo de Piel:
                </label>
                <select
                  id="skinType"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffbcd4] text-gray-700"
                >
                  <option value="">Selecciona tu tipo de piel</option>
                  <option value="normal">Normal</option>
                  <option value="seca">Seca</option>
                  <option value="grasa">Grasa</option>
                  <option value="mixta">Mixta</option>
                  <option value="sensible">Sensible</option>
                </select>
              </div>
              <div>
                <label htmlFor="allergies" className="block text-gray-800 text-lg font-semibold mb-2">
                  Alergias / Sensibilidades:
                </label>
                <input
                  type="text"
                  id="allergies"
                  placeholder="Ej: Fragancias, gluten..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffbcd4] text-gray-700"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="desiredTreatment" className="block text-gray-800 text-lg font-semibold mb-2">
                  Tratamiento deseado:
                </label>
                <textarea
                  id="desiredTreatment"
                  rows={3}
                  placeholder="Ej: Reducir arrugas, controlar acné, hidratación profunda..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffbcd4] text-gray-700"
                ></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-[#f46096ff] hover:bg-[#ff97bdff] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  ¡Encontrar mi rutina!
                </button>
              </div>
            </form>
          </div>

          {/* Sección de los pasos de la rutina */}
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-8 text-center text-[#f46096ff]">
            LOS 13 PASOS DE LA RUTINA COREANA
          </h2>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl">
            Explora cada fase de la icónica rutina K-Beauty y haz clic en cada paso para
            descubrir los productos ideales.
          </p>
          <div className="w-24 h-1 bg-[#ffbcd4] mx-auto mb-10" />


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 w-full justify-items-center">
            {routineSteps.map((step) => (
              <a key={step.number} href={step.href} className={cardStyles}>
                <RoutineStepContent {...step} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KBeautyRoutine;