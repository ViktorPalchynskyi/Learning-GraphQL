import { IUser } from '../../models/userModel';
import User from '../../models/userModel';
import Product from '../../models/productModel';


export default {
    Query: {
        users: () => User.find().populate('friends').populate('products'),
        user: (parent: any, args: { id: string }) => User.findById(args.id).populate('friends').populate('products'),
    },
    Mutation: {
        addUser: async (parent: any, args: { name: string, password: string }) => {
            const user = new User(args);
            await user.save();
            return user;
        },
        addFriend: async (parent: any, args: { userId: string, friendId: string }) => {
            // Найти пользователя по ID
            const user = await User.findById(args.userId).populate('friends').populate('products');
            const friend = await User.findById(args.friendId).populate('friends').populate('products') as IUser;
            
            if (user) {
                // Добавить друга в список друзей
                user.friends.push(friend);
                
                // Сохранить обновленный документ
                await user.save();
        
                // Вернуть обновленного пользователя с популяцией друзей и продуктов
                return User.findById(args.userId).populate('friends').populate('products');
            }
        
            // Если пользователь не найден, выбросить ошибку
            throw new Error('User not found');
        },
    },
}