import '../../style/auth.css';
import { Form, Input, Row, Col, Alert } from 'antd';

import EmailIcon from "../../assets/images/AuthImg/sms.svg";
import AlertIcon from "../../assets/images/AuthImg/alert.svg";
import { FormInstance } from 'antd/lib/form';
import AuthsideBanner from '../../components/Common/AuthsideBanner';
import Buttons from '../../components/Common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constant';

const Signin: React.FC = () => {
    const [form] = Form.useForm<FormInstance>();
    const handleClick = () => {
    };
    return (
        <div>
            <div className="login_container">
                <Row className="row">
                    <Col xs={24} sm={24} md={24} lg={12} className="logo_col">
                        <AuthsideBanner />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} className="form_col">
                        <div className="form_container">
                            <div className="title_section">
                                <h2 className="title">Log in</h2>
                                <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className=" alert_div">
                                <Alert message="Invalid email address or password!" type="error" icon={<img src={AlertIcon} />} showIcon closable />

                            </div>
                            <Form
                                form={form}
                                name="login"
                                layout="vertical"
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please enter your email!' }]}
                                    className="form_control"
                                >
                                    <Input
                                        placeholder="Enter your email"
                                        className="input"
                                        suffix={<img src={EmailIcon} alt="Email Icon" className="anticon" />}
                                        
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter your password!' }]}
                                    className="form_control"
                                >
                                    <Input.Password
                                        type="password"
                                        placeholder="Password"
                                        className="input"
                                    />
                                </Form.Item>
                                <Link to={ROUTES.Forgot_Password.PATH} className="forgot_password">Forgot Password?</Link>
                                <Buttons
                                    href={"/"}
                                    onClick={handleClick}
                                    type="primary"
                                    variant="primary"
                                    className="resetpass_fill_button"
                                    isDisabled={false}
                                >
                                    Login
                                </Buttons>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Signin;
