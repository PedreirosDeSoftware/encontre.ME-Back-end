import multer from "multer";
import path from "node:path";
import { randomBytes } from "node:crypto";

const storage = multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'))
        },
        filename: (req, file, cb) => {
            randomBytes(16, (err, hash) => {
                if (err) return cb(err, '');
                cb(null, `${hash.toString('hex')}-${file.originalname}`);
            });
        }
    })

export const upload = multer({ storage: storage, 
    fileFilter: function(req, file, cb) {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } 
});