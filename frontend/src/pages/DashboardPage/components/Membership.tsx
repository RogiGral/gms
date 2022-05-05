import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import {
  loadMemberships,
  loadUserMembership,
} from '../../../reducers/membershipReducer';
import Api from '../../../api/Api';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { MembershipType, UserRole } from '../../../api/models';
import Button from '@mui/material/Button';
import AssignUserToMembershipModal from './AssignUserToMembershipModal';
import CreateMembershipModal from './ CreateMembershipModal';
import EditMembershipModal from './EditMembershipModal';
import { toast } from 'react-toastify';

interface Props {}

export default function Membership({}: Props) {
  const [showCreateMembershipModal, setShowCreateMembershipModal] =
    useState(false);
  const [showEditMembershipModal, setShowEditMembershipModal] = useState(false);
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipType | null>(null);
  const [showAssignUserModal, setShowAssignUserModal] = useState(false);
  const [selectedMembershipId, setSelectedMembershipId] = useState<
    number | null
  >(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)!;
  const isAdmin = user.role === UserRole.ROLE_ADMIN;
  const { userMembership, memberships } = useAppSelector(
    state => state.membership,
  );

  const userMembershipQuery = useQuery(
    'userMembership',
    () => Api.Memberships.getMembership(user.id),
    {
      onSuccess: data => {
        dispatch(loadUserMembership(data));
      },
    },
  );

  const membershipsQuery = useQuery(
    'memberships',
    () => Api.Memberships.getMemberships(),
    {
      onSuccess: data => {
        dispatch(loadMemberships(data));
      },
    },
  );

  const deleteMembershipMutation = useMutation(
    ({ id }: { id: number }) => {
      return Api.Memberships.deleteMembership(id);
    },
    {
      onError: (error: Error) => {
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('Membership has been deleted');
        membershipsQuery.refetch();
      },
    },
  );

  const renderMembership = () => {
    if (userMembershipQuery.isLoading && !userMembershipQuery.isRefetching) {
      return <div>Loading membership...</div>;
    }

    if (userMembershipQuery.isError) {
      return <div>Error when loading membership.</div>;
    }

    if (!userMembership) {
      return (
        <div>
          You don't have membership. Please contact our team to get your
          membership.
        </div>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Number of months</TableCell>
              <TableCell align="left">Start date</TableCell>
              <TableCell align="left">End date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">{userMembership.name}</TableCell>
              <TableCell align="left">{userMembership.price}</TableCell>
              <TableCell align="left">
                {userMembership.numberOfMonths}
              </TableCell>
              <TableCell align="left">
                {userMembership.startDate.toLocaleDateString()}
              </TableCell>
              <TableCell align="left">
                {userMembership.endDate.toLocaleDateString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderAvailableMemberships = () => {
    if (membershipsQuery.isLoading && !membershipsQuery.isRefetching) {
      return <div>Loading available memberships...</div>;
    }

    if (membershipsQuery.isError) {
      return <div>Error when loading memberships.</div>;
    }

    if (memberships.length === 0) {
      return <div>Currently, there are no available memberships.</div>;
    }

    return (
      <TableContainer component={Paper}>
        <Table aria-label="available memberships">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Number of months</TableCell>
              {(user.role === UserRole.ROLE_COACH ||
                user.role === UserRole.ROLE_ADMIN) && (
                <TableCell align="right" />
              )}
              {user.role === UserRole.ROLE_ADMIN && (
                <>
                  <TableCell align="right" />
                  <TableCell align="right" />
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {memberships.map(membership => (
              <TableRow key={membership.id}>
                <TableCell align="left">{membership.name}</TableCell>
                <TableCell align="left">{membership.price} PLN</TableCell>
                <TableCell align="left">{membership.numberOfMonths}</TableCell>
                {(user.role === UserRole.ROLE_COACH ||
                  user.role === UserRole.ROLE_ADMIN) && (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setShowAssignUserModal(true);
                        setSelectedMembershipId(membership.id);
                      }}
                    >
                      Assign user
                    </Button>
                  </TableCell>
                )}
                {user.role === UserRole.ROLE_ADMIN && (
                  <>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedMembership(membership);
                          setShowEditMembershipModal(true);
                          setSelectedMembershipId(membership.id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          deleteMembershipMutation.mutate({ id: membership.id })
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <h2>Membership</h2>
      {!isAdmin && (
        <>
          <h3>Your membership</h3>
          {renderMembership()}
        </>
      )}

      <h3>Available memberships</h3>
      {renderAvailableMemberships()}

      {isAdmin && (
        <Button
          variant="contained"
          onClick={() => setShowCreateMembershipModal(true)}
          style={{ marginTop: 20 }}
        >
          Create new membership
        </Button>
      )}

      <AssignUserToMembershipModal
        open={showAssignUserModal}
        handleClose={() => {
          setShowAssignUserModal(false);
          setSelectedMembershipId(null);
        }}
        membershipTypeId={selectedMembershipId as number}
      />
      <CreateMembershipModal
        open={showCreateMembershipModal}
        handleClose={() => {
          setShowCreateMembershipModal(false);
          membershipsQuery.refetch();
        }}
      />
      {isAdmin && selectedMembership && (
        <EditMembershipModal
          open={showEditMembershipModal}
          handleClose={() => {
            setShowEditMembershipModal(false);
            setSelectedMembership(null);
            membershipsQuery.refetch();
          }}
          selectedMembership={selectedMembership as MembershipType}
        />
      )}
    </div>
  );
}
