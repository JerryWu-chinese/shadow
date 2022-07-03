import {IS_LOGIN} from '../constant';

const initState = false;

interface IAction {
    type: string;
    data: boolean
}

const loginReducer = (preState: boolean = initState, actions: IAction): boolean => {
    const {type, data} = actions;

    switch(type) {
        case IS_LOGIN:
            return data;
        default:
            return preState;
    }
}

export default loginReducer;