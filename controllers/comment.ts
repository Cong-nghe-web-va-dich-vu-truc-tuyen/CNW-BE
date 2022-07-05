import { CommentService } from "../services/commentService";
import { Utils } from "../utils/utils";
import mongoose from "mongoose";

const utils = new Utils()
const commentService = new CommentService()

export class CommentController {
    getAllComments = async (req, res) => {
        try {
            const body: {productId} = await utils.getPostData(req)
            if(!mongoose.isValidObjectId(body.productId)) {
                return utils.responseUnauthor(res, 404, {message: "Sản phẩm không tồn tại"})
            }
            const comments = await commentService.getAllComments({productId: body.productId})

            return utils.responseUnauthor(res, 200, comments)

        } catch (error) {
            utils.responseUnauthor(res,400,{error: error} )
        }
    }

    createComment = async (req, res) => {
        try {

            const body: {productId, content , type, parentId, amountReply} = await utils.getPostData(req)

            const owner =  await utils.requestUser(req)
            const ownerFormatted = {
                _id: owner.id,
                email: owner.email,
                password: "",
                name: owner.name,
                address: owner.address,
                phoneNumber: owner.phoneNumber,
                role: owner.role
            }

            let comment = {
                _id : undefined,
                content: body.content,
                owner: ownerFormatted,
                productId: body.productId,
                type: body.type,
                parentId: mongoose.isValidObjectId(body.productId) ? body.parentId : "",
                amountReply: body.amountReply
            }


            const newComment = await commentService.createComment(comment)

            if (newComment._id === undefined) {
                utils.responseUnauthor(res,400,{message: "Bình luận không thành công"} )
            }
            return utils.sendRespond(res, utils.getAccessToken(req), 200, newComment)

        } catch (error) {
            utils.responseUnauthor(res,400,{error: error} )
        }
    }

    updateComment = async (req, res) => {
        try {
            const body: {id, data} = await utils.getPostData(req)
            if(!mongoose.isValidObjectId(body.id)) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, {message: "Bình luận này không tồn tại"})
            }
            const commentEdited = await commentService.updateComment({_id: body.id, data: body.data})
            if (commentEdited._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, {message: "Không thể sửa bình luận"})
            }
            
            return utils.sendRespond(res, utils.getAccessToken(req), 201, commentEdited)
            
        } catch (error) {
            utils.responseUnauthor(res,400,{error: error} )
        }
    }

    deleteComment = async (req, res) => {
        try {
            const body: {id, type} = await utils.getPostData(req)
            if(!mongoose.isValidObjectId(body.id)) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, {message: "Bình luận này không tồn tại"})
            }

            if (body.type === 1) {

                const commentDeleted = await commentService.deleteComment({_id: body.id})
                if(commentDeleted._id === undefined) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, {message: "Xóa bình luận không thành công. Vui lòng thử  lại"})
                }
                return utils.sendRespond(res, utils.getAccessToken(req), 200, commentDeleted)
            }
            else if (body.type === 0) {
                const feedbackDeleted = await commentService.deleteComment({_id: body.id})
                const replyDeleted = await commentService.deleteReply({parentId: body.id})
                return utils.sendRespond(res, utils.getAccessToken(req), 200, feedbackDeleted)
            }


        } catch (error) {
            utils.responseUnauthor(res,400,{error: error} )        
        }
    }

    getAllReplyComments = async (req, res) => {
        try {
            const body: {parentId}  = await utils.getPostData(req)
            const commentsReply = await commentService.getAllReplyByCommentIds({parentId: body.parentId})

            return utils.sendRespond(res, utils.getAccessToken(req), 200, commentsReply)  
        } catch (error) {
            utils.responseUnauthor(res,400,{error: error} )
        }
    }

    
}