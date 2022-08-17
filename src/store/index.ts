import { defineStore } from 'pinia'
import { Models } from '@/rapper/index'
type MenuModel = Models['GET/admin/user/admin/info']['Res']['data']['columnList'][0]
interface User {
    username: string;
}

export const useStore = defineStore('main', {
    state: () => {
        return {
            user: {} as User,
            menuList: [] as MenuModel[]
        }
    },
    actions: {
        updateUser(user: User) {
            this.user = user
        },
        updateMent(data: MenuModel[]) {
            this.menuList = data
        }
    }
})

