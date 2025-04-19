import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const [isDark, setIsDark] = useState(false);

  // Tambahkan/kurangi class 'dark' dari <html> saat state berubah
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-white relative">
      <Navbar />
      <AllRoutes />

      {/* Toggle Dark Mode di kiri bawah */}
      <div className="fixed bottom-4 left-4">
        <button onClick={() => setIsDark(!isDark)} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;
