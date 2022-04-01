package com.gymsystem.gms.controller;


import com.gymsystem.gms.exceptions.ExceptionHandling;
import com.gymsystem.gms.exceptions.model.WorkoutDateException;
import com.gymsystem.gms.exceptions.model.WorkoutExistException;
import com.gymsystem.gms.exceptions.model.WorkoutIsFullException;
import com.gymsystem.gms.exceptions.model.WorkoutNotFoundException;
import com.gymsystem.gms.model.HttpResponse;
import com.gymsystem.gms.model.User;
import com.gymsystem.gms.model.UserWorkout;
import com.gymsystem.gms.model.Workout;
import com.gymsystem.gms.service.UserWorkoutService;
import com.gymsystem.gms.service.WorkoutService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(value ="/workout/user")
@AllArgsConstructor
public class UserWorkoutController extends ExceptionHandling {
    @Autowired
    UserWorkoutService userWorkoutService;

    @PostMapping("/add")
    public ResponseEntity<UserWorkout> jointWorkout(@RequestParam("userId") Long userId,
                                                 @RequestParam("workoutId") Long workoutId) throws WorkoutNotFoundException, WorkoutIsFullException {
        UserWorkout newUserWorkout = userWorkoutService.addUserToWorkout(userId,workoutId);
        return new ResponseEntity<>(newUserWorkout, OK);
    }
    @GetMapping("/list")
    public ResponseEntity<List<UserWorkout>> getAllUserWorkouts(@RequestParam("userId") Long userId) {
        List<UserWorkout> userWorkouts = userWorkoutService.getAllUserWorkouts(userId);
        return new ResponseEntity<>(userWorkouts, OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpResponse> leaveWorkout(@PathVariable("id") Long id) throws WorkoutNotFoundException {
            userWorkoutService.deleteUserWorkout(id);
        return response(OK, "USER_LEFT_WORKOUT");
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }


}
