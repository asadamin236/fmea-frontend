import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const API_BASE = "https://fmea-backend.vercel.app/api/equipment-class";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  engineeringDiscipline: z.enum([
    "Mechanical",
    "Electrical",
    "Instrumentation",
    "Civil",
    "Process",
  ]),
  lastReviewed: z.string().optional(),
  reviewerList: z.string().optional(),
});

const EquipmentClassForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      engineeringDiscipline: "Mechanical",
      lastReviewed: "",
      reviewerList: "",
    },
  });

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      const token = localStorage.getItem("fmea_token");
      if (!token) {
        toast({
          title: "Error",
          description: "Authentication required",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      fetch(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) =>
          form.reset({
            name: data.name,
            description: data.description || "",
            engineeringDiscipline: data.engineeringDiscipline,
            lastReviewed: data.lastReviewed?.slice(0, 10) || "",
            reviewerList: (data.reviewerList || []).join(", "),
          })
        )
        .catch((err) => {
          console.error("Load failed:", err);
          toast({
            title: "Error",
            description: "Failed to load",
            variant: "destructive",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const payload = {
      name: values.name,
      description: values.description,
      engineeringDiscipline: values.engineeringDiscipline,
      lastReviewed: values.lastReviewed || undefined,
      reviewerList: values.reviewerList
        ? values.reviewerList.split(",").map((s) => s.trim())
        : [],
    };

    try {
      const token = localStorage.getItem("fmea_token");
      if (!token) {
        toast({
          title: "Error",
          description: "Authentication required",
          variant: "destructive",
        });
        return;
      }

      const url = isEdit ? `${API_BASE}/${id}` : API_BASE;
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.error("Save failed:", res.status, errBody);
        toast({
          title: "Error",
          description: (errBody as any).error || "Save failed",
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Success", description: isEdit ? "Updated" : "Created" });
      navigate("/equipment-classes");
    } catch (err) {
      console.error("Network error:", err);
      toast({
        title: "Error",
        description: "Network error",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/equipment-classes")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit" : "Add"} Equipment Class
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* discipline */}
          <FormField
            control={form.control}
            name="engineeringDiscipline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discipline</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border rounded p-2">
                    {[
                      "Mechanical",
                      "Electrical",
                      "Instrumentation",
                      "Civil",
                      "Process",
                    ].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* lastReviewed */}
          <FormField
            control={form.control}
            name="lastReviewed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Reviewed</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* reviewers */}
          <FormField
            control={form.control}
            name="reviewerList"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer List</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Comma‑separated" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/equipment-classes")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentClassForm;
