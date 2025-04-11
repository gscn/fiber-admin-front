// frontend/app/roles/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "../../../types/models";
import RoleForm from "../../../components/RoleForm";

interface Props {
  params: { id: string };
}

const EditRolePage: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      try {
        // Assuming api.get exists and works similarly to previous examples. You might need to adjust this based on your actual api client.
        setRole(fetchedRole);
      } catch (err) {
        setError("Failed to fetch role.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id]);

  const handleUpdate = async (data: Omit<Role, "ID" | "CreatedAt" | "UpdatedAt" | "DeletedAt" | "Permissions">) => {
    try {
      // Assuming api.put exists and works similarly.  Adjust as needed.
      router.push("/roles");
    } catch (err) {
      setError("Failed to update role.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!role) {
    return <p>Role not found.</p>;
  }

  return (
    <div>
      <h1>Edit Role</h1>
      <RoleForm initialData={role} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditRolePage;