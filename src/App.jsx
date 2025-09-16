import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#4CAF50",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#F44336",
                color: "white",
              },
            },
          }}
        />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
