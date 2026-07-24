import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
import type { Profile, Candidate, UserRoleName } from '../supabase/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  candidate: Candidate | null;
  userRoles: UserRoleName[];
  activeOrgId: string | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  isSuspended: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [userRoles, setUserRoles] = useState<UserRoleName[]>([]);
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserData = async (currentUser: User) => {
    try {
      // Fetch profile
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      
      if (prof) setProfile(prof as Profile);

      // Fetch candidate if exists
      const { data: cand } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      
      if (cand) setCandidate(cand as Candidate);

      // Fetch user roles
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('role_id, organisation_id, roles(name)')
        .eq('user_id', currentUser.id);

      if (rolesData && rolesData.length > 0) {
        const rolesList = rolesData
          .map((r: any) => r.roles?.name)
          .filter(Boolean) as UserRoleName[];
        
        setUserRoles(rolesList.length > 0 ? rolesList : ['candidate']);
        setActiveOrgId(rolesData[0]?.organisation_id || null);
      } else {
        setUserRoles(['candidate']);
      }
    } catch (err) {
      console.error('Error fetching auth user metadata:', err);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      setSession(initSession);
      setUser(initSession?.user ?? null);
      if (initSession?.user) {
        fetchUserData(initSession.user).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchUserData(currentSession.user);
      } else {
        setProfile(null);
        setCandidate(null);
        setUserRoles([]);
        setActiveOrgId(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setCandidate(null);
    setUserRoles([]);
    setActiveOrgId(null);
    setIsLoading(false);
  };

  const refreshAuth = async () => {
    if (user) {
      await fetchUserData(user);
    }
  };

  const isEmailVerified = !!user?.email_confirmed_at;
  const isSuspended = profile?.status === 'suspended';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        candidate,
        userRoles,
        activeOrgId,
        isLoading,
        isEmailVerified,
        isSuspended,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
