"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";
import { Permission } from "../../../types/models";

interface Props {
  params: {
    id: string;
  };
}

const PermissionDetailPage: React.FC<Props> = ({ params }) => {
  const [permission, setPermission] = useState<Permission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const data = await api.get<Permission>(`/api/permissions/${params.id}`);
        setPermission(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch permission");
      }
    };

    fetchPermission();
  }, [params.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!permission) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Permission Details</h1>
      <p><strong>ID:</strong> {permission.ID}</p>
      <p><strong>Name:</strong> {permission.Name}</p>
      <p><strong>Created At:</strong> {new Date(permission.CreatedAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(permission.UpdatedAt).toLocaleString()}</p>
      <p><strong>Deleted At:</strong> {permission.DeletedAt ? new Date(permission.DeletedAt).toLocaleString() : "Not Deleted"}</p>
      <button onClick={() => router.push("/permissions")}>Back to Permissions</button>
    </div>
  );
};

export default PermissionDetailPage;