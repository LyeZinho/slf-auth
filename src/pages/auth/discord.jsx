import Link from 'next/link';

export default function Discord() {
    return (
        <div>
            <h1>Discord</h1>
            <Link href='/api/auth/discord/login'>
                Login with Discord
            </Link>
        </div>
    )
}