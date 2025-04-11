import { apiRequest } from "../../../lib/api";
import { User } from "../../../types/models";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = params;

  try {
    const user: User = await apiRequest(`/users/${id}`);

    return (
      <div>
        <h1>User Details</h1>
        <p><strong>ID:</strong> {user.ID}</p>
        <p><strong>Username:</strong> {user.Username}</p>
        <p><strong>Email:</strong> {user.Email}</p>
        <p><strong>Role:</strong> {user.Role?.Name}</p>
        <p><strong>Status:</strong> {user.Status}</p>
        <p>
          <strong>Created At:</strong>{" "}
          {user.CreatedAt ? new Date(user.CreatedAt).toLocaleString() : "N/A"}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {user.UpdatedAt ? new Date(user.UpdatedAt).toLocaleString() : "N/A"}
        </p>
        <p>
          <strong>Deleted At:</strong>{" "}
          {user.DeletedAt
            ? new Date(user.DeletedAt).toLocaleString()
            : "N/A"}
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return <div>Error: Could not fetch user details.</div>;
  }
}

export default UserDetailPage;