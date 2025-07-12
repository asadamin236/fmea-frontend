import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { UserPlus, Trash2, Eye, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamIdParam = queryParams.get("teamId");

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    teamId: undefined,
  });

  useEffect(() => {
    const selectedTeam = teams.find((team) => team._id === teamIdParam);
    setNewUser((prev) => ({
      ...prev,
      teamId: selectedTeam ? selectedTeam._id : undefined,
    }));
  }, [teams, teamIdParam]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Always get teams from localStorage (which Teams.tsx keeps updated)
  useEffect(() => {
    const fetchTeamsFromStorage = () => {
      const teamsData = localStorage.getItem("fmea_teams");
      if (teamsData) setTeams(JSON.parse(teamsData));
    };
    fetchTeamsFromStorage();
    window.addEventListener("storage", fetchTeamsFromStorage);
    return () => window.removeEventListener("storage", fetchTeamsFromStorage);
  }, []);

  const selectedTeam = teams.find((team) => team._id === teamIdParam);
  const selectedTeamId = selectedTeam?._id;

  const fetchUsers = async () => {
    const token = localStorage.getItem("fmea_token");
    if (!token) return;

    try {
      const res = await fetch("https://fmea-backend.vercel.app/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        localStorage.setItem("fmea_users", JSON.stringify(data));
      } else {
        toast.error(data.error || "Failed to fetch users");
      }
    } catch (err) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [teamIdParam]); // Remove navigate from dependencies to prevent infinite loops

  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "user",
      teamId: selectedTeamId || undefined,
    });
    setEditMode(false);
    setEditingUserId(null);
    setViewMode(false);
    setViewingUser(null);
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Name, email and password are required");
      return;
    }

    try {
      const token = localStorage.getItem("fmea_token");
      if (!token) {
        toast.error("Unauthorized: No token found");
        return;
      }

      const payload = { ...newUser };

      const res = await fetch("https://fmea-backend.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      await fetchUsers();
      localStorage.setItem("teams_reload", Date.now().toString());
      window.dispatchEvent(new StorageEvent("storage", { key: "teams_reload" }));
      resetForm();
      setOpen(false);
      toast.success("User created successfully");
    } catch (error) {
      toast.error(error.message || "Error creating user");
    }
  };

  const handleEditUser = (user) => {
    setNewUser({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      teamId: user.teamId,
    });
    setEditingUserId(user._id);
    setEditMode(true);
    setOpen(true);
  };

  const handleViewUser = (user) => {
    setViewingUser(user);
    setViewMode(true);
    setOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUserId) return;
    if (!newUser.name || !newUser.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      const token = localStorage.getItem("fmea_token");
      if (!token) {
        toast.error("Unauthorized: No token found");
        return;
      }

      const payload = { ...newUser };
      if (!payload.password) {
        delete payload.password;
      }

      const res = await fetch(
        `https://fmea-backend.vercel.app/api/users/${editingUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      await fetchUsers();
      localStorage.setItem("teams_reload", Date.now().toString());
      window.dispatchEvent(new StorageEvent("storage", { key: "teams_reload" }));
      resetForm();
      setOpen(false);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.message || "Error updating user");
    }
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    const token = localStorage.getItem("fmea_token");
    if (!token) {
      toast.error("Unauthorized: No token found");
      return;
    }

    try {
      const res = await fetch(
        `https://fmea-backend.vercel.app/api/users/${userToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete user");
      }

      await fetchUsers();
      localStorage.setItem("teams_reload", Date.now().toString());
      window.dispatchEvent(new StorageEvent("storage", { key: "teams_reload" }));
      toast.success("User deleted successfully");
      setShowDeleteDialog(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  // --- UPDATED getTeamName function ---
  const getTeamName = (teamId) => {
    if (!teamId) return "Not Assigned";
    const id =
      typeof teamId === "object" && teamId !== null ? teamId._id : teamId;
    const team = teams.find((t) => t._id === id);
    return team ? team.name : "Unknown Team";
  };

  const getBadgeVariant = (role) => {
    switch (role) {
      case "admin":
        return "default";
      case "editor":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Table mein hamesha users use karein, filteredUsers hata dein

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {selectedTeam ? `${selectedTeam.name} - Users` : "Users Management"}
          </h1>
          <div className="space-x-2">
            {selectedTeam && (
              <Button variant="outline" onClick={() => navigate("/teams")}>
                Back to Teams
              </Button>
            )}
            <Button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{getTeamName(user.teamId)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(user._id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog
        open={open && !viewMode}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            resetForm();
          }
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update user information."
                : "Create a new user account."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editMode) {
                handleUpdateUser();
              } else {
                handleAddUser();
              }
            }}
          >
            <div className="space-y-4 py-4">
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Input
                placeholder={
                  editMode
                    ? "New Password (leave blank to keep current)"
                    : "Password"
                }
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <select
                className="w-full border rounded px-3 py-2"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value,
                  })
                }
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              <select
                className="w-full border rounded px-3 py-2"
                value={newUser.teamId || ""}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    teamId: e.target.value || undefined,
                  })
                }
              >
                <option value="">No Department Assigned</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editMode ? "Update User" : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog
        open={open && viewMode}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            resetForm();
          }
          setOpen(isOpen);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View complete user information.
            </DialogDescription>
          </DialogHeader>

          {viewingUser && (
            <div className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-1/3">
                          Name
                        </TableCell>
                        <TableCell>{viewingUser.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Email</TableCell>
                        <TableCell>{viewingUser.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Role</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(viewingUser.role)}>
                            {viewingUser.role}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Team</TableCell>
                        <TableCell>{getTeamName(viewingUser.teamId)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Created At
                        </TableCell>
                        <TableCell>
                          {viewingUser.createdAt
                            ? new Date(
                                viewingUser.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Last Updated
                        </TableCell>
                        <TableCell>
                          {viewingUser.updatedAt
                            ? new Date(
                                viewingUser.updatedAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
            >
              Close
            </Button>
            {viewingUser && (
              <Button
                onClick={() => {
                  handleEditUser(viewingUser);
                  setViewMode(false);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit User
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Users;
