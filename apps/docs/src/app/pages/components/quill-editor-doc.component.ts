import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillEditorComponent } from '@muxima-ui/quill-editor';

@Component({
  selector: 'app-quill-editor-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillEditorComponent],
  templateUrl: './quill-editor-doc.component.html',
  styleUrls: ['./quill-editor-doc.component.scss']
})
export class QuillEditorDocComponent {
  @ViewChild('editor1') editor1!: QuillEditorComponent;

  // Exemplo básico
  basicContent = '<h1>Bem-vindo ao Quill Editor! 🎉</h1><p>Este é o editor de texto mais poderoso do <strong>Muxima UI</strong>.</p><p>Experimente usar:</p><ul><li>Formatação de texto <em>avançada</em></li><li>Inserir <a href="https://quilljs.com" target="_blank">links</a></li><li>Listas e muito mais!</li></ul>';

  // Exemplo com form
  form: FormGroup;

  // Exemplo colaborativo
  collaborativeContent = '<h2>📝 Documento Colaborativo</h2><p>Simule múltiplos usuários editando simultaneamente.</p><p><strong>Usuário 1:</strong> Adicionou este parágrafo.</p><p style="background-color: rgb(255, 255, 0);"><strong>Usuário 2:</strong> Destacou informações importantes.</p>';

  // Exemplo de artigo
  articleContent = `
    <h1 style="text-align: center;">A Evolução dos Editores de Texto</h1>
    <p style="text-align: center;"><em>Por Equipe Muxima UI • 18 de Janeiro, 2026</em></p>
    <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop" alt="Editor de texto" style="width: 100%; height: 300px; object-fit: cover;">
    <h2>Introdução</h2>
    <p>Os editores de texto evoluíram significativamente desde os primeiros processadores de texto. Hoje, ferramentas como o <strong>Quill</strong> oferecem recursos comparáveis aos melhores editores desktop.</p>
    <blockquote>
      "A simplicidade é a máxima sofisticação." - Leonardo da Vinci
    </blockquote>
    <h2>Principais Características</h2>
    <ol>
      <li><strong>WYSIWYG</strong>: O que você vê é o que você obtém</li>
      <li><strong>Colaboração em tempo real</strong>: Múltiplos usuários simultaneamente</li>
      <li><strong>Extensibilidade</strong>: Plugins e módulos customizados</li>
    </ol>
    <h3>Exemplo de Código</h3>
    <pre>const editor = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [['bold', 'italic'], ['link', 'image']]
  }
});</pre>
    <h2>Conclusão</h2>
    <p>O futuro dos editores de texto é promissor, com inovações em <span style="color: rgb(102, 126, 234);">IA</span>, <span style="color: rgb(118, 75, 162);">colaboração</span> e <span style="background-color: rgb(255, 235, 59);">acessibilidade</span>.</p>
  `;

  // Exemplo minimalista
  minimalContent = '';

  // Exemplo de notas
  noteContent = '💡 Clique para começar a escrever suas notas...';

  // Exemplo de email
  emailContent = `
    <p>Olá <strong>[Nome]</strong>,</p>
    <p>Espero que este email encontre você bem!</p>
    <p>Gostaria de compartilhar algumas atualizações importantes:</p>
    <ul>
      <li>✅ Projeto Alpha concluído</li>
      <li>🚀 Lançamento previsto para próxima semana</li>
      <li>📊 Relatórios disponíveis no dashboard</li>
    </ul>
    <p>Se tiver alguma dúvida, não hesite em me contactar.</p>
    <p>Atenciosamente,<br><strong>Equipe Muxima</strong></p>
  `;

  // Exemplo com fórmulas
  mathContent = `
    <h2>📐 Fórmulas Matemáticas</h2>
    <p>O teorema de Pitágoras é fundamental: <span class="ql-formula" data-value="a^2 + b^2 = c^2">a² + b² = c²</span></p>
    <p>A fórmula de Bhaskara:</p>
    <p style="text-align: center;"><span class="ql-formula" data-value="x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}">x = (-b ± √(b²-4ac)) / 2a</span></p>
  `;

  // Exemplo de lista de tarefas
  todoContent = `
    <h3>📋 Tarefas do Projeto</h3>
    <ul class="ql-list" data-list="check">
      <li data-checked="true">Configurar ambiente de desenvolvimento</li>
      <li data-checked="true">Criar componentes base</li>
      <li data-checked="false">Implementar testes unitários</li>
      <li data-checked="false">Documentar API</li>
      <li data-checked="false">Deploy em produção</li>
    </ul>
  `;

  // Estatísticas
  currentWordCount = 0;
  currentCharCount = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['<p>Escreva o conteúdo do seu documento aqui...</p>', Validators.required],
      tags: ['']
    });
  }

  onContentChanged(event: any) {
    console.log('Content changed:', event);
    this.currentWordCount = event.text.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
    this.currentCharCount = event.text.length;
  }

  onSelectionChanged(event: any) {
    console.log('Selection changed:', event);
  }

  onEditorCreated(event: any) {
    console.log('Editor created:', event);
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('Documento salvo com sucesso! ✅\n\nConfira o console para ver os dados.');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  resetForm() {
    this.form.reset({
      title: '',
      content: '<p>Conteúdo resetado!</p>',
      tags: ''
    });
  }

  exportHTML() {
    const content = this.basicContent;
    const blob = new Blob([content], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.html';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  exportJSON() {
    const data = {
      title: 'Meu Documento',
      content: this.basicContent,
      createdAt: new Date().toISOString(),
      wordCount: this.currentWordCount,
      charCount: this.currentCharCount
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  loadTemplate(template: string) {
    switch (template) {
      case 'article':
        this.basicContent = this.articleContent;
        break;
      case 'email':
        this.basicContent = this.emailContent;
        break;
      case 'notes':
        this.basicContent = this.noteContent;
        break;
      case 'todo':
        this.basicContent = this.todoContent;
        break;
      default:
        this.basicContent = '<p>Template carregado!</p>';
    }
  }

  clearContent() {
    if (confirm('Tem certeza que deseja limpar todo o conteúdo?')) {
      this.basicContent = '';
    }
  }
}
