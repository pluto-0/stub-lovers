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
  const google_form_link = 'https://docs.google.com/forms/d/e/1FAIpQLSc_mj_LulfMto2qY_dF96AROqJ5YiDwmmG0thBQC4wFteLN6g/viewform?usp=dialog'
  
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
        
        <Link href={google_form_link} rel="noopener noreferrer" target="_blank">vote on upcoming features!</Link>
      </div>
    </div>
  )
}