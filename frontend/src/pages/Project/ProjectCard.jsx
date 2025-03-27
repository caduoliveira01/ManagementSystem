import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectForm from "./ProjectForm";

const ProjectCard = ({ project, onProjectUpdated, onProjectDeleted }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/projects/${project.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const data = await response.json();
      onProjectUpdated(data);
      setIsEditModalOpen(false);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/projects/${project.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      onProjectDeleted(project.id);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card className="p-5 w-full lg:max-w-3x1">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="justify-between flex">
              <div className="flex items-center gap-5">
                <h1
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="cursor-pointer font-bold text-lg"
                >
                  {project.name}
                </h1>
                <DotFilledIcon />
                <p className="text-sm text-gray-400 capitalize">
                  {project.category.replace("-", " ")}
                </p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      className="rounded-full"
                      variant="ghost"
                      size="icon"
                    >
                      <DotsHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-gray-400 text-sm ">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {project.tags &&
              project.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ProjectForm
            initialData={project}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
