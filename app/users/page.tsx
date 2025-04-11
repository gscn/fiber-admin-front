import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listUsers } from '../../lib/api';
import { User } from '../../types/models';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await listUsers();
        setUsers(fetchedUsers);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.Username}</td>
              <td>{user.Email}</td>
              <td>{user.Role?.Name || 'N/A'}</td>
              <td>{user.Status}</td>
              <td>
                <Link href={`/users/${user.ID}`}>View</Link>
              </td>
              <td>
                <Link href={`/users/${user.ID}/edit`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;