const API_BASE = "https://fmea-backend.vercel.app/api/manufacturers";

export interface Manufacturer {
  _id: string;
  name: string;
  contactInfo?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateManufacturerData {
  name: string;
  contactInfo?: string;
  website?: string;
}

export interface UpdateManufacturerData {
  name: string;
  contactInfo?: string;
  website?: string;
}

class ManufacturerService {
  private getAuthHeaders() {
    const token = localStorage.getItem("fmea_token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async getAllManufacturers(): Promise<Manufacturer[]> {
    try {
      const response = await fetch(API_BASE, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch manufacturers");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      throw error;
    }
  }

  async getManufacturerById(id: string): Promise<Manufacturer> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch manufacturer");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching manufacturer:", error);
      throw error;
    }
  }

  async createManufacturer(data: CreateManufacturerData): Promise<Manufacturer> {
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create manufacturer");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating manufacturer:", error);
      throw error;
    }
  }

  async updateManufacturer(id: string, data: UpdateManufacturerData): Promise<Manufacturer> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update manufacturer");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating manufacturer:", error);
      throw error;
    }
  }

  async deleteManufacturer(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete manufacturer");
      }
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
      throw error;
    }
  }
}

export const manufacturerService = new ManufacturerService(); 