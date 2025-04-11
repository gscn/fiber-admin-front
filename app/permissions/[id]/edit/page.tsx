// frontend/app/permissions/[id]/edit/page.tsx
import PermissionForm from '../../../components/PermissionForm';
import { getPermission } from '../../../lib/api';
import { Permission } from '../../../types/models';

interface Props {
  params: { id: string };
}

export default async function EditPermissionPage({ params }: Props) {
  const { id } = params;
  const permission: Permission | null = await getPermission(parseInt(id));

  if (!permission) {
    return <div>Permission not found</div>;
  }

  return (
    <div>
      <h1>Edit Permission</h1>
      <PermissionForm initialData={permission} />
    </div>
  );
}