import { signup as signupController } from './signup';
import { signupVerify as signupVerifyController } from './signupVerify';
import Trips from './Trips';
import { assignRole, createRole, addNewUser } from './RolesController';
import addRoom from './RoomController';
import addAccommodation from './AccommodationController';
import updatePermissions from './PermissionsController';

export {
  signupController, addAccommodation,
  signupVerifyController, Trips,
  addRoom, assignRole, createRole, addNewUser, updatePermissions
};
