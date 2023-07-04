package com.form.example.controller;

import com.form.example.model.User;
import com.form.example.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        boolean authenticated = authenticateUser(username, password);

        if(authenticated){
            return "Login successful";
        }
        return "Invalid username or password";
    }

    private boolean authenticateUser(String name, String password) {

        User user = userRepository.findByUsername(name);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }

        return false;
    }
}
