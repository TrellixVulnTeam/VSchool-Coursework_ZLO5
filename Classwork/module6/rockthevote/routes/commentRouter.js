const express = require("express");
const commentRouter = express.Router();
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");


// GET comments by user _id
commentRouter.get(`/user/:userId`, (req, res, next) => {
    Comment.find({ _authId: req.params.userId },
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comments)
        }
    )
})

// PUT comment in post: comment: [array]
commentRouter.put(`/:postId`, (req, res, next) => {
    req.body._authId = req.user._id
    req.body.post = req.params.postId
    const newComment = new Comment(req.body)
    newComment.save((err, newComm) => {
        if(err){
            res.status(500)
            return next(err)
        }
        Post.findOneAndUpdate(
            {_id: req.params.postId},
            { $push: 
                { comment: newComm }
            },
            { new: true },
            (err, postWComm) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(postWComm)
            })
        }
    )
})

// DELETE comment ** check **
commentRouter.put(`/:postId/:comId`, (req, res, next) => {
    const delCom = req.params.comId
    Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: 
            { comment: { _id: delCom } }
        },
        (err, postNoComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(postNoComment)
        }
    )
})

module.exports = commentRouter