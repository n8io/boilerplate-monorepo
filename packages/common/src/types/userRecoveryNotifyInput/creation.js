import { assoc, omit, pick, pipe, prop, when } from 'ramda';
import { UserRecoveryNotifyMethod } from 'types/userRecoveryNotifyMethod';

const makeInitial = (user) =>
  pipe(
    pick(['email', 'id']),
    when(
      prop('email'),
      assoc('notificationMethod', UserRecoveryNotifyMethod.EMAIL)
    ),
    omit(['email'])
  )(user);

export { makeInitial };
