import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/UsersContext";

function App() {
  return (
    <>
      <UserProvider>
        <div className="w-full h-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                style: {
                  background: "#10b981",
                  color: "#fff",
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: "#ef4444",
                  color: "#fff",
                },
              },
            }}
          />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
