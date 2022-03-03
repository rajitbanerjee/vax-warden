package com.vax.warden.controller;

import com.vax.warden.model.Post;
import com.vax.warden.service.ForumService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/forum")
public class ForumController {

    private final ForumService forumService;

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Post post(@Valid @RequestBody Post post) {
        return forumService.save(post);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<Post> list() {
        return forumService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Post getPostById(@PathVariable Long id) {
        return forumService.getPostById(id);
    }
}
