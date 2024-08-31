import { IUser } from '../../models/userModel';
import User from '../../models/userModel';

export default {
    Query: {
        users: async () => {
            const users = await User.find()
                // .populate('friends')
                // .populate('products');
            console.log('users', users);

            return users;
        },
        user: async (parent: any, args: { id: string }) =>
            await User.findById(args.id)
                // .populate('friends')
                // .populate('products'),
    },
    Mutation: {
        addUser: async (
            parent: any,
            args: { name: string; password: string }
        ) => {
            const user = new User(args);

            await user.save();
            return user;
        },
        addFriend: async (
            parent: any,
            args: { userId: string; friendId: string }
        ) => {
            const user = await User.findById(args.userId)
                .populate('friends')
                .populate('products');
            const friend = (await User.findById(args.friendId)
                .populate('friends')
                .populate('products')) as IUser;

            if (user) {
                user.friends.push(friend);

                await user.save();

                return User.findById(args.userId)
                    .populate('friends')
                    .populate('products');
            }

            throw new Error('User not found');
        },
    },
};
