import {PrismaClient} from '@prisma/prisma'

declare global{

    namespace globalThis {

        var prismadb: PrismaClient
    }
}