import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { IAuthenticatedRequest } from '../types/auth.types';

type UploadType = 'PRODUCT_IMAGE' | 'USER_PROFILE_IMAGE' | 'MARKETING_LAYOUTS_IMAGE';

const getFolderPath = (uploadType: UploadType) => {
    const folderMap = {
        PRODUCT_IMAGE: 'products/img',
        USER_PROFILE_IMAGE: 'users/img',
        MARKETING_LAYOUTS_IMAGE: 'layouts/img',
    };
    return folderMap[uploadType];
}

const getEntityFolderPath = (uploadType: UploadType, req: IAuthenticatedRequest, parentFolder: string): Array<string> => {
    let folderPath = '';
    if (uploadType === 'USER_PROFILE_IMAGE' && req.userId) {
        folderPath = `user_id_${req.userId}`;
    }
    else if (uploadType === 'PRODUCT_IMAGE') {
        const productId: string = req.body.productId;
        if (productId) {
            folderPath = `product_id_${productId}`;
        }
    }
    const folder = `${parentFolder}/${folderPath}`;
    return folder.split('/');
}

const createStorage = (uploadType: UploadType) => {
    const folder = getFolderPath(uploadType);
    return multer.diskStorage({
        destination: (req: IAuthenticatedRequest, file, cb) => {
            const [entityFolder, fileTypeFolder, fileFolder] = getEntityFolderPath(uploadType, req, folder);
            const uploadPath = path.join(process.cwd(), 'uploads', entityFolder as string, fileTypeFolder as string, fileFolder as string);
            if (!fs.readFileSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req: IAuthenticatedRequest, file, cb) => {
            const uniqueFileName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueFileName);
        }
    })
}

export const uploadUserProfileImg = multer({ storage: createStorage('USER_PROFILE_IMAGE') });
export const uploadProductImg = multer({ storage: createStorage('PRODUCT_IMAGE') });
export const uploadMarketingLayouts = multer({ storage: createStorage('MARKETING_LAYOUTS_IMAGE') })