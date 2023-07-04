package com.form.example.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ems")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
}
