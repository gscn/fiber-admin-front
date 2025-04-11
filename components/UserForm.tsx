import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/models';
import { api } from '@/lib/api';

interface UserFormProps {
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(''); // Password field is always clear for security
  const [roleId, setRoleId] = useState(user?.roleId || 0);
  const [status, setStatus] = useState(user?.status || 'active');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRoleId(user.roleId);
      setStatus(user.status);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const userData = {
      username,
      email,
      password,
      role_id: roleId, // Backend expects role_id
      status,
    };

    try {
      if (user) {
        // Update user
        await api.put(`/api/users/${user.id}`, userData);
      } else {
        // Create user (no endpoint for this in the provided routes, assuming /api/users)
        await api.post('/api/users', userData);
      }
      router.push('/users');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...(user ? {} : { required: true })} // Password required only for create
        />
      </div>

      <div>
        <label htmlFor="roleId">Role ID:</label>
        <input
          type="number"
          id="roleId"
          value={roleId}
          onChange={(e) => setRoleId(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button type="submit">{user ? 'Update User' : 'Create User'}</button>
    </form>
  );
};

export default UserForm;