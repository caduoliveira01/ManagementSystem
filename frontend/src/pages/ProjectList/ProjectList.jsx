import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProjectCard from "../Project/ProjectCard";
import { toast } from "sonner";

export const tag = [
  "All",
  "React",
  "Spring boot",
  "mySQL",
  "Next.js",
  "Angular",
  "MongoDB",
  "Python",
  "Php",
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState({
    category: "all",
    tag: "All",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
        applyFilters(data, currentFilters);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const applyFilters = (projectsToFilter, filters) => {
    let result = [...projectsToFilter];

    if (filters.category && filters.category !== "all") {
      result = result.filter(
        (project) => project.category === filters.category
      );
    }

    if (filters.tag && filters.tag !== "All") {
      result = result.filter(
        (project) => project.tags && project.tags.includes(filters.tag)
      );
    }

    setFilteredProjects(result);
  };

  const handleFilterChange = (section, value) => {
    const newFilters = {
      ...currentFilters,
      [section]: value,
    };

    setCurrentFilters(newFilters);
    applyFilters(projects, newFilters);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/projects/search?keyword=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to search projects");
        }

        const data = await response.json();
        applyFilters(data, currentFilters);
      } catch (error) {
        console.error("Error searching projects:", error);
        toast.error("Search failed");
      }
    } else {
      applyFilters(projects, currentFilters);
    }
  };

  const handleProjectCreated = (newProject) => {
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    applyFilters(updatedProjects, currentFilters);
  };

  const handleProjectUpdated = (updatedProject) => {
    const updatedProjects = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    applyFilters(updatedProjects, currentFilters);
  };

  const handleProjectDeleted = (deletedProjectId) => {
    const updatedProjects = projects.filter((p) => p.id !== deletedProjectId);
    setProjects(updatedProjects);
    applyFilters(updatedProjects, currentFilters);
  };

  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filterSection">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl -tracking-wider">Filters</p>
              <Button size="icon" variant="ghost">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-7 pt-5"
                      value={currentFilters.category}
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fullstack" id="r2" />
                        <Label htmlFor="r2">Full stack</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="backend" id="r3" />
                        <Label htmlFor="r3">Back-end</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="frontend" id="r4" />
                        <Label htmlFor="r4">Front-end</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-7 pt-5"
                      value={currentFilters.tag}
                      onValueChange={(value) =>
                        handleFilterChange("tag", value)
                      }
                    >
                      {tag.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`r1-${item}`} />
                          <Label htmlFor={`r1-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="p-0 relative w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="Search project"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh]">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading projects...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <p>No projects found</p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onProjectUpdated={handleProjectUpdated}
                    onProjectDeleted={handleProjectDeleted}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectList;
