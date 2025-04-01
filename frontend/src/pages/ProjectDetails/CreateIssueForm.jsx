import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react"; // Certifique-se de importar useState e useEffect
// Supondo que você tenha esses componentes

const CreateIssueForm = ({ projectId, onIssueCreated, issue, onClose }) => {
  // Estado inicial para os campos do formulário, dependendo se é uma criação ou edição
  const [title, setTitle] = useState(issue ? issue.title : "");
  const [description, setDescription] = useState(
    issue ? issue.description : ""
  );
  const [priority, setPriority] = useState(issue ? issue.priority : "");
  const [assignee, setAssignee] = useState(issue ? issue.assignee : "");

  useEffect(() => {
    if (issue) {
      setTitle(issue.title);
      setDescription(issue.description);
      setPriority(issue.priority);
      setAssignee(issue.assignee); // Não permite editar o responsável
    }
  }, [issue]); // Atualiza quando a issue for alterada

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      title,
      description,
      priority,
      projectId,
      assignee: assignee ? assignee.id : null, // Garantir que o responsável seja um ID
    };

    try {
      let response;
      if (issue) {
        // Se uma issue for passada, significa que estamos editando
        response = await fetch(`http://localhost:8080/api/issues/${issue.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Se não, criamos uma nova issue
        response = await fetch(`http://localhost:8080/api/issues`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error("Erro ao salvar a issue");
      }

      const data = await response.json();
      onIssueCreated((prevIssues) => {
        if (issue) {
          // Se estamos editando, substituímos a issue no estado
          return prevIssues.map((i) => (i.id === data.id ? data : i));
        } else {
          // Se estamos criando, adicionamos a nova issue no estado
          return [...prevIssues, data];
        }
      });
      onClose(); // Fechar o modal
    } catch (error) {
      console.error("Erro ao salvar a issue:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="text-sm">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="text-sm">
          Description
        </label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="priority" className="text-sm">
          Priority
        </label>
        <Select
          value={priority}
          onValueChange={(value) => setPriority(value)} // onValueChange é o evento correto
          required
        >
          <SelectTrigger className="w-full">
            <span>{priority || "Select Priority"}</span>{" "}
            {/* Exibe a prioridade selecionada ou um texto padrão */}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* O campo de responsável está desabilitado para edição */}
      <div>
        <label htmlFor="assignee" className="text-sm">
          Assignee
        </label>
        <Input
          id="assignee"
          value={assignee ? assignee.fullName : "Não editável"}
          disabled
          className="w-full bg-gray-200"
        />
      </div>

      {/* O campo de status está desabilitado para edição */}
      <div>
        <label htmlFor="status" className="text-sm">
          Status
        </label>
        <Input
          id="status"
          value={issue ? issue.status : "To Do"}
          disabled
          className="w-full bg-gray-200"
        />
      </div>

      <Button type="submit" variant="outline" className="w-full mt-4">
        {issue ? "Update Issue" : "Create Issue"}
      </Button>
    </form>
  );
};

export default CreateIssueForm;
