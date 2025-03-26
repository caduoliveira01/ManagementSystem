package com.dev.controller;

import com.dev.config.JwtProvider;
import com.dev.model.User;
import com.dev.repository.UserRepository;
import com.dev.request.LoginRequest;
import com.dev.response.AuthResponse;
import com.dev.service.CustomeUserDetailsImpl;
import com.dev.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomeUserDetailsImpl custumeUserDetails;

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception{
        User isUserExists = userRepository.findByEmail(user.getEmail());

        if (isUserExists!=null){
            throw new Exception("email already exists with another account");
        }

        User createUser= new User();

        createUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createUser.setEmail(user.getEmail());
        createUser.setFullName(user.getFullName());

        User savedUser=userRepository.save(createUser);

        subscriptionService.createSubscription(savedUser);

        Authentication authentication= new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setMessage("sign up success");
        response.setJwt(jwt);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signing(@RequestBody LoginRequest loginRequest){
        String username= loginRequest.getEmail();
        String password=loginRequest.getPassword();

        Authentication authentication= authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        // Pegando o usuário autenticado
        User user = userRepository.findByEmail(username);

        AuthResponse response = new AuthResponse();
        response.setMessage("sign in success");
        response.setJwt(jwt);
        response.setFullName(user.getFullName()); // Inclui o nome no response

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails= custumeUserDetails.loadUserByUsername(username);

        if (userDetails==null){
            throw new BadCredentialsException("Invalid username");
        }
        if (!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}

