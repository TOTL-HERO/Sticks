import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

export type OrgRole = 'COMMISSIONER' | 'ADMIN' | 'COACH' | 'PLAYER' | null;

interface OrgMembership {
  role: OrgRole;
  organizationId: string;
}

/**
 * Fetches the current user's org role for a given organization.
 * Used for conditional rendering: commissioners/admins see management UI,
 * coaches see read-only data views, players see competition UI.
 */
export function useOrgRole(organizationId?: string) {
  const { data, isLoading } = useQuery<OrgMembership | null>({
    queryKey: ['org-role', organizationId],
    queryFn: async () => {
      if (!organizationId) return null;
      try {
        return await apiFetch<OrgMembership>(`/organizations/${organizationId}/my-role`);
      } catch {
        return null;
      }
    },
    enabled: !!organizationId,
  });

  const role = data?.role ?? null;

  return {
    role,
    isLoading,
    isCommissioner: role === 'COMMISSIONER' || role === 'ADMIN',
    isCoach: role === 'COACH',
    isPlayer: role === 'PLAYER',
    canManage: role === 'COMMISSIONER' || role === 'ADMIN',
    canViewRoster: role === 'COMMISSIONER' || role === 'ADMIN' || role === 'COACH',
    canCompete: role === 'PLAYER',
  };
}
