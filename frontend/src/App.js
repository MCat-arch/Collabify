import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="min-h-screen overflow-y-auto bg-primary-900">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
