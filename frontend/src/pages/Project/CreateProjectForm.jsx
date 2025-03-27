import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { tag } from "../ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";

const CreateProjectForm = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    const projectData = {
      name: data.name,
      description: data.description,
      category: data.category,
      tags: selectedTags,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o projeto");
      }

      const result = await response.json();
      console.log("Projeto criado com sucesso:", result);
      alert("Projeto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      alert("Erro ao criar projeto. Verifique sua conexão e tente novamente.");
    }
  };

  const handleTagChange = (value) => {
    setSelectedTags((prevTags) => [...prevTags, value]);
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue="fullstack"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    type="text"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full stack</SelectItem>
                      <SelectItem value="backend">Back-end</SelectItem>
                      <SelectItem value="frontend">Front-end</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      handleTagChange(value);
                      field.onChange(value);
                    }}
                    type="text"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {tag.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="gap-1 flex flex-wrap">
                  {selectedTags.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleRemoveTag(item)}
                      className="cursor-pointer flex rounded-full items-center border gap-2 py-1 px-4"
                    >
                      <span className="text-sm">{item}</span>
                      <Cross1Icon className="h-3 w-3" />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            {false ? (
              <div>
                <p>You can create only 3 projects with free plan</p>
              </div>
            ) : (
              <Button type="submit" className="w-full mt-5">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
