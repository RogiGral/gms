import Api from '../../Api';
import { GetWorkoutsForUserResponse, GetWorkoutsResponse } from './responses';

export default class Workouts {
  public static async getWorkouts() {
    const response = await Api.createClient().get('workout/list');
    console.log('response:', response);
    return response.data as GetWorkoutsResponse;
  }

  public static async getWorkoutsForUser(userId: number) {
    const response = await Api.createClient().get(
      `/user-workout/list/?userId=${userId}`,
    );

    return response.data as GetWorkoutsForUserResponse;
  }

  public static async joinWorkout(userId: number, workoutId: number) {
    const response = await Api.createClient().post(
      `/user-workout/add?userId=${userId}&workoutId=${workoutId}`,
    );

    return response.data;
  }

  public static async leaveWorkout(userWorkoutId: number) {
    const response = await Api.createClient().delete(
      `/user-workout/delete/${userWorkoutId}`,
    );

    return response.data;
  }

  public static async deleteWorkout(workoutId: number) {
    const response = await Api.createClient().delete(
      `/workout/delete/${workoutId}`,
    );

    return response.data as undefined;
  }

  public static async updateWorkout(
    workoutId: number,
    newWorkoutName: string,
    newTrainerUsername: string,
    newRoomNumber: string,
    capacity: number,
    participantsNumber: number,
    newWorkoutStartDate: string,
    newWorkoutEndDate: string,
  ) {
    const response = await Api.createClient().post(
      `/workout/update?workoutId=${workoutId}&newWorkoutName=${newWorkoutName}&newTrainerUsername=${newTrainerUsername}&newRoomNumber=${newRoomNumber}&capacity=${capacity}&participantsNumber=${participantsNumber}&newWorkoutStartDate=${newWorkoutStartDate}&newWorkoutEndDate=${newWorkoutEndDate}`,
    );

    return response.data as undefined;
  }

  public static async createWorkout(
    workoutName: string,
    trainerUsername: string,
    roomNumber: string,
    capacity: number,
    workoutStartDate: string,
    workoutEndDate: string,
  ) {
    const response = await Api.createClient().post(
      `workout/add?workoutName=${workoutName}&trainerUsername=${trainerUsername}&roomNumber=${roomNumber}&capacity=${capacity}&workoutStartDate=${workoutStartDate}&workoutEndDate=${workoutEndDate}`,
    );
    return response.data as undefined;
  }
}
