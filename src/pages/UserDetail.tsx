import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

interface Team {
  _id: string;
  name: string;
}

const UserCreate = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    teamId: "",
  });

  // Fetch all teams
  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("https://fmea-backend.vercel.app/api/teams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTeams(data.teams);
      } catch (err) {
        toast.error("Failed to load teams");
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://fmea-backend.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("User created successfully");
        navigate("/users");
      } else {
        toast.error(result.error || "Failed to create user");
      }
    } catch (err) {
      toast.error("Request failed");
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Create New User</h2>
      <Input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="user">User</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>

      <select
        name="teamId"
        value={formData.teamId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <Button onClick={handleSubmit}>Create User</Button>
    </div>
  );
};

export default UserCreate;
