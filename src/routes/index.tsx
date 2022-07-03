import { RouteObject } from 'react-router-dom';
import Enter from '../components/Enter';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Enter />
    },
    {
        path: '/android',
        element: <div>Android</div>
    },
    {
        path: '/apple',
        element: <div>Apple</div>
    },
    {
        path: '/windows',
        element: <div>Windows</div>
    }
]

export default routes;