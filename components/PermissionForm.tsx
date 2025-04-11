import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPermission, updatePermission, getPermission } from '../../lib/api';
import { Permission } from '../../types/models';

interface PermissionFormProps {
  id?: string;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ id }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPermission(id)
        .then((data) => {
          if (data) {
            setName(data.Name);
          }
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch permission');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updatePermission(id, { Name: name });
      } else {
        await createPermission({ Name: name });
      }
      router.push('/permissions');
    } catch (err: any) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Update Permission' : 'Create Permission'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {loading ? 'Loading...' : (id ? 'Update' : 'Create')}
      </button>
    </form>
  );
};

export default PermissionForm;