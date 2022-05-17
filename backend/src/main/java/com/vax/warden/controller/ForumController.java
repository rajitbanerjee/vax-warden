package com.vax.warden.controller;

import com.vax.warden.model.Post;
import com.vax.warden.service.ForumService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
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
    private static final Logger logger = LogManager.getLogger(ForumController.class);

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Post post(@Valid @RequestBody Post post, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        Post newPost = forumService.createPost(post, email);
        logger.info("Creating new post: " + newPost.getId());
        return newPost;
    }

    @PostMapping("/reply")
    @ResponseStatus(HttpStatus.CREATED)
    public Post reply(@Valid @RequestBody Post post, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        logger.info("Creating new reply for post: " + post.getReplyToPostId());
        return forumService.createReply(post, email);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<Post> list() {
        logger.info("Returning list of all posts");
        return forumService.findAll();
    }
}
