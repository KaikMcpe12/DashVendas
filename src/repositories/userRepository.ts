import { ILocale, IUserRepository } from "../interfaces/userInterface";
import { prisma } from "../lib/prisma";

class UserRepository implements IUserRepository{
    async listAllLocale(): Promise<ILocale[]> {
        const locales = await prisma.user.findMany({
            select: {
                locale: true
            }
        })

        return locales
    }

    async findLocaleByName(name: string): Promise<ILocale | null> {
        const locale = await prisma.user.findFirst({
            select: {
                locale: true,
            },
            where: {
                locale: name
            }
        })

        return locale
    }
}

export { UserRepository }