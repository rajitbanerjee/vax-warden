package com.vax.warden.controller;

import com.vax.warden.model.Statistics;
import com.vax.warden.security.AuthUtil;
import com.vax.warden.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;
    private final AuthUtil authUtil;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getAggregatedStatistics() {
        return statisticsService.aggregateAll();
    }

    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getUserStatistics(@RequestHeader("Authorization") String auth) {
        return statisticsService.getStatisticsById(authUtil.getIdFromHeader(auth));
    }
}
