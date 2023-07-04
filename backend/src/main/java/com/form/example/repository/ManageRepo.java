package com.form.example.repository;

import com.form.example.model.ManageUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageRepo extends JpaRepository<ManageUser,Long> {

}
