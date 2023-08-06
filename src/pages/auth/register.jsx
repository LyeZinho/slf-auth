import { generateJWT } from '../../lib/jwt';

/*
POST 
{
    "jwt": "jwt token",
}

decoded jwt token:
{
    "username": "username",
    "password": "password",
    "email": "email"
}
*/


export default function Register({ secret }){
    // let jwt = generateJWT(data, secret);

    // fetch('/api/user/register', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ jwt })
    // }).then(res => res.json()).then(data => console.log(data));

    return (
        <div className='flex flex-col items-center justify-center my-20'>
            {/* Register card */}
            <div className='flex flex-col items-center justify-center rounded-lg
                bg-primary-700 text-primary-50 p-4
            '>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-bold'>Register</h1>
                    <p className='text-lg'>Register to slf-auth</p>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    let jtw_secret = process.env.JWT_SECRET;

    return {
        props: {
            secret: jtw_secret
        }
    }
}