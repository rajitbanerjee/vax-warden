package com.vax.warden.repository;

import com.vax.warden.model.Forum;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Long> {}
