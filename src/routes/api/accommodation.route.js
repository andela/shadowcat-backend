import express from 'express';
import { addAccommodation } from '../../controllers';
import { Authentication, RoleStatus } from '../../middlewares';
import { accommodationCheck, validateAccommodationInput } from '../../validation';
import { cloudinaryConfig } from '../../services/cloudinaryConfig';
import { multerUploads, imageUpload } from '../../middlewares/multer';

const { Router } = express;
const router = Router();
const { authenticate } = Authentication;
const permissionCheck = RoleStatus.getPermission('canCreateAccommodation');

router.post('/accommodation', authenticate, cloudinaryConfig, multerUploads, imageUpload, permissionCheck, accommodationCheck, validateAccommodationInput, addAccommodation);

export default router;
