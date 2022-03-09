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
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    @GetMapping("/user/list")
    @ResponseStatus(HttpStatus.OK)
    public List<User> list() {
        return userService.findAll();
    }
}
