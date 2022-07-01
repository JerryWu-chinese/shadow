import React, { ReactElement, useState } from 'react';
import './index.css';
import { Modal, Divider, Row, Col, Input, Button } from 'antd';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {isRegister} from '../../redux/actions/register';

interface IStore {
    register: boolean;
}
interface IProps extends IStore {
    isRegister: Function
}
interface IDate {
    year: string;
    month: string;
    day: string
}
interface IForm {
    firstName: string;
    lastName: string;
    contact: string;
    passWord: string;
    date: IDate;
    sex: number
}
interface IBorder {
    [propName: string]: string
}

const Register: React.FC<IProps> = (props: IProps): ReactElement => {
    const year: Array<number> = [2022];
    for(let i: number = 0; i < 119; i++)
    {
        year.push(year[i] -1);
    }
    const month: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const day: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const [formData, setFromData] = useState<IForm>({
        firstName: '',
        lastName: '',
        contact: '',
        passWord: '',
        date: {
            year: '',
            month: '',
            day: '',
        },
        sex: 0
    });
    const [borderColor, setBorderColor] = useState<IBorder>({
        firstName: '#ccd0d5',
        lastName: '#ccd0d5',
        contact: '#ccd0d5',
        passWord: '#ccd0d5',
        year: '#ccd0d5',
        month: '#ccd0d5',
        day: '#ccd0d5',
        sex: '#ccd0d5'
    })
    const [visible, setVisible] = useState<boolean>(false);

    const handleOk = () => {
        props.isRegister(false);
    };
    const handleCancel = () => {
        props.isRegister(false);
    };
    const nameChange: Function = (type: number): Function => {
        return (e: React.ChangeEvent<HTMLInputElement>): void => {
            if(type === 0)
            {
                setFromData({...formData, firstName: e.target.value});
                return;
            }
            setFromData({...formData, lastName: e.target.value});
        }
    }
    const contactChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFromData({...formData, contact: e.target.value});
    }
    const pwdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFromData({...formData, passWord: e.target.value});
    }
    const dateChange: Function = (type: string): Function => {
        return (e: React.ChangeEvent<HTMLSelectElement>): void => {
            const date: IDate = formData.date;
            switch(type) {
                case 'year':
                    date.year = e.target.value;
                    setFromData({...formData, date: date});
                    break;
                case 'month':
                    date.month = e.target.value;
                    setFromData({...formData, date: date});
                    break;
                case 'day':
                    date.day = e.target.value;
                    setFromData({...formData, date: date});
                    break;
                default:
                    return;
            }
        }
    }
    const sexChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFromData({...formData, sex: Number(e.target.value)})
    }
    const onFinish = (): void => {
        let a: string;
        const errorBorder: Array<string> = [];
        formData.firstName ? a='' : errorBorder.push('firstName');
        formData.lastName ? a='' : errorBorder.push('lastName');
        formData.contact ? a='' : errorBorder.push('contact');
        formData.passWord ? a='' : errorBorder.push('passWord');
        formData.date.year ? a='' : errorBorder.push('year');
        formData.date.month ? a='' : errorBorder.push('month');
        formData.date.day ? a='' : errorBorder.push('day');
        formData.sex ? a='' : errorBorder.push('sex');
        if(errorBorder.length > 0)
        {
            let temp: IBorder = borderColor;
            errorBorder.forEach((item: string): string => {
                temp = {...temp, [item]: '#E74C3C'}
                return a;
            })
            setBorderColor(temp);
            setVisible(true);
            return;
        }
        let temp:IBorder = borderColor;
        Object.keys(borderColor).forEach((propName: string): void => {
            temp[propName] = '#ccd0d5';
        })
        setBorderColor(temp);
        alert('注册成功。');
    };
    const onAltert = (): void=> {
        setVisible(false);
    }

    return (
        <>
            <Modal visible={props.register} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div style={{
                    padding: '10px 16px',
                    textAlign: 'center',
                }}>
                    <p style={{height: '32px', margin: 0, lineHeight: '32px', fontSize: '26px', fontWeight: 700, color: '#1c1e21'}}>创建新账户</p>
                    <p style={{height: '24px', margin: 0, lineHeight: '24px', fontSize: '16px', color: '#606770'}}>快速又简便</p>
                </div>
                <Divider style={{margin: 0}} />
                <div style={{padding: '16px'}}>
                    {/* 姓名 */}
                    <Row style={{height: '52px'}}>
                        <Col span={11}><Input className='my-input' placeholder='姓' onChange={nameChange(0)} style={{borderColor: borderColor.firstName}} /></Col>
                        <Col span={11} offset={2}><Input className='my-input' placeholder='名' onChange={nameChange(1)} style={{borderColor: borderColor.lastName}} /></Col>
                    </Row>
                    {/* 联系方式 */}
                    <Row style={{height: '52px'}}>
                        <Col span={24}><Input className='my-input' placeholder='手机号或邮箱' onChange={contactChange} style={{borderColor: borderColor.contact}} /></Col>
                    </Row>
                    {/* 密码 */}
                    <Row style={{height: '52px'}}>
                        <Col span={24}><Input className='my-input' placeholder='创建密码' onChange={pwdChange} style={{borderColor: borderColor.passWord}} /></Col>
                    </Row>
                    {/* 出生日期 */}
                    <p style={{margin: '2px 0 4px', fontSize: '13px', color: '#606770'}}>出生日期:</p>
                    <Row style={{height: '52px'}}>
                        <Col span={7}>
                            <select className='my-input' style={{width: '100%', padding: '0 11px', borderColor: borderColor.year}} onChange={dateChange('year')}>
                                {year.map((item: number, index: number): ReactElement => {
                                    return <option value={item} key={index}>{item}</option>
                                })}
                            </select>
                        </Col>
                        <Col span={7} offset={1}>
                            <select className='my-input' style={{width: '100%', padding: '0 11px', borderColor: borderColor.month}} onChange={dateChange('month')}>
                                {month.map((item: number, index: number): ReactElement => {
                                    return <option value={item} key={index}>{item} 月</option>
                                })}
                            </select>
                        </Col>
                        <Col span={8} offset={1}>
                            <select className='my-input' style={{width: '100%', padding: '0 11px',  borderColor: borderColor.day}} onChange={dateChange('day')}>
                                {day.map((item: number, index: number): ReactElement => {
                                    return <option value={item} key={index}>{item}</option>
                                })}
                            </select>
                        </Col>
                    </Row>
                    {/* 性别 */}
                    <p style={{margin: '2px 0 4px', fontSize: '13px', color: '#606770'}}>性别:</p>
                    <Row style={{height: '52px'}}>
                        <Col span={7}><p className='my-input' style={{margin: 0, border: `1px solid ${borderColor.sex}`}}>男<input type='radio' name='gender' value='1' style={{float: 'right'}} onChange={sexChange} /></p></Col>
                        <Col span={7} offset={1}><p className='my-input' style={{margin: 0, border: `1px solid ${borderColor.sex}`}}>女<input type='radio' name='gender' value='2' style={{float: 'right'}} onChange={sexChange} /></p></Col>
                        <Col span={8} offset={1}><p className='my-input' style={{margin: 0, border: `1px solid ${borderColor.sex}`}}>自定义<input type='radio' name='gender' value='3' style={{float: 'right'}} onChange={sexChange} /></p></Col>
                    </Row>
                    <p style={{margin: '12px 0', fontSize: '13px', color: '#606770'}}>
                        使用我们服务的用户可能已把你的联系方式上传到 Facebook。
                        <a href='/#'>详细了解</a>
                    </p>
                    <p style={{margin: '12px 0', fontSize: '13px', color: '#606770'}}>
                        点击注册，即表示你同意接受我们的
                        <a href='/#'>条款、数据使用政策</a>
                        和&nbsp;
                        <a href='/#'>Cookie 政策</a>
                        。你可能会收到我们的短信通知，并可以随时退订。
                    </p>
                    {/* 注册 */}
                    <Row style={{height: '52px'}}>
                        <Col span={10} offset={7}>
                            <Button size='large' type="primary" style={{width: '100%', margin: '10px 0', backgroundColor: '#00a400', borderRadius: '6px', fontSize: '19px', fontWeight: '800', lineHeight: '25px'}} onClick={onFinish}>注册</Button>
                        </Col>
                    </Row>
                    {/* 登录 */}
                    <p style={{
                        margin: '0',
                        padding: '10px 0',
                        fontSize: '18px',
                        textAlign: 'center'
                    }}>
                        <a href='/#' style={{color: '#1877f2'}}>有账户了？</a>
                    </p>
                </div>
            </Modal>
            {visible ? (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    padding: '15px 15px 15px 24px',
                    backgroundColor: '#fff2f0',
                    border: '1px solid #ffccc7',
                    zIndex: 1100
                }}>
                    <span style={{marginRight: '15px', fontSize: '24px', color: '#ff4d4f'}}><ExclamationCircleOutlined /></span>
                    <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                        <p style={{fontSize: '24px'}}>
                            Error
                            <span style={{marginLeft: '10px', fontSize: '20px'}}>注册信息有误！</span>
                        </p>
                        <p style={{margin: 0, fontSize: '18px'}}>请检查手机号或邮箱格式</p>
                        <p style={{margin: 0, fontSize: '18px'}}>密码长度应在 8 - 26 位字母和数字</p>
                    </div>
                    <span style={{float: 'right', marginRight: '15px', fontSize: '24px', cursor: 'pointer'}} onClick={onAltert}><CloseOutlined /></span>
                </div>
            ) : null}
        </>
    )
}

const Component = connect(
    (store: IStore) => ({register: store.register}),
    {isRegister: isRegister}
)(Register);

export default Component;