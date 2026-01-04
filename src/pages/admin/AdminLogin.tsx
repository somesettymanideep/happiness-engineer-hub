import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (adminLogin(credentials.username, credentials.password)) {
      toast({ title: "Welcome!", description: "Successfully logged in." });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-gold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={credentials.username}
                  onChange={(e) => setCredentials((p) => ({ ...p, username: e.target.value }))}
                  placeholder="Enter username"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Enter password"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Default: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
