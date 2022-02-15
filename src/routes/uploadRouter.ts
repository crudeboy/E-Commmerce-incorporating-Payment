import express from 'express';
import multer from 'multer';
import { isAuth } from '../utils';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(null, `img${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req: any, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
