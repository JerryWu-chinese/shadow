interface IAction {
    type: string;
    data: boolean
}

export const isLogin = (data: boolean): IAction => ({type: 'isLogin', data});