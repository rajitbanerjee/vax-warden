package com.vax.warden.controller;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Post;
import com.vax.warden.repository.ForumRepository;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/forum")
public class ForumController {

    @Autowired ForumRepository forumRepository;

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Post post(@Valid @RequestBody Post post) {
      return forumRepository.save(post);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<Post> list() {
      return forumRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Post getPostById(@PathVariable long id) {
      return forumRepository
              .findById(id)
              .orElseThrow(() -> new ResourceNotFoundException("No post found with id = " + id));
    }
}
