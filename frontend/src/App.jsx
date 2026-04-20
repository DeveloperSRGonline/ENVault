import { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Check session on load
  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      setUser(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data.user);
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  if (user) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <h3>Sign Up</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <h3>Log In</h3>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default App;