package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    User getUserByEmail(String email);

    List<User> getAllUsers();

    void save(User user);

    void update(User user);

    User getUser(long id);

    void deleteUser(long id);

    User passwordCoder(User user);

    List<Role> getAllRoles();

    Role getRoleById(long id);

}
