import Router from "./components/shared/Router";
import { AuthProvider } from "./context/AuthContext";


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
