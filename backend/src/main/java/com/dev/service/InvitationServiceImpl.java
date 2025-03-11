package com.dev.service;

import com.dev.model.Invitation;
import com.dev.repository.InvitationRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService{

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public void sendInvitation(String email, Long projectId) throws MessagingException {

        String invitationToken= UUID.randomUUID().toString();

        Invitation invitation= new Invitation();
        invitation.setEmail(email);
        invitation.setProjectId(projectId);
        invitation.setToken(invitationToken);

        invitationRepository.save(invitation);
        String invitationLink="http://localhost:8080/accept_invitation?token"+invitationToken;
        emailService.sendEmailWithToken(email,invitationLink);

    }

    @Override
    public Invitation acceptInvitation(String token, Long userId) {
        return null;
    }

    @Override
    public String getTokenByUserMail(String userEmail) {
        return "";
    }

    @Override
    public void deleteToken(String token) {

    }
}
