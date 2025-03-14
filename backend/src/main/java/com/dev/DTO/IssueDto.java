package com.dev.DTO;

import com.dev.model.Project;
import com.dev.model.User;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class IssueDto {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDate dueDate;
    private List<String> tags;
    private User assignee;
    private Project project;
    private Long projectId; // Add this field
}