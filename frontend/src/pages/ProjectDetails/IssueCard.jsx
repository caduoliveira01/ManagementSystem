import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const IssueCard = ({ issue, onStatusChange, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/issues/${issue.id}/status/${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status.");
      }

      onStatusChange(issue.id, newStatus);
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer"
            onClick={() =>
              navigate(`/project/${issue.projectId}/issue/${issue.id}`)
            }
          >
            {issue.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="rounded-full" size="icon" variant="ghost">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleStatusChange("In Progress")}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("Done")}>
                Done
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(issue)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(issue.id)}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <p>Prioridade: {issue.priority}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="icon"
                className="bg-gray-900 hover:text-black text-white rounded-full"
              >
                <Avatar>
                  <AvatarFallback>
                    {issue.assignee ? (
                      issue.assignee.fullName[0]
                    ) : (
                      <PersonIcon />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <p className="p-2">
                {issue.assignee ? issue.assignee.fullName : "Sem responsável"}
              </p>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
