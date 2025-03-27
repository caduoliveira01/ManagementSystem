import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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

const ProjectForm = ({ initialData, onSubmit, onCancel }) => {
  const [selectedTags, setSelectedTags] = useState(initialData?.tags || []);

  const form = useForm({
    defaultValues: initialData || {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const handleTagChange = (value) => {
    if (!selectedTags.includes(value)) {
      setSelectedTags((prevTags) => [...prevTags, value]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = (data) => {
    const projectData = {
      ...data,
      tags: selectedTags,
    };
    onSubmit(projectData);
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
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
                  required
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
                  required
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
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
                <Select onValueChange={handleTagChange} value="">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tags" />
                  </SelectTrigger>
                  <SelectContent>
                    {tag
                      .filter((t) => t !== "All")
                      .map((item) => (
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
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
