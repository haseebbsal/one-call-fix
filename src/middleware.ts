import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ROLES } from "./_utils/enums"

type UserData = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    profilePicture: string,
    role: string,
    isApproved: boolean,
    createdAt: string,
    updatedAt: string
}

const restrictedUserPaths = ['/homeowner','/tradeperson','/admin']

export default async function Middleware(request: NextRequest) {
    const cookiesInitialise = cookies()
    const accessToken = cookiesInitialise.get('accessToken')?.value
    console.log(process.env.penis)
    const refreshToken = cookiesInitialise.get('refreshToken')?.value
    let userData: UserData | any = cookiesInitialise.get('userData')?.value
    console.log('pathname',request.nextUrl.pathname)
    if (accessToken) {
        userData = JSON.parse(userData!)
        try {
            const accessTokenChecking = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/?userId=${userData._id}`, {
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            })
            const { role } = userData
            // if (request.nextUrl.pathname.includes('/login') && role == 'User') {
            //     return NextResponse.rewrite(new URL('/dashboard', request.nextUrl.origin))
            // }
            // else if (request.nextUrl.pathname.includes('/login') && role == 'Admin') {
            //     return NextResponse.rewrite(new URL('/admin/dashboard', request.nextUrl.origin))
            // }
            if (role == ROLES.HOMEOWNER && !request.nextUrl.pathname.includes('/homeowner')) {
                return NextResponse.rewrite(new URL('/homeowner/jobs', request.nextUrl.origin))
            }
            else if (role==ROLES.TRADESPERSON && !request.nextUrl.pathname.includes('/tradeperson') ) {
                return NextResponse.rewrite(new URL('/tradeperson/dashboard', request.nextUrl.origin))
            }
            else if (role != ROLES.HOMEOWNER && role != ROLES.TRADESPERSON && !request.nextUrl.pathname.includes('/admin')){
                return NextResponse.rewrite(new URL('/admin/dashboard', request.nextUrl.origin))
            }
        }
        catch {
            try {
                const refreshTokenChecking = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/tokens`, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                })
                const { access_token, refresh_token } = refreshTokenChecking.data.data.tokens
                const response = NextResponse.next()
                console.log('new middleware refresh tokens set')
                response.cookies.set('accessToken', access_token)
                response.cookies.set('refreshToken', refresh_token)
                return response
            }
            catch (e) {
                console.log('middleware refreshtoken error')
                const { role } = userData
                let response; 
                response = NextResponse.rewrite(new URL('/login', request.nextUrl.origin))
                response.cookies.delete('accessToken')
                response.cookies.delete('refreshToken')
                response.cookies.delete('userData')
                response.cookies.delete('clientSecret')
                return response
            }
        }
    }
    else {
        console.log('im here')
        return NextResponse.rewrite(new URL('/login', request.nextUrl.origin))
    }
}


export const config = {
    matcher: [
        '/admin/:path*',
        '/homeowner/job/:path*',
        '/tradeperson/account-details',
        '/tradeperson/billing',
        '/tradeperson/dashboard',
        '/tradeperson/account-details',
        '/tradeperson/jobs/:path*',
        '/tradeperson/profile/:path*',
        '/tradeperson/reviews',
        '/tradeperson/vetting/:path*',
        '/homeowner/account-settings/:path*',
        '/homeowner/jobs',
        "/tradeperson/refund-requests",
        "/tradeperson/feedback",
         "/tradeperson/job/:path*"
        
    ]
}