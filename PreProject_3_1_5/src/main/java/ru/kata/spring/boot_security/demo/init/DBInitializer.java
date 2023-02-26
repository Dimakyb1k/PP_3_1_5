package ru.kata.spring.boot_security.demo.init;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.annotation.PostConstruct;
import java.util.Set;

@Service
public class DBInitializer {
    private final UserService userService;
    private final UserRepository userRepository;

    private final RoleRepository roleService;
    public DBInitializer(UserService userService,
                         UserRepository userRepository, RoleRepository roleService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    @Transactional
    @PostConstruct
    public void initDB() {
        roleService.save(new Role(1L,"ROLE_USER"));
        roleService.save(new Role(2L,"ROLE_ADMIN"));
        userService.save(new User(1L,"111","admin","admin",27,"admin",Set.of(new Role(2L))));
//        userService.saveUser(new User("user", "user@test.com", (byte) 25,
//                "user", Set.of(new Role(2L, "USER"))));
        //пaроль 111 ;)
    }
}
