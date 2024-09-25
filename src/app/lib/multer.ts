import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve(__dirname, "..", "..", "..", "temp", "uploads"));
//     },
//     filename: (req, file, cb) => {
//         randomBytes(16, (err, hash) => {
//             if (err) return cb(err, "");
//             cb(null, `${hash.toString("hex")}-${file.originalname}`);
//         });
//     },
// });

export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        const allowedTypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});
