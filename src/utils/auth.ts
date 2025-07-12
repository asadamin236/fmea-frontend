// src/utils/auth.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  teamId?: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// ✅ Check if user is authenticated
export const checkAuth = (): AuthState => {
  const userStr = localStorage.getItem("fmea_user");
  if (userStr) {
    try {
      const user: User = JSON.parse(userStr);
      return { isAuthenticated: true, user };
    } catch (e) {
      return { isAuthenticated: false, user: null };
    }
  }
  return { isAuthenticated: false, user: null };
};

// ✅ Get token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem("fmea_token");
};

import { API_ENDPOINTS } from "./api";

// ✅ Login using backend
export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const response = await fetch(
      API_ENDPOINTS.LOGIN,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data?.error || "Login failed" };
    }

    const { token, user } = data;

    const normalizedUser: User = {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      teamId: user.teamId || null,
      avatar: user.avatar || "",
    };

    // ✅ Save token and user to localStorage
    localStorage.setItem("fmea_token", token);
    localStorage.setItem("fmea_user", JSON.stringify(normalizedUser));

    return { success: true, user: normalizedUser };
  } catch (error) {
    return { success: false, error: "Network error. Try again." };
  }
};

// ✅ Logout
export const logoutUser = (): void => {
  localStorage.removeItem("fmea_user");
  localStorage.removeItem("fmea_token");
};

// ✅ Check if current user is admin
export const isAdmin = (): boolean => {
  const { user } = checkAuth();
  return user?.role === "admin";
};

// ✅ Get teams from local storage
export const getTeams = (): Team[] => {
  const storedTeams = localStorage.getItem("fmea_teams");
  return storedTeams ? JSON.parse(storedTeams) : [];
};

// ✅ Get team by ID
export const getTeamById = (id: string): Team | undefined => {
  const teams = getTeams();
  return teams.find((team) => team.id === id);
};

// ✅ Count team members
export const getTeamMembersCount = (teamId: string): number => {
  const storedUsers = localStorage.getItem("fmea_users");
  if (!storedUsers) return 0;

  const users: User[] = JSON.parse(storedUsers);
  return users.filter((user) => user.teamId === teamId).length;
};

// ✅ Update team member counts
export const updateTeamMemberCounts = (): void => {
  const teams = getTeams();
  if (teams.length === 0) return;

  const updatedTeams = teams.map((team) => ({
    ...team,
    members: getTeamMembersCount(team.id),
  }));

  localStorage.setItem("fmea_teams", JSON.stringify(updatedTeams));
};
