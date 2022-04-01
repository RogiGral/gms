package com.gymsystem.gms.service.Impl;

import com.gymsystem.gms.exceptions.model.UserIsAlreadyInWorkoutException;
import com.gymsystem.gms.exceptions.model.WorkoutIsFullException;
import com.gymsystem.gms.exceptions.model.WorkoutNotFoundException;
import com.gymsystem.gms.model.User;
import com.gymsystem.gms.model.UserWorkout;
import com.gymsystem.gms.model.Workout;
import com.gymsystem.gms.repository.UserRepository;
import com.gymsystem.gms.repository.UserWorkoutRepository;
import com.gymsystem.gms.repository.WorkoutRepository;
import com.gymsystem.gms.service.UserWorkoutService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.gymsystem.gms.constraints.WorkoutConstraint.*;

@Service
@Transactional
public class UserWorkoutServiceImpl implements UserWorkoutService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private UserRepository userRepository;
    private WorkoutRepository workoutRepository;
    private UserWorkoutRepository userWorkoutRepository;

    public UserWorkoutServiceImpl(UserRepository userRepository, WorkoutRepository workoutRepository, UserWorkoutRepository userWorkoutRepository) {
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
        this.userWorkoutRepository = userWorkoutRepository;
    }

    @Override
    public List<UserWorkout> getAllUserWorkouts(Long id) {
        return userWorkoutRepository.findAllByUserId(id);
    }

    @Override
    public UserWorkout addUserToWorkout(Long userId, Long workoutId) throws WorkoutNotFoundException, WorkoutIsFullException, UserIsAlreadyInWorkoutException {
        checkIfUserExists(userId);
        checkIfWorkoutExists(workoutId);
        checkIfWorkoutIsFull(workoutId);
        checkIfUserEnterWorkout(userId,workoutId);
        UserWorkout userWorkout = new UserWorkout();
        userWorkout.setUserId(userRepository.findUserById(userId));
        userWorkout.setWorkoutId(workoutRepository.findWorkoutById(workoutId));
        userWorkoutRepository.save(userWorkout);
        LOGGER.info("User added to workout");
        return userWorkout;
    }

    private void checkIfUserEnterWorkout(Long userId, Long workoutId) throws UserIsAlreadyInWorkoutException {
        UserWorkout userWorkout = userWorkoutRepository.findUserWorkoutByUserIdAndWorkoutId(userId,workoutId);
        if(userWorkout!=null){
            throw new UserIsAlreadyInWorkoutException(USER_IS_IN_WORKOUT);
        }
    }

    private void checkIfWorkoutIsFull(Long workoutId) throws WorkoutIsFullException {
        Workout workout = workoutRepository.findWorkoutById(workoutId);
        if(workout.getCapacity() <= workout.getParticipantsNumber()){
            throw new WorkoutIsFullException(WORKOUT_IS_FULL);
        } else {
            workout.setParticipantsNumber(workout.getParticipantsNumber()+1);
        }
    }

    @Override
    public void deleteUserWorkout(Long id) throws WorkoutNotFoundException {
        checkIfUserWorkoutExists(id);
        UserWorkout userWorkout = userWorkoutRepository.findUserWorkoutById(id);
        Workout workout = userWorkout.getWorkoutId();
        workout.setParticipantsNumber(workout.getParticipantsNumber()-1);
        userWorkoutRepository.deleteById(id);
    }

    private void checkIfUserWorkoutExists(Long id) throws WorkoutNotFoundException {
        UserWorkout userWorkout = userWorkoutRepository.findUserWorkoutById(id);
        if(userWorkout == null){
            throw new WorkoutNotFoundException(USERWOKOUT_DOES_NOT_EXISTS);
        }
    }

    private void checkIfWorkoutExists(Long workoutId) throws WorkoutNotFoundException {
       Workout workout = workoutRepository.findWorkoutById(workoutId);
       if(workout == null){
           throw new WorkoutNotFoundException(WORKOUT_DOES_NOT_EXISTS+workoutId);
       }
    }

    private void checkIfUserExists(Long userId) {
        User user = userRepository.findUserById(userId);
        if(user == null){
            throw new UsernameNotFoundException("No user found by id: "+userId);
        }
    }
}
