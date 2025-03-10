package com.dev.controller;

import com.dev.model.Project;
import com.dev.model.User;
import com.dev.service.ProjectService;
import com.dev.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(required = false)String category,
            @RequestParam(required = false)String tag,
            @RequestParam("Authorization")String jwt
    ) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects= projectService.getProjectByTeam(user,category,tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectsById(
            @PathVariable Long projectId,
            @RequestParam("Authorization")String jwt
    ) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Project project= projectService.getProjectById(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @PathVariable Long projectId,
            @RequestParam("Authorization")String jwt,
            @RequestBody Project project
    ) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Project createProject= projectService.createProject(project, user);
        return new ResponseEntity<>(createProject, HttpStatus.OK);
    }

}
