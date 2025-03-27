import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        {/* Seção do Avatar - Agora corretamente centralizada */}
        <div className="flex justify-center pt-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-3xl bg-primary/10">
              {user?.firstName ? (
                user.firstName.charAt(0).toUpperCase()
              ) : (
                <PersonIcon />
              )}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardHeader className="items-center pb-2">
          <CardTitle className="text-2xl">
            {user?.firstName} {user?.lastName}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Seção do Email - Label ao lado do valor */}
          <div className="flex items-center justify-center gap-3">
            <EnvelopeClosedIcon className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>
          </div>

          {/* Botões em coluna */}
          <div className="flex flex-col space-y-3 pt-4">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
