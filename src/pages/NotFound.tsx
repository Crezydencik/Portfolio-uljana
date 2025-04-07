
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Страница не найдена</p>
        <p className="text-gray-600 mb-8">
          Запрашиваемая страница "{location.pathname}" не существует или была перемещена.
        </p>
        <div className="space-y-4">
          <Link to="/" className="block w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            Вернуться на главную
          </Link>
          <Link to="/admin" className="block w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
            Перейти в админ панель
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
