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

  public static async leaveWorkout(userId: number, workoutId: number) {
    const response = await Api.createClient().delete(
      `/user-workout/delete/${workoutId}?userId=${userId}`,
    );

    return response.data;
  }
}
