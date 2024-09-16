import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs'; // Use bcryptjs instead of bcrypt

export default NextAuth({
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required');
                }
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist');
                }
                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                );
                if (!isCorrectPassword) {
                    throw new Error('Incorrect password');
                }
                return user;
            }
        })
    ],
    // Fixed typo from "page" to "pages"
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
});
