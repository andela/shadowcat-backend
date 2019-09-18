
import express from 'express';
import { createRole, assignRole, addNewUser } from '../../controllers';
import { Authentication, RoleStatus } from '../../middlewares';
import {
  roleCheck, validateRoleInput, addUserCheck, createRoleCheck, validateCreateRoleInput
} from '../../validation';


const { Router } = express;
const router = Router();
const { authenticate } = Authentication;
const permissionCheck = RoleStatus.getPermission('updateRole');
const addUserPermissionCheck = RoleStatus.getPermission('canAddUser');

router.post('/new_user', authenticate, addUserPermissionCheck, addUserCheck, validateCreateRoleInput, addNewUser);
router.post('/role', authenticate, permissionCheck, createRoleCheck, validateCreateRoleInput, createRole);
router.patch('/role', authenticate, permissionCheck, roleCheck, validateRoleInput, assignRole);

export default router;
