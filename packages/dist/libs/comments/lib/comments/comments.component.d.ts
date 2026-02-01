import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface Comment {
    id: string;
    author: string;
    avatar?: string;
    content: string;
    timestamp: Date;
    likes?: number;
    replies?: Comment[];
    isEditing?: boolean;
}
export interface CommentAction {
    type: 'add' | 'edit' | 'delete' | 'like' | 'reply';
    comment: Comment;
    parentId?: string;
}
export declare class CommentsComponent implements ControlValueAccessor {
    comments: Comment[];
    currentUser: {
        name: string;
        avatar?: string;
    } | null;
    allowReplies: boolean;
    allowEdit: boolean;
    allowDelete: boolean;
    allowLikes: boolean;
    maxDepth: number;
    disabled: boolean;
    placeholder: string;
    showTimestamps: boolean;
    sortBy: 'newest' | 'oldest' | 'likes';
    commentAdded: EventEmitter<Comment>;
    commentEdited: EventEmitter<Comment>;
    commentDeleted: EventEmitter<Comment>;
    commentLiked: EventEmitter<Comment>;
    replyAdded: EventEmitter<{
        comment: Comment;
        parentId: string;
    }>;
    newCommentText: string;
    replyingTo: string | null;
    replyText: string;
    private onChange;
    private onTouched;
    get sortedComments(): Comment[];
    writeValue(value: Comment[]): void;
    registerOnChange(fn: (value: Comment[]) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    addComment(): void;
    addReply(parentComment: Comment): void;
    private addReplyToComment;
    editComment(comment: Comment): void;
    saveEdit(comment: Comment, newContent: string): void;
    cancelEdit(comment: Comment): void;
    private toggleEditMode;
    private updateCommentContent;
    deleteComment(comment: Comment): void;
    private removeComment;
    likeComment(comment: Comment): void;
    private incrementLikes;
    startReply(comment: Comment): void;
    cancelReply(): void;
    getRelativeTime(date: Date): string;
    getAvatar(comment: Comment): string;
    getDefaultAvatar(): string;
    private generateId;
    trackByCommentId(index: number, comment: Comment): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CommentsComponent, "muxima-comments", never, { "comments": "comments"; "currentUser": "currentUser"; "allowReplies": "allowReplies"; "allowEdit": "allowEdit"; "allowDelete": "allowDelete"; "allowLikes": "allowLikes"; "maxDepth": "maxDepth"; "disabled": "disabled"; "placeholder": "placeholder"; "showTimestamps": "showTimestamps"; "sortBy": "sortBy"; }, { "commentAdded": "commentAdded"; "commentEdited": "commentEdited"; "commentDeleted": "commentDeleted"; "commentLiked": "commentLiked"; "replyAdded": "replyAdded"; }, never, never, true, never>;
}
