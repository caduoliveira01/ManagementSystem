import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing from the URL.");
      setLoading(false);
      return;
    }

    const fetchProjectData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:8080/api/projects/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch project data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 justify-between pb-4">
        <ScrollArea className="h-screen lg:w-[69%] pr-2">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5">{projectData.name}</h1>
            <div className="space-y-5 pb-10">
              <p className="w-full md:max-w-lg lg:max-w-xl text-sm">
                {projectData.description}
              </p>
              <div className="flex">
                <p className="w-36">Project Lead:</p>
                {/* Usando o fullName do owner */}
                <p>
                  {projectData.owner
                    ? projectData.owner.fullName
                    : "Not Assigned"}
                </p>
              </div>
              <div className="flex">
                <p className="w-36">Members:</p>
                <div className="flex items-center gap-2">
                  {projectData.team &&
                    projectData.team.map((member) => (
                      <Avatar className="cursor-pointer" key={member.id}>
                        {/* Avatar fallback usando a inicial do nome do membro */}
                        <AvatarFallback>{member.fullName[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="ml-2">
                      <span>Invite</span>
                      <PlusIcon className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Invite User</DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex">
                <p className="w-36">Category:</p>
                <p>{projectData.category}</p>
              </div>
              <div className="flex">
                <p className="w-36">Tags:</p>
                {projectData.tags &&
                  projectData.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
              </div>
            </div>
            <section>
              <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5">
                <IssueList
                  status="To Do"
                  title="To do list"
                  projectId={projectId}
                />
                <IssueList
                  status="In Progress"
                  title="In Progress"
                  projectId={projectId}
                />
                <IssueList status="Done" title="Done" projectId={projectId} />
              </div>
            </section>
          </div>
        </ScrollArea>
        <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
          <ChatBox projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
