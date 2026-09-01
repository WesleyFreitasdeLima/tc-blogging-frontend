import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Eraser,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react'

import { Button } from '@/view/components/ui/button'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],

    content: value || '',

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },

    editorProps: {
      attributes: {
        class:
          'min-h-80 px-4 py-4 outline-none prose prose-sm max-w-none font-normal',
      },
    },
  })

  useEffect(() => {
    if (!editor) return

    const currentContent = editor.getHTML()
    const newContent = value || ''

    if (currentContent !== newContent) {
      editor.commands.setContent(newContent)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  function addLink() {
    const previousUrl = editor.getAttributes('link').href

    const url = window.prompt('Digite a URL:', previousUrl || '')

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run()

      return
    }

    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-border bg-secondary/40 p-2">
        {/* Negrito */}
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
          size="icon"
          title="Negrito"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>

        {/* Itálico */}
        <Button
          type="button"
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
          size="icon"
          title="Itálico"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Button>

        {/* Sublinhado */}
        <Button
          type="button"
          variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
          size="icon"
          title="Sublinhado"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </Button>

        {/* Tachado */}
        <Button
          type="button"
          variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
          size="icon"
          title="Tachado"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </Button>

        <div className="mx-1 h-8 w-px bg-border" />

        {/* Texto normal */}
        <Button
          type="button"
          variant={editor.isActive('paragraph') ? 'secondary' : 'ghost'}
          size="icon"
          title="Texto normal"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <span className="text-xs font-bold">P</span>
        </Button>

        {/* H1 */}
        <Button
          type="button"
          variant={
            editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'
          }
          size="icon"
          title="Título 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <span className="text-xs font-bold">H1</span>
        </Button>

        {/* H2 */}
        <Button
          type="button"
          variant={
            editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'
          }
          size="icon"
          title="Título 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <span className="text-xs font-bold">H2</span>
        </Button>

        {/* H3 */}
        <Button
          type="button"
          variant={
            editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'
          }
          size="icon"
          title="Título 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <span className="text-xs font-bold">H3</span>
        </Button>

        <div className="mx-1 h-8 w-px bg-border" />

        {/* Lista */}
        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
          size="icon"
          title="Lista"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </Button>

        {/* Lista numerada */}
        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
          size="icon"
          title="Lista numerada"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </Button>

        {/* Citação */}
        <Button
          type="button"
          variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
          size="icon"
          title="Citação"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote />
        </Button>

        {/* Código inline */}
        <Button
          type="button"
          variant={editor.isActive('code') ? 'secondary' : 'ghost'}
          size="icon"
          title="Código"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code />
        </Button>

        {/* Bloco de código */}
        <Button
          type="button"
          variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
          size="icon"
          title="Bloco de código"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 />
        </Button>

        <div className="mx-1 h-8 w-px bg-border" />

        {/* Link */}
        <Button
          type="button"
          variant={editor.isActive('link') ? 'secondary' : 'ghost'}
          size="icon"
          title="Adicionar link"
          onClick={addLink}
        >
          <LinkIcon />
        </Button>

        <div className="mx-1 h-8 w-px bg-border" />

        {/* Alinhar esquerda */}
        <Button
          type="button"
          variant={
            editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'
          }
          size="icon"
          title="Alinhar à esquerda"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft />
        </Button>

        {/* Centralizar */}
        <Button
          type="button"
          variant={
            editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'
          }
          size="icon"
          title="Centralizar"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter />
        </Button>

        {/* Alinhar direita */}
        <Button
          type="button"
          variant={
            editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'
          }
          size="icon"
          title="Alinhar à direita"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight />
        </Button>

        <div className="mx-1 h-8 w-px bg-border" />

        {/* Desfazer */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Desfazer"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo />
        </Button>

        {/* Refazer */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Refazer"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo />
        </Button>

        {/* Limpar formatação */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Limpar formatação"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <Eraser />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
