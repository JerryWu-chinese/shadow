import './index.css';
import React, { ReactElement, Attributes, useState } from 'react';
import { Modal, Row, Col, Input, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import {isRegister} from '../../redux/actions/register';
import {isLogin} from '../../redux/actions/login';

//props 接口
interface IStore {
    login: boolean
}
interface IProps extends React.AllHTMLAttributes<Attributes>, IStore {
    isRegister: Function;
    isLogin: Function
}
//表单 接口
interface IForm {
    [contact: string]: string;
    passWord: string
}
//输入框边框颜色 接口
interface IBorder {
    [propName: string]: string
}

//输入框边框颜色（初始）
const BorderColor: IBorder = {
    contact: '#ccd0d5',
    passWord: '#ccd0d5'
}

//登录组件
const Login: React.FC<IProps> = (props: IProps): ReactElement => {
    const [error, setError] = useState<boolean>(false);     //是否显示错误提示
    const [formData, setFromData] = useState<IForm>({
        contact: '',
        passWord: ''
    })
    //输入框边框颜色
    const [borderColor, setBorderColor] = useState<IBorder>(BorderColor);

    const handleOk = () => {
        props.isLogin(false);
    };
    const handleCancel = () => {
        props.isLogin(false);
    };
    const contactChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFromData({...formData, contact: e.target.value})
    }
    const pwdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFromData({...formData, passWord: e.target.value})
    }
    //提交信息
    const onFinish = () => {
        let flag = 1;
        let temp: IBorder = BorderColor;
        Object.keys(formData).forEach((propName: string) => {
            if(!formData[propName])
            {
                flag = 0;
                setError(true);
                temp[propName] = '#E74C3C';
            }
        })
        if(flag)
        {
            setError(false);
        }
        setBorderColor({...temp});
        alert('登录成功');
        props.isLogin(false);
    }
    //往注册
    const isRegister = (): void => {
        props.isRegister(true);
        props.isLogin(false);
    }

    return (
        <Modal width={396} visible={props.login} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <div style={{
                padding: '24px 0 16px',
                textAlign: 'center',
            }}>
                <p style={{height: '22px', margin: 0, lineHeight: '22px', fontSize: '19px', fontWeight: '500', color: '#1c1e21'}}>登录 Shadow</p>
            </div>
            {error ? (
                <div style={{margin: '4px 16px 6px', padding: '10px', backgroundColor: '#ffebe8', color: '#333', border: '1px solid #dd3c10', textAlign: 'center'}}>
                    <p style={{margin: 0, fontSize: '15px', fontWeight: 600}}>登录信息有误</p>
                    <p style={{margin: 0, fontSize: '13px'}}>账号或密码无效</p>
                </div>
            ) : null}
            <div>
                {/* 联系方式 */}
                <Row style={{height: '64px', margin: '0 16px', padding: '6px 0'}}>
                    <Col span={24}><Input className='i-input' placeholder='手机号或邮箱' onChange={contactChange} style={{borderColor: borderColor.contact}} /></Col>
                </Row>
                {/* 密码 */}
                <Row style={{height: '64px', margin: '0 16px', padding: '6px 0'}}>
                    <Col span={24}><Input className='i-input' type='password' placeholder='密码' onChange={pwdChange} style={{borderColor: borderColor.passWord}} /></Col>
                </Row>
                {/* 登录 */}
                <Row style={{height: '64px', margin: '0 16px', padding: '6px 0'}}>
                    <Col span={24}><Input className='i-input' type='button' value='登录' style={{backgroundColor: '#1877f2', fontSize: '21px', fontWeight: 700, color: '#fff', cursor: 'pointer'}} onClick={onFinish} /></Col>
                </Row>
                <p style={{margin: '0', padding: '10px 0 2px', textAlign: 'center'}}>
                    <a href="/#" style={{fontSize: '15px', fontWeight: 500, color: '#1877f2'}}>忘记账户？</a>
                </p>
                <Divider plain style={{color: '#96999e'}}>或</Divider>
                {/* 注册 */}
                <Row style={{height: '64px', padding: '6px 0'}}>
                    <Col span={6} offset={9}>
                        <Button size='large' type="primary" style={{width: '100%', height: '100%', backgroundColor: '#42b72a', borderRadius: '6px', fontSize: '19px', fontWeight: '800', lineHeight: '25px'}} onClick={isRegister}>新建账户</Button>
                    </Col>
                </Row>
            </div>
            <div style={{height: '14px'}}></div>
        </Modal>
    )
}

//redux 容器组件
const Component = connect(
    (store: IStore) =>({login: store.login}),
    {
        isLogin: isLogin,
        isRegister: isRegister
    }
)(Login);

export default Component;