package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Post;
import com.vax.warden.model.User;
import com.vax.warden.repository.ForumRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final ForumRepository forumRepository;
    private final UserService userService;

    public Post createPost(Post post, String email) {
        User user = userService.findByEmail(email);
        post.setPoster(user);
        return forumRepository.save(post);
    }

    public Post createReply(Post post, String email) {
        Long originalPostId = post.getReplyToPostId();
        if (originalPostId == null) {
            throw new IllegalArgumentException("Not a reply to any post!");
        }
        Optional<Post> originalPost = forumRepository.findById(originalPostId);
        if (!originalPost.isPresent() || originalPost.get().getReplyToPostId() != null) {
            String errorMessage = "No original post found with id = " + originalPostId;
            throw new ResourceNotFoundException(errorMessage);
        }
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
