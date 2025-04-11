// frontend/app/roles/[id]/page.tsx
import { Role } from '../../../types/models';
import { getRole } from '../../../lib/api';

interface RoleDetailPageProps {
  params: {
    id: string;
  };
}

const RoleDetailPage: React.FC<RoleDetailPageProps> = async ({ params }) => {
  const { id } = params;
  const role: Role | null = await getRole(parseInt(id, 10));

  if (!role) {
    return <div>Role not found</div>;
  }

  return (
    <div>
      <h1>Role Details</h1>
      <p><strong>ID:</strong> {role.ID}</p>
      <p><strong>Name:</strong> {role.Name}</p>
      <p><strong>Created At:</strong> {role.CreatedAt ? new Date(role.CreatedAt).toLocaleString() : 'N/A'}</p>
      <p><strong>Updated At:</strong> {role.UpdatedAt ? new Date(role.UpdatedAt).toLocaleString() : 'N/A'}</p>
      <p><strong>Deleted At:</strong> {role.DeletedAt ? new Date(role.DeletedAt).toLocaleString() : 'N/A'}</p>

      <h2>Permissions</h2>
      {role.permissions && role.permissions.length > 0 ? (
        <ul>
          {role.permissions.map((permission) => (
            <li key={permission.id}>
              {permission.name} (ID: {permission.id})
            </li>
          ))}
        </ul>
      ) : (
        <p>No permissions assigned to this role.</p>
      )}
    </div>
  );
};

export default RoleDetailPage;