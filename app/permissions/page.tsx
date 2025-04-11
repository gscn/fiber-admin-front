// frontend/app/permissions/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listPermissions } from "../../lib/api";
import { Permission } from "../../types/models";

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const data = await listPermissions();
        setPermissions(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  if (loading) {
    return <p>Loading permissions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Permissions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.ID}>
              <td>
                <Link href={`/permissions/${permission.ID}`}>
                  {permission.ID}
                </Link>
              </td>
              <td>
                <Link href={`/permissions/${permission.ID}`}>{permission.Name}</Link>{" "}
                | <Link href={`/permissions/${permission.ID}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsPage;