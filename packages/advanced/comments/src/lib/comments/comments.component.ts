import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

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

@Component({
  selector: 'muxima-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommentsComponent),
      multi: true
    }
  ]
})
export class CommentsComponent implements ControlValueAccessor {
  @Input() comments: Comment[] = [];
  @Input() currentUser: { name: string; avatar?: string } | null = null;
  @Input() allowReplies: boolean = true;
  @Input() allowEdit: boolean = true;
  @Input() allowDelete: boolean = true;
  @Input() allowLikes: boolean = true;
  @Input() maxDepth: number = 3;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Adicione um comentário...';
  @Input() showTimestamps: boolean = true;
  @Input() sortBy: 'newest' | 'oldest' | 'likes' = 'newest';

  @Output() commentAdded = new EventEmitter<Comment>();
  @Output() commentEdited = new EventEmitter<Comment>();
  @Output() commentDeleted = new EventEmitter<Comment>();
  @Output() commentLiked = new EventEmitter<Comment>();
  @Output() replyAdded = new EventEmitter<{ comment: Comment; parentId: string }>();

  newCommentText: string = '';
  replyingTo: string | null = null;
  replyText: string = '';

  private onChange: (value: Comment[]) => void = () => {};
  private onTouched: () => void = () => {};

  get sortedComments(): Comment[] {
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

  writeValue(value: Comment[]): void {
    if (value) {
      this.comments = [...value];
    }
  }

  registerOnChange(fn: (value: Comment[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addComment(): void {
    if (!this.newCommentText.trim() || this.disabled || !this.currentUser) return;

    const newComment: Comment = {
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

  addReply(parentComment: Comment): void {
    if (!this.replyText.trim() || this.disabled || !this.currentUser) return;

    const reply: Comment = {
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

  private addReplyToComment(comments: Comment[], parentId: string, reply: Comment): Comment[] {
    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: this.addReplyToComment(comment.replies, parentId, reply)
        };
      }
      return comment;
    });
  }

  editComment(comment: Comment): void {
    if (!this.allowEdit || this.disabled) return;
    
    const updatedComments = this.toggleEditMode(this.comments, comment.id, true);
    this.comments = updatedComments;
  }

  saveEdit(comment: Comment, newContent: string): void {
    if (!newContent.trim()) return;

    const updatedComments = this.updateCommentContent(this.comments, comment.id, newContent.trim());
    this.comments = updatedComments;
    this.commentEdited.emit({ ...comment, content: newContent.trim() });
    this.onChange([...this.comments]);
    this.onTouched();
  }

  cancelEdit(comment: Comment): void {
    const updatedComments = this.toggleEditMode(this.comments, comment.id, false);
    this.comments = updatedComments;
  }

  private toggleEditMode(comments: Comment[], commentId: string, isEditing: boolean): Comment[] {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, isEditing };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: this.toggleEditMode(comment.replies, commentId, isEditing)
        };
      }
      return comment;
    });
  }

  private updateCommentContent(comments: Comment[], commentId: string, newContent: string): Comment[] {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent, isEditing: false };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: this.updateCommentContent(comment.replies, commentId, newContent)
        };
      }
      return comment;
    });
  }

  deleteComment(comment: Comment): void {
    if (!this.allowDelete || this.disabled) return;
    
    const updatedComments = this.removeComment(this.comments, comment.id);
    this.comments = updatedComments;
    this.commentDeleted.emit(comment);
    this.onChange([...this.comments]);
    this.onTouched();
  }

  private removeComment(comments: Comment[], commentId: string): Comment[] {
    return comments
      .filter(comment => comment.id !== commentId)
      .map(comment => ({
        ...comment,
        replies: comment.replies ? this.removeComment(comment.replies, commentId) : []
      }));
  }

  likeComment(comment: Comment): void {
    if (!this.allowLikes || this.disabled) return;

    const updatedComments = this.incrementLikes(this.comments, comment.id);
    this.comments = updatedComments;
    this.commentLiked.emit(comment);
    this.onChange([...this.comments]);
    this.onTouched();
  }

  private incrementLikes(comments: Comment[], commentId: string): Comment[] {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: (comment.likes || 0) + 1 };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: this.incrementLikes(comment.replies, commentId)
        };
      }
      return comment;
    });
  }

  startReply(comment: Comment): void {
    this.replyingTo = comment.id;
    this.replyText = '';
  }

  cancelReply(): void {
    this.replyingTo = null;
    this.replyText = '';
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString('pt-BR');
    } else if (days > 0) {
      return `${days} dia${days > 1 ? 's' : ''} atrás`;
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    } else if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    } else {
      return 'Agora mesmo';
    }
  }

  getAvatar(comment: Comment): string {
    if (comment.avatar) {
      return comment.avatar;
    }
    return this.getDefaultAvatar();
  }

  getDefaultAvatar(): string {
    if (this.currentUser?.avatar) {
      return this.currentUser.avatar;
    }
    // Generate SVG avatar with initials
    const initials = this.currentUser ? 
      this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) :
      'U';
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle fill='%23667eea' cx='20' cy='20' r='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='white' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  }

  private generateId(): string {
    return `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  trackByCommentId(index: number, comment: Comment): string {
    return comment.id;
  }
}
