
import { listRoles } from "../../lib/api";
import { Role } from "../../types/models";
import Link from "next/link";

export default async function RolesPage() {
  const roles: Role[] = await listRoles();

  return (
    <div>
      <h1>Roles</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.ID}>
              <td>
                <Link href={`/roles/${role.ID}`}>{role.ID}</Link>
              </td>
              <td>
                <Link href={`/roles/${role.ID}`}>{role.Name}</Link>
              </td>
              <td>
                <Link href={`/roles/${role.ID}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}