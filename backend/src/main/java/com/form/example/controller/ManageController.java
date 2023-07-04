package com.form.example.controller;

import com.form.example.model.ManageUser;
import com.form.example.repository.ManageRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manage")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class ManageController {

    private ManageRepo manageRepo;

    public ManageController(ManageRepo manageRepo) {
        this.manageRepo = manageRepo;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody ManageUser user){

        if (user.getMobile() == null || !isValidMobileNumber(user.getMobile())) {
            return ResponseEntity.badRequest().body("Invalid mobile number");
        }

        manageRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("user added successfully");
    }

    @PutMapping("/update/user/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody ManageUser updatedUser) {
        Optional<ManageUser> userOptional = manageRepo.findById(id);
        if (userOptional.isPresent()) {
            ManageUser existingUser = userOptional.get();

            // Update the user fields with the new values
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setMobile(updatedUser.getMobile());

            manageRepo.save(existingUser);

            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<ManageUser> getUser(@PathVariable Long id) {
        Optional<ManageUser> userOptional = manageRepo.findById(id);
        if (userOptional.isPresent()) {
            ManageUser user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ManageUser>> getUsers(){
        List<ManageUser> users = manageRepo.findAll();
        if(!users.isEmpty()){
            return ResponseEntity.ok(users);
        }
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ManageUser> deleteUser(@PathVariable Long id) {
        Optional<ManageUser> userOptional = manageRepo.findById(id);
        if (userOptional.isPresent()) {
            ManageUser user = userOptional.get();
            manageRepo.delete(user);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private boolean isValidMobileNumber(String mobileNumber) {

        return mobileNumber.matches("\\d{10}");
    }
}
