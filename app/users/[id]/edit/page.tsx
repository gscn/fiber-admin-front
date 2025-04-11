import { UserForm } from '../../../../components/UserForm';
import { api } from '../../../../lib/api';
import { User } from '../../../../types/models';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function EditUserPage({ params }: Props) {
  const { id } = params;

  try {
    const user: User = await api.get(`/api/users/${id}`);

    if (!user) {
      return notFound();
    }

    return (
      <div>
        <h1>Edit User</h1>
        <UserForm user={user} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return notFound();
  }
}