package com.dev.repository;

import com.dev.model.Project;
import com.dev.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {

    //List<Project> findByOwner(User user);

    List<Project> findByNameContainingAndTeamContains(String partialName,User user);

    //@Query("SELECT p From Project p join p.team t where t=user")
    //List<Project> findProjectByTeam(@Param("user")User user);

    List<Project> findByTeamContainingOrOwner(User user,User owner);
}
