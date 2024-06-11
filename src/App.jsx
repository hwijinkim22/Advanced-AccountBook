import Router from "./components/shared/Router";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
};
export default App;
