import { AuthProvider } from './auth/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
