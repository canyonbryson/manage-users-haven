
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  "DOCTOR",
  "PT",
  "TRAINER",
  "ADMIN",
  "COACH",
  "ATHLETE",
  "PATIENT",
  "CLINICAL SPECIALIST",
] as const;

type Role = typeof roles[number];

const AddUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "DOCTOR" as Role,
    office_name: "",
    phone_number: "",
    office_phone_number: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // The trigger will automatically create the user record,
        // we just need to update it with the provided data
        const { error: updateError } = await supabase
          .from('users')
          .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            role: formData.role,
            office_name: formData.office_name,
            phone_number: formData.phone_number,
            office_phone_number: formData.office_phone_number,
          })
          .eq('id', authData.user.id);

        if (updateError) throw updateError;

        toast({
          title: "Success",
          description: "User has been created successfully",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Failed to create user",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-semibold">Add New User</h1>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="transition-all hover:scale-[1.02]"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={formData.role}
                onValueChange={(value: Role) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="office_name" className="text-sm font-medium">
                Office Name
              </label>
              <Input
                id="office_name"
                value={formData.office_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    office_name: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone_number" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="office_phone_number" className="text-sm font-medium">
                  Office Phone Number
                </label>
                <Input
                  id="office_phone_number"
                  type="tel"
                  value={formData.office_phone_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      office_phone_number: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating User..." : "Create User"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddUser;
