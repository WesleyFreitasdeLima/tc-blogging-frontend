import { Link } from 'react-router'

export function Empty({ title }: { title: string }) {
  return (
    <div className="py-24 text-center">
      <h1 className="font-serif text-4xl">{title}</h1>
      <Link to="/posts" className="mt-5 inline-block text-primary underline">
        Voltar para posts
      </Link>
    </div>
  )
}
