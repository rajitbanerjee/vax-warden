package com.vax.warden.repository;

import com.vax.warden.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Post, Long> {}
