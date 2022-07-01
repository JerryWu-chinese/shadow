interface IAction {
    type: string;
    data: boolean
}

export const isRegister = (data: boolean): IAction => ({type: 'isRegister', data});