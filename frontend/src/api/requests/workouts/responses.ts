import { Workout } from 'src/api/models';

export type GetWorkoutsResponse = Workout[];

interface UserWorkoutResponse {
  id: number;
  userId: { id: number; [key: string]: any };
  workoutId: { id: number; [key: string]: any };
}

export type GetWorkoutsForUserResponse = UserWorkoutResponse[];

// export interface GetWorkoutsForUserResponse {
//   workouts: Workout[];
// }
