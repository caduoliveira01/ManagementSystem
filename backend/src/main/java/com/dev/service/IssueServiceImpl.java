package com.dev.service;

import com.dev.model.Issue;
import com.dev.model.Project;
import com.dev.model.User;
import com.dev.repository.IssueRepository;
import com.dev.request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        Optional<Issue> issue = issueRepository.findById(issueId);
        if (issue.isPresent()) {
            return issue.get();
        }
        throw new Exception("No issues found with issue id " + issueId);
    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) throws Exception {
        // Use the project relationship to filter issues
        return issueRepository.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, User user) throws Exception {
        // Fetch the project using the projectId from the request
        Project project = projectService.getProjectById(issueRequest.getProjectId());

        // Create the issue
        Issue issue = new Issue();
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setStatus(issueRequest.getStatus());
        issue.setPriority(issueRequest.getPriority());
        issue.setDueDate(issueRequest.getDueDate());

        // Set the project relationship
        issue.setProject(project);

        // Save the issue
        return issueRepository.save(issue);
    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {
        // Check if the issue exists
        getIssueById(issueId);

        // Delete the issue
        issueRepository.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception {
        // Fetch the user and issue
        User user = userService.findUserById(userId);
        Issue issue = getIssueById(issueId);

        // Assign the user to the issue
        issue.setAssignee(user);

        // Save the updated issue
        return issueRepository.save(issue);
    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception {
        // Fetch the issue
        Issue issue = getIssueById(issueId);

        // Update the status
        issue.setStatus(status);

        // Save the updated issue
        return issueRepository.save(issue);
    }
}