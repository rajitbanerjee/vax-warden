package com.vax.warden.repository;

import com.vax.warden.model.User;
import com.vax.warden.model.UserRole;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByPpsn(String ppsn);

    List<User> findAllByUserRole(UserRole userRole);
}
