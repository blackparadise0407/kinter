import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

import { prisma } from './db/prisma';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google],
	adapter: PrismaAdapter(prisma)
});
