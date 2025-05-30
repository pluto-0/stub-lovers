import ContactForm from '../components/ContactForm'
import Header from '../components/Header'

export const metadata = {
  title: "Report a Bug",
  description: "Make stubs MLB The Show 25"
};

export default function Home() {
    const cur_page = 'contact'
    return <div>
        <Header cur_page={cur_page}/>
        <ContactForm />
        </div>
}