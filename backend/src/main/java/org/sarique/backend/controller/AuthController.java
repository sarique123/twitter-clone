package org.sarique.backend.controller;

import org.sarique.backend.config.JwtProvider;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.User;
import org.sarique.backend.model.Verification;
import org.sarique.backend.repository.UserRepository;
import org.sarique.backend.response.AuthResponse;
import org.sarique.backend.service.CustomUserDetailsServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsServiceImplementation customUserDetailsServiceImplementation;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        System.out.println("I am here");
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String birthDate = user.getBirthDate();

        User isEmailExists = userRepository.findByEmail(email);
        if(isEmailExists != null){
            throw new UserException("Account already exists with this email");
        }

        User createdUser = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .birthDate(birthDate)
                .verification(new Verification())
                .build();

        User savedUser = userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token,true);
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signInHandler(@RequestBody User user) throws UserException {
        String username = user.getEmail();
        String password = user.getPassword();

        Authentication authentication = authenticate(username,password);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token,true);
        return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
    }

    public Authentication authenticate(String username, String password){
        UserDetails userDetails = customUserDetailsServiceImplementation.loadUserByUsername(username);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid Username...");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password...");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
