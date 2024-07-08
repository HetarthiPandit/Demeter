import { Form, Input, Row, Col, Alert } from "antd";

import EmailIcon from "../../assets/images/AuthImg/sms.svg";
import AlertIcon from "../../assets/images/AuthImg/alert.svg";
import { FormInstance } from "antd/lib/form";
import Buttons from "../../components/Common/Button";
import AuthsideBanner from "../../components/Common/AuthsideBanner";
import { ROUTES } from "../../constant";

const ForgotPassword: React.FC = () => {
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
                <h2 className="title">Forgot Password</h2>
                <p className="description forgot_description">
                  Enter your email account to forgot password.
                </p>
              </div>
              <div className=" alert_div">
                <Alert
                  message="Invalid email address!"
                  type="error"
                  icon={<img src={AlertIcon} />}
                  showIcon
                  closable
                />
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
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                  className="form_control forgot_form_control"
                >
                  <Input
                    placeholder="Enter your email"
                    className="input"
                    suffix={
                      <img
                        src={EmailIcon}
                        alt="Email Icon"
                        className="anticon"
                      />
                    }
                  />
                </Form.Item>
                <Buttons
                  href={ROUTES.VERIFY_OTP.PATH}
                  onClick={handleClick}
                  type="primary"
                  variant="primary"
                  className=""
                  isDisabled={false}
                >
                  Continue
                </Buttons>
                <Buttons
                  href={ROUTES.SIGN_IN.PATH}
                  onClick={handleClick}
                  type="primary"
                  variant="secondary"
                  className=""
                  isDisabled={false}
                >
                  Back
                </Buttons>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
