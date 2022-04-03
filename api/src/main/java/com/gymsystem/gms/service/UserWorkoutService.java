package com.gymsystem.gms.service;

import com.gymsystem.gms.exceptions.model.*;
import com.gymsystem.gms.model.UserWorkout;
import com.gymsystem.gms.model.Workout;

import java.util.Date;
import java.util.List;

public interface UserWorkoutService {
    List<UserWorkout> getAllUserWorkouts(String username);
    UserWorkout addUserToWorkout(String username, Long workoutId) throws WorkoutNotFoundException, WorkoutIsFullException, UserIsAlreadyInWorkoutException;
    void deleteUserWorkout(Long id) throws WorkoutNotFoundException;
}
