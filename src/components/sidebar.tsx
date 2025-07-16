import { FaCalendarAlt, FaPlusCircle, FaUsers, FaChalkboardTeacher, FaEdit, FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const AdminSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white shadow-lg fixed">
      <div className="p-6 text-center border-b border-purple-500">
        <h1 className="text-2xl font-bold">Panel Admin</h1>
        <p className="text-sm text-purple-200">CESFAM</p>
      </div>

      <nav className="p-4 space-y-4">
        <Link
          to="/admin-landing"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <FaCalendarAlt /> <span>Revisar disponibilidad</span>
        </Link>
        <Link
          to="/registrar-permiso"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <FaPlusCircle /> <span>Registrar permiso</span>
        </Link>
        <Link
          to="/registrar-capacitacion"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <FaChalkboardTeacher /> <span>Registrar capacitación</span>
        </Link>
        <Link
          to="/funcionarios"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <FaUsers /> <span>Visualizar funcionarios</span>
        </Link>
        <Link
          to="/modificar"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <FaEdit /> <span>Modificar permisos</span>
        </Link>
        <Link
          to="/gestionar-usuarios"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <FaUserCog /> <span>Agregar/Eliminar funcionario</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
