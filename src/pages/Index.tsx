
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Welcome</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/login")}
            className="w-full py-6 text-lg font-medium transition-all hover:scale-[1.02]"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
