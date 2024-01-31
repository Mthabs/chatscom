// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={''}
      alt={user?.username}
      color={user?.photoURL ? 'default' : createAvatar(user?.username).color}
      {...other}
    >
      {createAvatar(user?.username).name}
    </Avatar>
  );
}
