package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role getRoleById(long id);
    List<Role> getRolesById(long id);
}
