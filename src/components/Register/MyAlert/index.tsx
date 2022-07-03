import './index.css';
import React, { ReactElement, Attributes } from 'react';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

//props 接口
interface IProps extends React.AllHTMLAttributes<Attributes>{
    title: string;
    message: Array<string>;
    onAltert: Function
}

//提示栏组件
const MyAlert: React.FC<IProps> = (props: IProps): ReactElement => {
    return (
        <div className="my-alert">
            <span style={{marginRight: '15px', fontSize: '24px', color: '#ff4d4f'}}><ExclamationCircleOutlined /></span>
            <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                <p style={{fontSize: '24px'}}>
                    Error
                    <span style={{marginLeft: '10px', fontSize: '20px'}}>{props.title}</span>
                </p>
                {props.message.map((item: string, index: number) => {
                    return <p className="message" key={index}>{item}</p>
                })}
            </div>
            <span style={{float: 'right', marginRight: '15px', fontSize: '24px', cursor: 'pointer'}} onClick={props.onAltert()}><CloseOutlined /></span>
        </div>
    )
}

export default MyAlert;