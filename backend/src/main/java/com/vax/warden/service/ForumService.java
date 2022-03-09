package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Post;
import com.vax.warden.model.User;
import com.vax.warden.repository.ForumRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final ForumRepository forumRepository;
    private final UserService userService;

    public Post save(Post post, String email) {
        User user = userService.findByEmail(email);
        post.setPoster(user);
        return forumRepository.save(post);
    }

    public List<Post> findAll() {
        return forumRepository.findAll();
    }

    public Post getPostById(Long id) {
        String errorMessage = "No post found with id = " + id;
        return forumRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
    }
}
