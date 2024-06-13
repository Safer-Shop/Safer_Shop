import { User } from "@prisma/client";

// export interface Payload {
//     id: number,
//     first_name: string,
//     last_name: string,
//     username: string,
//     role: string,
//     phone: string,
// }

export const userDTO = (user: User): Omit<User, 'password'> => {
	return {
		id: user.id,
		name: user.name,
        surname: user.surname,
		username: user.username,
		phone: user.phone,
        email: user.email,
        address: user.address,
		role: user.role,
		status: user.status,
		created: user.created,
		updated: user.updated,
	}
}