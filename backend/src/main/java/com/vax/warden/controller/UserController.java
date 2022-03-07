package com.vax.warden.controller;

import com.vax.warden.model.User;
import com.vax.warden.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    // TODO move to admin? even authenticated users should not be able to list all users
    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<User> list() {
        return userService.findAll();
    }
}
