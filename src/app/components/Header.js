import Link from 'next/link'
import '../styles/header.css'

const link_references = {
  'players': '/',
  'contact': '/contact'
}

const page_titles = {
  'players': 'Player Marketplace',
  'contact': 'Report Bug'
}

export default function Header({ cur_page }) {
  const pages = ['players', 'contact']
  
  return (
    <div className="header">
      <h1>{page_titles[cur_page]}</h1>
      <div className="nav-links">
        {pages.map((page) => (
          <Link 
            key={page} 
            href={link_references[page]}
            aria-current={cur_page === page ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  )
}