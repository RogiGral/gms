import Api from '../../Api';
import { GetWorkoutsForUserResponse } from './responses';

export default class Workouts {
  public static async getWorkouts() {
    const response = await Api.createClient().get('workout/list');
    console.log('response:', response);
    return response.data as GetWorkoutsForUserResponse;
  }

  public static async getWorkoutsForUser(username: string) {
    const response = await Api.createClient().get(
      `/user-workout/list/?username=${username}`,
    );

    return response.data as GetWorkoutsForUserResponse;
  }

  public static async joinWorkout(username: string, workoutId: string) {
    const response = await Api.createClient().post(
      `/user-workout/add?username=${username}&workoutId=${workoutId}`,
    );

    return response.data;
  }

  public static async leaveWorkout(workoutId: string) {
    const response = await Api.createClient().delete(
      `/user-workout/delete/${workoutId}`,
    );

    return response.data;
  }
}
