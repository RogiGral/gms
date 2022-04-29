import React from 'react';
import { useQuery } from 'react-query';
import Workouts from '../../../api/requests/workouts';
import { loadWorkouts } from '../../../reducers/workoutsReducer';
import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import { loadMembership } from '../../../reducers/membershipReducer';
import Api from '../../../api/Api';

interface Props {}

export default function Membership({}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)!;

  const membershipQuery = useQuery(
    'membership',
    () => Api.Memberships.getMembership(user.id),
    {
      onSuccess: data => {
        console.log('data fetch membership:', data);
        dispatch(loadMembership(data));
      },
    },
  );

  return (
    <>
      <h2>Membership</h2>
    </>
  );
}
