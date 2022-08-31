import { defineStore } from 'pinia'
import { Models } from '@/rapper/index'
type MenuModel = Models['GET/admin/user/admin/info']['Res']['data']['columnList'][0]
interface User {
    username?: string;
}

export const useStore = defineStore('main', {
    state: () => {
        return {
            token: window.localStorage.getItem('token') || '',
            user: {} as User,
            menuList: [] as MenuModel[],
            menuAsideList: [] as MenuModel[]
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token
            window.localStorage.setItem('token', token)
        },
        updateUser(user: User) {
            this.user = user
        },
        updateMent(data: MenuModel[]) {
            this.menuList = data
        },
        updateMentAside(data: MenuModel[]) {
            this.menuAsideList = data
        },
        clear() {
            this.user = {}
            this.menuList = []
            this.menuAsideList = []
        }
    }
})

