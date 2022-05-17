package com.vax.warden.controller;

import com.vax.warden.model.Statistics;
import com.vax.warden.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;
    private static final Logger logger = LogManager.getLogger(StatisticsController.class);

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getAggregatedStatistics() {
        logger.info("Returning aggregated statistics");
        return statisticsService.aggregateAll();
    }

    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getUserStatistics(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        logger.info("Returning statistics for user: " + email);
        return statisticsService.getStatisticsByEmail(email);
    }
}
