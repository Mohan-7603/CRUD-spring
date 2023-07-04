package com.form.example.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "usermanagement")
public class ManageUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;
}
