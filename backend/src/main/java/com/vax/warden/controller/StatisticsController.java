package com.vax.warden.controller;

import com.vax.warden.model.Statistics;
import com.vax.warden.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getStatistics() {
        Statistics statistics = statisticsService.aggregateAll();
        System.out.println(statistics);
        return statisticsService.aggregateAll();
    }

    @GetMapping("/vaccination/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getStatisticsById(@PathVariable long id) {
        return statisticsService.getStatisticsById(id);
    }

    @GetMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Statistics getStatisticsByUserId(@PathVariable long id) {
        return statisticsService.getStatisticsByUserId(id);
    }
}
