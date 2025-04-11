import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createRole, updateRole, getRole } from '@/lib/api';
import { Role } from '@/types/models';

interface RoleFormProps {
  roleId?: number;
}

const RoleForm: React.FC<RoleFormProps> = ({ roleId }) => {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (roleId) {
      const fetchRole = async () => {
        try {
          const role = await getRole(roleId);
          setName(role.name);
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      };
      fetchRole();
    }
  }, [roleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (roleId) {
        await updateRole(roleId, { name });
      } else {
        await createRole({ name });
      }
      router.push('/roles');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit">{roleId ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default RoleForm;