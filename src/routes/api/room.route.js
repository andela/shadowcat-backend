import express from 'express';
import { addRoom } from '../../controllers';
import { Authentication, RoleStatus } from '../../middlewares';
import { cloudinaryConfig } from '../../services/cloudinaryConfig';
import { multerUploads, imageUpload } from '../../middlewares/multer';
import { addRoomCheck, validateRoomInput } from '../../validation';

const { Router } = express;
const router = Router();
const { authenticate } = Authentication;
const permissionCheck = RoleStatus.getPermission('canAddRoom');

router.post('/accommodation/:accommodationId/room', authenticate, cloudinaryConfig, multerUploads, imageUpload, permissionCheck, addRoomCheck, validateRoomInput, addRoom);

export default router;
