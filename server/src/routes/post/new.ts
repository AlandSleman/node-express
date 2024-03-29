import { POINTS_PER_POST } from '../../../config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'
import multer from 'multer'

import { findOne, insertOne, updateOne } from '../../mongo/mongo'
import { JWT_SECRET, LEADERBOARD_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '../../../config';
import { sendSuccessRespose, sendFailedResponse } from '../../utils/response'
import { User } from '../../types/user';
import { NewPost, Post } from '../../types/post';
import { verifyUser } from '../../utils/verify-user';

const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + '.png')
    },

})

const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
const upload = multer({
    storage: storage, limits: {
        fileSize: 6275000,

    }, fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
})
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
        return cb(null, true);
    } else {
        cb(null, false);
    }
}
export const newPostRoute = app.post('/new', upload.single('image'), async (req, res) => {
    let file = req.file ? req.file : null
    let filename = ''
    file ? filename = file.filename : filename = '';
    if (file) {
        let accepted = ACCEPTED_MIME_TYPES.includes(file.mimetype)
        if (!accepted) return sendFailedResponse(res, 400, { message: 'Invalid file type' })
    }

    let { error, message, user }: { error: boolean, message?: string, user?: User, token?: User } = await verifyUser(req)
    if (error) return sendFailedResponse(res, 400, message)

    let content: NewPost
    try {
        content = NewPost.parse(req.body.content);
    } catch (e) {
        console.log('userParseErrror', e);
        return sendFailedResponse(res, 400, { message: e.issues[0].message })
    }


    let post: Post = { post_id: nanoid(), user_id: user!.user_id, username: user.username, profileImageUrl: user.imageUrl, content, imageUrl: filename, likes: [], comments: [], post_date: Date.now() }
    let insertResult
    insertResult = await insertOne(POST_COLLECTION, post);
    await updateOne(LEADERBOARD_COLLECTION, { user_id: user.user_id }, { $inc: { posts: 1, points: POINTS_PER_POST } })
    const token = jwt.sign(user!, JWT_SECRET);
    return sendSuccessRespose(res, 200, { token, post: post })
})