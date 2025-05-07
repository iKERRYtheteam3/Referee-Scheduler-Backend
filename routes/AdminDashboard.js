import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const [games, setGames] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', teams: '', location: '' });

  const fetchGames = async () => {
    const res = await fetch('/api/games');
    const data = await res.json();
    setGames(data);
  };

  const fetchPendingAdmins = async () => {
    const res = await fetch('/api/admin/pending');
    const data = await res.json();
    setPendingAdmins(data);
  };

  const createGame = async () => {
    await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ date: '', time: '', teams: '', location: '' });
    fetchGames();
  };

  const approveAdmin = async (id) => {
    await fetch(`/api/admin/approve/${id}`, { method: 'PATCH' });
    fetchPendingAdmins();
  };

  const denyAdmin = async (id) => {
    await fetch(`/api/admin/deny/${id}`, { method: 'DELETE' });
    fetchPendingAdmins();
  };

  useEffect(() => {
    fetchGames();
    fetchPendingAdmins();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Welcome Admin {user?.email}</h1>
      
      <section>
        <h2>Create a New Game</h2>
        <input placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
        <input placeholder="Teams" value={form.teams} onChange={e => setForm({ ...form, teams: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <button onClick={createGame}>Create Game</button>
      </section>

      <section>
        <h2>Pending Admin Approvals</h2>
        {pendingAdmins.map(admin => (
          <div key={admin._id}>
            {admin.email}
            <button onClick={() => approveAdmin(admin._id)}>Approve</button>
            <button onClick={() => denyAdmin(admin._id)}>Deny</button>
          </div>
        ))}
      </section>

      <section>
        <h2>Upcoming Games</h2>
        <ul>
          {games.map(game => (
            <li key={game._id}>{game.date} - {game.teams} at {game.time}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
