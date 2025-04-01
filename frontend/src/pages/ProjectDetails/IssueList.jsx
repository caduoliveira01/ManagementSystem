import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import IssueCard from "./IssueCard";
import { useParams } from "react-router-dom";

const IssueList = ({ title, status }) => {
  const { projectId } = useParams();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/api/issues/project/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar issues.");
        }

        const data = await response.json();

        const issuesData = Array.isArray(data) ? data : [];
        const filteredIssues = issuesData.filter(
          (issue) => issue.status.toLowerCase() === status.toLowerCase()
        );

        setIssues(filteredIssues);
      } catch (error) {
        console.error("Erro ao carregar issues:", error);
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchIssues();
    }
  }, [projectId, status]);

  const handleStatusChange = (issueId, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const handleDelete = async (issueId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/issues/${issueId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir a issue.");
      }

      setIssues((prevIssues) =>
        prevIssues.filter((issue) => issue.id !== issueId)
      );
    } catch (error) {
      console.error("Erro ao excluir issue:", error);
    }
  };

  const handleEdit = (issue) => {
    setEditingIssue(issue); // Armazenar a issue a ser editada
    setOpen(true); // Abrir o modal de criação
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Card className="w-full md:w=[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {loading ? (
                <p>Carregando...</p>
              ) : issues.length > 0 ? (
                issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onEdit={handleEdit} // Passando a função para edição
                  />
                ))
              ) : (
                <p>Nenhuma issue encontrada.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full items-center flex gap-2"
                onClick={() => setOpen(true)}
              >
                <PlusIcon /> Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIssue ? "Editar Issue" : "Criar nova Issue"}
            </DialogTitle>
          </DialogHeader>
          <CreateIssueForm
            projectId={projectId}
            onIssueCreated={setIssues}
            issue={editingIssue} // Passando a issue para edição
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
