import nc from "next-connect";
import multer from "multer";

export const config = {
    api: {
        bodyParser: false,
    },
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
const upload = multer({ storage: storage })

const handler = nc()
    .use(upload.single('file'))
    .post((req, res) => {
        res.send(req.file)
    })

export default handler;