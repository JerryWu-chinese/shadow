import {IS_REGISTER} from '../constant';

const initState = false;

interface IAction {
    type: string;
    data: boolean
}

const registerReducer = (preState: boolean = initState, actions: IAction): boolean => {
    const {type, data} = actions;

    switch(type) {
        case IS_REGISTER:
            return data;
        default:
            return preState;
    }
}

export default registerReducer;