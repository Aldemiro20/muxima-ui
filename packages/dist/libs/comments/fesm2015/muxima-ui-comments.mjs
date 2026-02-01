import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class CommentsComponent {
    constructor() {
        this.comments = [];
        this.currentUser = null;
        this.allowReplies = true;
        this.allowEdit = true;
        this.allowDelete = true;
        this.allowLikes = true;
        this.maxDepth = 3;
        this.disabled = false;
        this.placeholder = 'Adicione um comentário...';
        this.showTimestamps = true;
        this.sortBy = 'newest';
        this.commentAdded = new EventEmitter();
        this.commentEdited = new EventEmitter();
        this.commentDeleted = new EventEmitter();
        this.commentLiked = new EventEmitter();
        this.replyAdded = new EventEmitter();
        this.newCommentText = '';
        this.replyingTo = null;
        this.replyText = '';
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    get sortedComments() {
        const sorted = [...this.comments];
        switch (this.sortBy) {
            case 'newest':
                return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            case 'oldest':
                return sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            case 'likes':
                return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
            default:
                return sorted;
        }
    }
    writeValue(value) {
        if (value) {
            this.comments = [...value];
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    addComment() {
        if (!this.newCommentText.trim() || this.disabled || !this.currentUser)
            return;
        const newComment = {
            id: this.generateId(),
            author: this.currentUser.name,
            avatar: this.currentUser.avatar,
            content: this.newCommentText.trim(),
            timestamp: new Date(),
            likes: 0,
            replies: []
        };
        this.comments = [...this.comments, newComment];
        this.commentAdded.emit(newComment);
        this.onChange([...this.comments]);
        this.onTouched();
        this.newCommentText = '';
    }
    addReply(parentComment) {
        if (!this.replyText.trim() || this.disabled || !this.currentUser)
            return;
        const reply = {
            id: this.generateId(),
            author: this.currentUser.name,
            avatar: this.currentUser.avatar,
            content: this.replyText.trim(),
            timestamp: new Date(),
            likes: 0,
            replies: []
        };
        const updatedComments = this.addReplyToComment(this.comments, parentComment.id, reply);
        this.comments = updatedComments;
        this.replyAdded.emit({ comment: reply, parentId: parentComment.id });
        this.onChange([...this.comments]);
        this.onTouched();
        this.replyText = '';
        this.replyingTo = null;
    }
    addReplyToComment(comments, parentId, reply) {
        return comments.map(comment => {
            if (comment.id === parentId) {
                return Object.assign(Object.assign({}, comment), { replies: [...(comment.replies || []), reply] });
            }
            if (comment.replies && comment.replies.length > 0) {
                return Object.assign(Object.assign({}, comment), { replies: this.addReplyToComment(comment.replies, parentId, reply) });
            }
            return comment;
        });
    }
    editComment(comment) {
        if (!this.allowEdit || this.disabled)
            return;
        const updatedComments = this.toggleEditMode(this.comments, comment.id, true);
        this.comments = updatedComments;
    }
    saveEdit(comment, newContent) {
        if (!newContent.trim())
            return;
        const updatedComments = this.updateCommentContent(this.comments, comment.id, newContent.trim());
        this.comments = updatedComments;
        this.commentEdited.emit(Object.assign(Object.assign({}, comment), { content: newContent.trim() }));
        this.onChange([...this.comments]);
        this.onTouched();
    }
    cancelEdit(comment) {
        const updatedComments = this.toggleEditMode(this.comments, comment.id, false);
        this.comments = updatedComments;
    }
    toggleEditMode(comments, commentId, isEditing) {
        return comments.map(comment => {
            if (comment.id === commentId) {
                return Object.assign(Object.assign({}, comment), { isEditing });
            }
            if (comment.replies && comment.replies.length > 0) {
                return Object.assign(Object.assign({}, comment), { replies: this.toggleEditMode(comment.replies, commentId, isEditing) });
            }
            return comment;
        });
    }
    updateCommentContent(comments, commentId, newContent) {
        return comments.map(comment => {
            if (comment.id === commentId) {
                return Object.assign(Object.assign({}, comment), { content: newContent, isEditing: false });
            }
            if (comment.replies && comment.replies.length > 0) {
                return Object.assign(Object.assign({}, comment), { replies: this.updateCommentContent(comment.replies, commentId, newContent) });
            }
            return comment;
        });
    }
    deleteComment(comment) {
        if (!this.allowDelete || this.disabled)
            return;
        const updatedComments = this.removeComment(this.comments, comment.id);
        this.comments = updatedComments;
        this.commentDeleted.emit(comment);
        this.onChange([...this.comments]);
        this.onTouched();
    }
    removeComment(comments, commentId) {
        return comments
            .filter(comment => comment.id !== commentId)
            .map(comment => (Object.assign(Object.assign({}, comment), { replies: comment.replies ? this.removeComment(comment.replies, commentId) : [] })));
    }
    likeComment(comment) {
        if (!this.allowLikes || this.disabled)
            return;
        const updatedComments = this.incrementLikes(this.comments, comment.id);
        this.comments = updatedComments;
        this.commentLiked.emit(comment);
        this.onChange([...this.comments]);
        this.onTouched();
    }
    incrementLikes(comments, commentId) {
        return comments.map(comment => {
            if (comment.id === commentId) {
                return Object.assign(Object.assign({}, comment), { likes: (comment.likes || 0) + 1 });
            }
            if (comment.replies && comment.replies.length > 0) {
                return Object.assign(Object.assign({}, comment), { replies: this.incrementLikes(comment.replies, commentId) });
            }
            return comment;
        });
    }
    startReply(comment) {
        this.replyingTo = comment.id;
        this.replyText = '';
    }
    cancelReply() {
        this.replyingTo = null;
        this.replyText = '';
    }
    getRelativeTime(date) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 7) {
            return date.toLocaleDateString('pt-BR');
        }
        else if (days > 0) {
            return `${days} dia${days > 1 ? 's' : ''} atrás`;
        }
        else if (hours > 0) {
            return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
        }
        else if (minutes > 0) {
            return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
        }
        else {
            return 'Agora mesmo';
        }
    }
    getAvatar(comment) {
        if (comment.avatar) {
            return comment.avatar;
        }
        return this.getDefaultAvatar();
    }
    getDefaultAvatar() {
        var _a;
        if ((_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.avatar) {
            return this.currentUser.avatar;
        }
        // Generate SVG avatar with initials
        const initials = this.currentUser ?
            this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) :
            'U';
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle fill='%23667eea' cx='20' cy='20' r='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='white' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
    }
    generateId() {
        return `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    trackByCommentId(index, comment) {
        return comment.id;
    }
}
CommentsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CommentsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CommentsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CommentsComponent, isStandalone: true, selector: "muxima-comments", inputs: { comments: "comments", currentUser: "currentUser", allowReplies: "allowReplies", allowEdit: "allowEdit", allowDelete: "allowDelete", allowLikes: "allowLikes", maxDepth: "maxDepth", disabled: "disabled", placeholder: "placeholder", showTimestamps: "showTimestamps", sortBy: "sortBy" }, outputs: { commentAdded: "commentAdded", commentEdited: "commentEdited", commentDeleted: "commentDeleted", commentLiked: "commentLiked", replyAdded: "replyAdded" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CommentsComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"comments-wrapper\" [class.disabled]=\"disabled\">\r\n  <!-- Header -->\r\n  <div class=\"comments-header\">\r\n    <h3 class=\"comments-title\">\r\n      \uD83D\uDCAC Coment\u00E1rios\r\n      <span class=\"comments-count\">({{ comments.length }})</span>\r\n    </h3>\r\n    \r\n    <div class=\"comments-sort\" *ngIf=\"comments.length > 0\">\r\n      <label>Ordenar por:</label>\r\n      <select [(ngModel)]=\"sortBy\" [disabled]=\"disabled\">\r\n        <option value=\"newest\">Mais recentes</option>\r\n        <option value=\"oldest\">Mais antigos</option>\r\n        <option value=\"likes\" *ngIf=\"allowLikes\">Mais curtidos</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- New Comment Form -->\r\n  <div class=\"comment-form\" *ngIf=\"currentUser\">\r\n    <img [src]=\"currentUser.avatar || getDefaultAvatar()\" \r\n         alt=\"{{ currentUser.name }}\" \r\n         class=\"comment-avatar\" />\r\n    \r\n    <div class=\"comment-input-wrapper\">\r\n      <textarea\r\n        [(ngModel)]=\"newCommentText\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        class=\"comment-input\"\r\n        rows=\"3\"\r\n        (keydown.ctrl.enter)=\"addComment()\"\r\n        (keydown.meta.enter)=\"addComment()\"></textarea>\r\n      \r\n      <div class=\"comment-actions\">\r\n        <span class=\"comment-hint\" *ngIf=\"newCommentText.length > 0\">\r\n          Ctrl/Cmd + Enter para enviar\r\n        </span>\r\n        <button \r\n          class=\"btn-primary\"\r\n          (click)=\"addComment()\"\r\n          [disabled]=\"disabled || !newCommentText.trim()\">\r\n          Comentar\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Comments List -->\r\n  <div class=\"comments-list\">\r\n    <ng-container *ngFor=\"let comment of sortedComments; trackBy: trackByCommentId\">\r\n      <ng-container *ngTemplateOutlet=\"commentTemplate; context: { $implicit: comment, depth: 0 }\"></ng-container>\r\n    </ng-container>\r\n\r\n    <!-- Empty State -->\r\n    <div class=\"empty-state\" *ngIf=\"comments.length === 0\">\r\n      <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" fill=\"none\">\r\n        <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#f3f4f6\"/>\r\n        <path d=\"M30 45 Q50 35 70 45\" stroke=\"#9ca3af\" stroke-width=\"3\" fill=\"none\"/>\r\n        <circle cx=\"38\" cy=\"42\" r=\"3\" fill=\"#9ca3af\"/>\r\n        <circle cx=\"62\" cy=\"42\" r=\"3\" fill=\"#9ca3af\"/>\r\n      </svg>\r\n      <p>Nenhum coment\u00E1rio ainda. Seja o primeiro!</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Comment Template (Recursive) -->\r\n<ng-template #commentTemplate let-comment let-depth=\"depth\">\r\n  <div class=\"comment-item\" [attr.data-depth]=\"depth\">\r\n    <img [src]=\"getAvatar(comment)\" \r\n         [alt]=\"comment.author\" \r\n         class=\"comment-avatar\" />\r\n    \r\n    <div class=\"comment-content\">\r\n      <!-- Comment Header -->\r\n      <div class=\"comment-meta\">\r\n        <span class=\"comment-author\">{{ comment.author }}</span>\r\n        <span class=\"comment-timestamp\" *ngIf=\"showTimestamps\">\r\n          {{ getRelativeTime(comment.timestamp) }}\r\n        </span>\r\n      </div>\r\n\r\n      <!-- Comment Body (Read Mode) -->\r\n      <div class=\"comment-body\" *ngIf=\"!comment.isEditing\">\r\n        <p>{{ comment.content }}</p>\r\n      </div>\r\n\r\n      <!-- Comment Body (Edit Mode) -->\r\n      <div class=\"comment-edit\" *ngIf=\"comment.isEditing\">\r\n        <textarea\r\n          #editInput\r\n          [value]=\"comment.content\"\r\n          class=\"comment-input\"\r\n          rows=\"3\"></textarea>\r\n        <div class=\"comment-edit-actions\">\r\n          <button class=\"btn-secondary\" (click)=\"cancelEdit(comment)\">\r\n            Cancelar\r\n          </button>\r\n          <button class=\"btn-primary\" (click)=\"saveEdit(comment, editInput.value)\">\r\n            Salvar\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Comment Actions -->\r\n      <div class=\"comment-footer\" *ngIf=\"!comment.isEditing\">\r\n        <button \r\n          class=\"comment-action\"\r\n          *ngIf=\"allowLikes\"\r\n          (click)=\"likeComment(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\uD83D\uDC4D</span>\r\n          <span *ngIf=\"comment.likes && comment.likes > 0\">{{ comment.likes }}</span>\r\n        </button>\r\n\r\n        <button \r\n          class=\"comment-action\"\r\n          *ngIf=\"allowReplies && depth < maxDepth\"\r\n          (click)=\"startReply(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\uD83D\uDCAC</span>\r\n          Responder\r\n        </button>\r\n\r\n        <button \r\n          class=\"comment-action\"\r\n          *ngIf=\"allowEdit && currentUser && comment.author === currentUser.name\"\r\n          (click)=\"editComment(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\u270F\uFE0F</span>\r\n          Editar\r\n        </button>\r\n\r\n        <button \r\n          class=\"comment-action comment-action--danger\"\r\n          *ngIf=\"allowDelete && currentUser && comment.author === currentUser.name\"\r\n          (click)=\"deleteComment(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\uD83D\uDDD1\uFE0F</span>\r\n          Excluir\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Reply Form -->\r\n      <div class=\"comment-reply-form\" *ngIf=\"replyingTo === comment.id\">\r\n        <div class=\"comment-input-wrapper\">\r\n          <textarea\r\n            [(ngModel)]=\"replyText\"\r\n            placeholder=\"Escreva uma resposta...\"\r\n            [disabled]=\"disabled\"\r\n            class=\"comment-input\"\r\n            rows=\"2\"\r\n            (keydown.ctrl.enter)=\"addReply(comment)\"\r\n            (keydown.meta.enter)=\"addReply(comment)\"></textarea>\r\n          \r\n          <div class=\"comment-actions\">\r\n            <button class=\"btn-secondary\" (click)=\"cancelReply()\">\r\n              Cancelar\r\n            </button>\r\n            <button \r\n              class=\"btn-primary\"\r\n              (click)=\"addReply(comment)\"\r\n              [disabled]=\"disabled || !replyText.trim()\">\r\n              Responder\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Nested Replies -->\r\n      <div class=\"comment-replies\" *ngIf=\"comment.replies && comment.replies.length > 0\">\r\n        <ng-container *ngFor=\"let reply of comment.replies; trackBy: trackByCommentId\">\r\n          <ng-container *ngTemplateOutlet=\"commentTemplate; context: { $implicit: reply, depth: depth + 1 }\"></ng-container>\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["@keyframes slideIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.comments-wrapper{background:white;border-radius:16px;box-shadow:0 2px 12px #00000014;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}.comments-wrapper.disabled{opacity:.6;pointer-events:none}.comments-header{display:flex;justify-content:space-between;align-items:center;padding:1.5rem;border-bottom:2px solid #f3f4f6;flex-wrap:wrap;gap:1rem}.comments-header .comments-title{margin:0;font-size:1.5rem;font-weight:700;color:#1f2937;display:flex;align-items:center;gap:.5rem}.comments-header .comments-title .comments-count{color:#6b7280;font-size:1rem;font-weight:500}.comments-header .comments-sort{display:flex;align-items:center;gap:.5rem}.comments-header .comments-sort label{font-size:.875rem;color:#6b7280;font-weight:500}.comments-header .comments-sort select{padding:.5rem .75rem;border:2px solid #e5e7eb;border-radius:8px;font-size:.875rem;color:#374151;background:white;cursor:pointer;transition:all .2s ease}.comments-header .comments-sort select:focus{outline:none;border-color:#667eea}.comments-header .comments-sort select:disabled{opacity:.5;cursor:not-allowed}.comment-form{display:flex;gap:1rem;padding:1.5rem;border-bottom:2px solid #f3f4f6;animation:slideIn .3s ease}.comment-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;object-fit:cover;border:2px solid #e5e7eb}.comment-input-wrapper{flex:1;display:flex;flex-direction:column;gap:.75rem}.comment-input{width:100%;padding:.75rem 1rem;border:2px solid #e5e7eb;border-radius:8px;font-size:.95rem;color:#1f2937;font-family:inherit;resize:vertical;transition:all .2s ease}.comment-input:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.comment-input:disabled{background:#f9fafb;cursor:not-allowed}.comment-input::placeholder{color:#9ca3af}.comment-actions{display:flex;justify-content:space-between;align-items:center;gap:.75rem}.comment-actions .comment-hint{font-size:.75rem;color:#9ca3af;font-style:italic}.btn-primary,.btn-secondary{padding:.625rem 1.25rem;border:none;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;transition:all .3s ease}.btn-primary:disabled,.btn-secondary:disabled{opacity:.5;cursor:not-allowed}.btn-primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 2px 8px #667eea4d}.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 12px #667eea66}.btn-primary:active:not(:disabled){transform:translateY(0)}.btn-secondary{background:white;color:#374151;border:2px solid #e5e7eb}.btn-secondary:hover:not(:disabled){background:#f9fafb;border-color:#d1d5db}.comments-list{padding:1rem}.comment-item{display:flex;gap:1rem;padding:1rem;animation:slideIn .3s ease}.comment-item[data-depth=\"0\"]{margin-bottom:1rem}.comment-item[data-depth=\"1\"],.comment-item[data-depth=\"2\"],.comment-item[data-depth=\"3\"]{margin-top:.75rem;padding-left:.5rem;border-left:3px solid #e5e7eb}.comment-content{flex:1;min-width:0}.comment-meta{display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem}.comment-meta .comment-author{font-weight:600;color:#1f2937;font-size:.95rem}.comment-meta .comment-timestamp{font-size:.8rem;color:#9ca3af}.comment-body{margin-bottom:.75rem}.comment-body p{margin:0;color:#374151;line-height:1.6;word-wrap:break-word}.comment-edit{margin-bottom:.75rem}.comment-edit .comment-edit-actions{display:flex;gap:.5rem;margin-top:.5rem}.comment-footer{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.comment-action{display:flex;align-items:center;gap:.375rem;padding:.375rem .75rem;background:transparent;border:none;border-radius:6px;font-size:.85rem;color:#6b7280;font-weight:500;cursor:pointer;transition:all .2s ease}.comment-action .action-icon{font-size:1rem;line-height:1}.comment-action:hover:not(:disabled){background:#f3f4f6;color:#667eea}.comment-action:disabled{opacity:.5;cursor:not-allowed}.comment-action--danger:hover:not(:disabled){background:#fee2e2;color:#dc2626}.comment-reply-form{margin-top:1rem;padding-left:1rem;border-left:3px solid #667eea}.comment-replies{margin-top:.5rem}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;text-align:center}.empty-state svg{margin-bottom:1.5rem}.empty-state p{color:#9ca3af;font-size:1.1rem;margin:0}@media (max-width: 768px){.comments-header{flex-direction:column;align-items:flex-start}.comments-header .comments-sort{width:100%}.comments-header .comments-sort select{flex:1}.comment-form,.comment-item{gap:.75rem}.comment-avatar{width:36px;height:36px}.comment-footer{gap:.5rem}.comment-action{padding:.25rem .5rem;font-size:.8rem}.comment-item[data-depth=\"1\"],.comment-item[data-depth=\"2\"],.comment-item[data-depth=\"3\"]{padding-left:.25rem}}@media (prefers-color-scheme: dark){.comments-wrapper{background:#1f2937}.comments-wrapper .comments-title{color:#f9fafb}.comments-wrapper .comment-input{background:#374151;border-color:#4b5563;color:#f9fafb}.comments-wrapper .comment-author{color:#f9fafb}.comments-wrapper .comment-body p{color:#d1d5db}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CommentsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-comments', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CommentsComponent),
                            multi: true
                        }
                    ], template: "<div class=\"comments-wrapper\" [class.disabled]=\"disabled\">\r\n  <!-- Header -->\r\n  <div class=\"comments-header\">\r\n    <h3 class=\"comments-title\">\r\n      \uD83D\uDCAC Coment\u00E1rios\r\n      <span class=\"comments-count\">({{ comments.length }})</span>\r\n    </h3>\r\n    \r\n    <div class=\"comments-sort\" *ngIf=\"comments.length > 0\">\r\n      <label>Ordenar por:</label>\r\n      <select [(ngModel)]=\"sortBy\" [disabled]=\"disabled\">\r\n        <option value=\"newest\">Mais recentes</option>\r\n        <option value=\"oldest\">Mais antigos</option>\r\n        <option value=\"likes\" *ngIf=\"allowLikes\">Mais curtidos</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- New Comment Form -->\r\n  <div class=\"comment-form\" *ngIf=\"currentUser\">\r\n    <img [src]=\"currentUser.avatar || getDefaultAvatar()\" \r\n         alt=\"{{ currentUser.name }}\" \r\n         class=\"comment-avatar\" />\r\n    \r\n    <div class=\"comment-input-wrapper\">\r\n      <textarea\r\n        [(ngModel)]=\"newCommentText\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        class=\"comment-input\"\r\n        rows=\"3\"\r\n        (keydown.ctrl.enter)=\"addComment()\"\r\n        (keydown.meta.enter)=\"addComment()\"></textarea>\r\n      \r\n      <div class=\"comment-actions\">\r\n        <span class=\"comment-hint\" *ngIf=\"newCommentText.length > 0\">\r\n          Ctrl/Cmd + Enter para enviar\r\n        </span>\r\n        <button \r\n          class=\"btn-primary\"\r\n          (click)=\"addComment()\"\r\n          [disabled]=\"disabled || !newCommentText.trim()\">\r\n          Comentar\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Comments List -->\r\n  <div class=\"comments-list\">\r\n    <ng-container *ngFor=\"let comment of sortedComments; trackBy: trackByCommentId\">\r\n      <ng-container *ngTemplateOutlet=\"commentTemplate; context: { $implicit: comment, depth: 0 }\"></ng-container>\r\n    </ng-container>\r\n\r\n    <!-- Empty State -->\r\n    <div class=\"empty-state\" *ngIf=\"comments.length === 0\">\r\n      <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" fill=\"none\">\r\n        <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#f3f4f6\"/>\r\n        <path d=\"M30 45 Q50 35 70 45\" stroke=\"#9ca3af\" stroke-width=\"3\" fill=\"none\"/>\r\n        <circle cx=\"38\" cy=\"42\" r=\"3\" fill=\"#9ca3af\"/>\r\n        <circle cx=\"62\" cy=\"42\" r=\"3\" fill=\"#9ca3af\"/>\r\n      </svg>\r\n      <p>Nenhum coment\u00E1rio ainda. Seja o primeiro!</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Comment Template (Recursive) -->\r\n<ng-template #commentTemplate let-comment let-depth=\"depth\">\r\n  <div class=\"comment-item\" [attr.data-depth]=\"depth\">\r\n    <img [src]=\"getAvatar(comment)\" \r\n         [alt]=\"comment.author\" \r\n         class=\"comment-avatar\" />\r\n    \r\n    <div class=\"comment-content\">\r\n      <!-- Comment Header -->\r\n      <div class=\"comment-meta\">\r\n        <span class=\"comment-author\">{{ comment.author }}</span>\r\n        <span class=\"comment-timestamp\" *ngIf=\"showTimestamps\">\r\n          {{ getRelativeTime(comment.timestamp) }}\r\n        </span>\r\n      </div>\r\n\r\n      <!-- Comment Body (Read Mode) -->\r\n      <div class=\"comment-body\" *ngIf=\"!comment.isEditing\">\r\n        <p>{{ comment.content }}</p>\r\n      </div>\r\n\r\n      <!-- Comment Body (Edit Mode) -->\r\n      <div class=\"comment-edit\" *ngIf=\"comment.isEditing\">\r\n        <textarea\r\n          #editInput\r\n          [value]=\"comment.content\"\r\n          class=\"comment-input\"\r\n          rows=\"3\"></textarea>\r\n        <div class=\"comment-edit-actions\">\r\n          <button class=\"btn-secondary\" (click)=\"cancelEdit(comment)\">\r\n            Cancelar\r\n          </button>\r\n          <button class=\"btn-primary\" (click)=\"saveEdit(comment, editInput.value)\">\r\n            Salvar\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Comment Actions -->\r\n      <div class=\"comment-footer\" *ngIf=\"!comment.isEditing\">\r\n        <button \r\n          class=\"comment-action\"\r\n          *ngIf=\"allowLikes\"\r\n          (click)=\"likeComment(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\uD83D\uDC4D</span>\r\n          <span *ngIf=\"comment.likes && comment.likes > 0\">{{ comment.likes }}</span>\r\n        </button>\r\n\r\n        <button \r\n          class=\"comment-action\"\r\n          *ngIf=\"allowReplies && depth < maxDepth\"\r\n          (click)=\"startReply(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\uD83D\uDCAC</span>\r\n          Responder\r\n        </button>\r\n\r\n        <button \r\n          class=\"comment-action\"\r\n          *ngIf=\"allowEdit && currentUser && comment.author === currentUser.name\"\r\n          (click)=\"editComment(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\u270F\uFE0F</span>\r\n          Editar\r\n        </button>\r\n\r\n        <button \r\n          class=\"comment-action comment-action--danger\"\r\n          *ngIf=\"allowDelete && currentUser && comment.author === currentUser.name\"\r\n          (click)=\"deleteComment(comment)\"\r\n          [disabled]=\"disabled\">\r\n          <span class=\"action-icon\">\uD83D\uDDD1\uFE0F</span>\r\n          Excluir\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Reply Form -->\r\n      <div class=\"comment-reply-form\" *ngIf=\"replyingTo === comment.id\">\r\n        <div class=\"comment-input-wrapper\">\r\n          <textarea\r\n            [(ngModel)]=\"replyText\"\r\n            placeholder=\"Escreva uma resposta...\"\r\n            [disabled]=\"disabled\"\r\n            class=\"comment-input\"\r\n            rows=\"2\"\r\n            (keydown.ctrl.enter)=\"addReply(comment)\"\r\n            (keydown.meta.enter)=\"addReply(comment)\"></textarea>\r\n          \r\n          <div class=\"comment-actions\">\r\n            <button class=\"btn-secondary\" (click)=\"cancelReply()\">\r\n              Cancelar\r\n            </button>\r\n            <button \r\n              class=\"btn-primary\"\r\n              (click)=\"addReply(comment)\"\r\n              [disabled]=\"disabled || !replyText.trim()\">\r\n              Responder\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Nested Replies -->\r\n      <div class=\"comment-replies\" *ngIf=\"comment.replies && comment.replies.length > 0\">\r\n        <ng-container *ngFor=\"let reply of comment.replies; trackBy: trackByCommentId\">\r\n          <ng-container *ngTemplateOutlet=\"commentTemplate; context: { $implicit: reply, depth: depth + 1 }\"></ng-container>\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["@keyframes slideIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.comments-wrapper{background:white;border-radius:16px;box-shadow:0 2px 12px #00000014;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}.comments-wrapper.disabled{opacity:.6;pointer-events:none}.comments-header{display:flex;justify-content:space-between;align-items:center;padding:1.5rem;border-bottom:2px solid #f3f4f6;flex-wrap:wrap;gap:1rem}.comments-header .comments-title{margin:0;font-size:1.5rem;font-weight:700;color:#1f2937;display:flex;align-items:center;gap:.5rem}.comments-header .comments-title .comments-count{color:#6b7280;font-size:1rem;font-weight:500}.comments-header .comments-sort{display:flex;align-items:center;gap:.5rem}.comments-header .comments-sort label{font-size:.875rem;color:#6b7280;font-weight:500}.comments-header .comments-sort select{padding:.5rem .75rem;border:2px solid #e5e7eb;border-radius:8px;font-size:.875rem;color:#374151;background:white;cursor:pointer;transition:all .2s ease}.comments-header .comments-sort select:focus{outline:none;border-color:#667eea}.comments-header .comments-sort select:disabled{opacity:.5;cursor:not-allowed}.comment-form{display:flex;gap:1rem;padding:1.5rem;border-bottom:2px solid #f3f4f6;animation:slideIn .3s ease}.comment-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;object-fit:cover;border:2px solid #e5e7eb}.comment-input-wrapper{flex:1;display:flex;flex-direction:column;gap:.75rem}.comment-input{width:100%;padding:.75rem 1rem;border:2px solid #e5e7eb;border-radius:8px;font-size:.95rem;color:#1f2937;font-family:inherit;resize:vertical;transition:all .2s ease}.comment-input:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.comment-input:disabled{background:#f9fafb;cursor:not-allowed}.comment-input::placeholder{color:#9ca3af}.comment-actions{display:flex;justify-content:space-between;align-items:center;gap:.75rem}.comment-actions .comment-hint{font-size:.75rem;color:#9ca3af;font-style:italic}.btn-primary,.btn-secondary{padding:.625rem 1.25rem;border:none;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;transition:all .3s ease}.btn-primary:disabled,.btn-secondary:disabled{opacity:.5;cursor:not-allowed}.btn-primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 2px 8px #667eea4d}.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 12px #667eea66}.btn-primary:active:not(:disabled){transform:translateY(0)}.btn-secondary{background:white;color:#374151;border:2px solid #e5e7eb}.btn-secondary:hover:not(:disabled){background:#f9fafb;border-color:#d1d5db}.comments-list{padding:1rem}.comment-item{display:flex;gap:1rem;padding:1rem;animation:slideIn .3s ease}.comment-item[data-depth=\"0\"]{margin-bottom:1rem}.comment-item[data-depth=\"1\"],.comment-item[data-depth=\"2\"],.comment-item[data-depth=\"3\"]{margin-top:.75rem;padding-left:.5rem;border-left:3px solid #e5e7eb}.comment-content{flex:1;min-width:0}.comment-meta{display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem}.comment-meta .comment-author{font-weight:600;color:#1f2937;font-size:.95rem}.comment-meta .comment-timestamp{font-size:.8rem;color:#9ca3af}.comment-body{margin-bottom:.75rem}.comment-body p{margin:0;color:#374151;line-height:1.6;word-wrap:break-word}.comment-edit{margin-bottom:.75rem}.comment-edit .comment-edit-actions{display:flex;gap:.5rem;margin-top:.5rem}.comment-footer{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.comment-action{display:flex;align-items:center;gap:.375rem;padding:.375rem .75rem;background:transparent;border:none;border-radius:6px;font-size:.85rem;color:#6b7280;font-weight:500;cursor:pointer;transition:all .2s ease}.comment-action .action-icon{font-size:1rem;line-height:1}.comment-action:hover:not(:disabled){background:#f3f4f6;color:#667eea}.comment-action:disabled{opacity:.5;cursor:not-allowed}.comment-action--danger:hover:not(:disabled){background:#fee2e2;color:#dc2626}.comment-reply-form{margin-top:1rem;padding-left:1rem;border-left:3px solid #667eea}.comment-replies{margin-top:.5rem}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;text-align:center}.empty-state svg{margin-bottom:1.5rem}.empty-state p{color:#9ca3af;font-size:1.1rem;margin:0}@media (max-width: 768px){.comments-header{flex-direction:column;align-items:flex-start}.comments-header .comments-sort{width:100%}.comments-header .comments-sort select{flex:1}.comment-form,.comment-item{gap:.75rem}.comment-avatar{width:36px;height:36px}.comment-footer{gap:.5rem}.comment-action{padding:.25rem .5rem;font-size:.8rem}.comment-item[data-depth=\"1\"],.comment-item[data-depth=\"2\"],.comment-item[data-depth=\"3\"]{padding-left:.25rem}}@media (prefers-color-scheme: dark){.comments-wrapper{background:#1f2937}.comments-wrapper .comments-title{color:#f9fafb}.comments-wrapper .comment-input{background:#374151;border-color:#4b5563;color:#f9fafb}.comments-wrapper .comment-author{color:#f9fafb}.comments-wrapper .comment-body p{color:#d1d5db}}\n"] }]
        }], propDecorators: { comments: [{
                type: Input
            }], currentUser: [{
                type: Input
            }], allowReplies: [{
                type: Input
            }], allowEdit: [{
                type: Input
            }], allowDelete: [{
                type: Input
            }], allowLikes: [{
                type: Input
            }], maxDepth: [{
                type: Input
            }], disabled: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], showTimestamps: [{
                type: Input
            }], sortBy: [{
                type: Input
            }], commentAdded: [{
                type: Output
            }], commentEdited: [{
                type: Output
            }], commentDeleted: [{
                type: Output
            }], commentLiked: [{
                type: Output
            }], replyAdded: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CommentsComponent };
//# sourceMappingURL=muxima-ui-comments.mjs.map
