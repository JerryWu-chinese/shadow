import React, { ReactElement, useState } from 'react';
import './indes.css';
import Berlin from './images/1402198_10151953858708281_528823144_o.png';
import Cannes from './images/QQ图片20220630143357.png';
import Venice from './images/veniceff2021call.png';
import { Row, Col, Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { SmileOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {isRegister} from '../../redux/actions/register';

interface IStore {
    register: boolean;
}
interface IProps extends IStore {
    isRegister: Function
}

const DemoBox: React.FC<{children: React.ReactNode; style?: Object}> = (props): ReactElement => (
    <div style={props.style}>
        {props.children}
    </div>
)

const Enter: React.FC<IProps> = (props: IProps): ReactElement=> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [size, setSize] = useState<SizeType>('large');

    const isRegister = (e: React.MouseEvent<Element>) => {
        props.isRegister(true);
    }

    return (
        <div style={{position: 'relative'}}>
            <div style={{height: '100%', overflow: 'hidden'}}>
                <Row style={{height: '100%'}}>
                    <Col span={10}>
                        <DemoBox style={{height: '100%'}}>
                            <img src={Berlin} alt="es-lint want to get" style={{width: '100%'}} />
                        </DemoBox>
                    </Col>
                    <Col span={12} offset={2}>
                        <DemoBox style={{height: '50%'}}>
                            <img src={Cannes} alt="es-lint want to get" style={{height: '100%'}} />
                        </DemoBox>
                        <DemoBox style={{position: 'absolute', height: '50%'}}>
                            <img src={Venice} alt="es-lint want to get" style={{width: '100%'}} />
                        </DemoBox>
                    </Col>
                </Row>
            </div>
            <div className="register">
                <p>在电影里，我们能经历一千种人生!</p>
                <Button
                    type="primary"
                    icon={<SmileOutlined />}
                    shape="round" size={size}
                    onClick={isRegister}>
                        登录 / 注册
                </Button>
            </div>
        </div>
    )
}

const Component = connect(
    (store: IStore) => ({register: store.register}),
    {isRegister: isRegister}
)(Enter);

export default Component;