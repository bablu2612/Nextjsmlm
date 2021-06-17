import Link from 'next/link'

export default function FourOhFour() {
    return <>
        <h2>404 - Page Not Found</h2>
        <div className="container">
            <Link href="/">
                <h3>  <a>Home</a></h3>
            </Link>
        </div>
    </>
}