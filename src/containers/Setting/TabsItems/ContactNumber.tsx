import { useState } from 'react';
import { Form, Input } from 'antd';
import '../../../style/main.css';
import Buttons from '../../../components/Common/Button';

function ContactNumber() {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    const onFinish = () => {
        setIsEditing(false);
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        form.resetFields();
    };

    return (
        <div>
            <div className="contact_section">
                <Form
                    form={form}
                    name="reports"
                    onFinish={onFinish}
                    layout="vertical"
                    className="setting_form"
                >
                    <Form.Item
                        name="primaryContactNumber"
                        label="Contact number"
                        className="setting_input"
                        initialValue="(555) 123-4567"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your contact number',
                            },
                            {
                                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                                message: 'Contact number must be in the format (555) 123-4567',
                            },
                        ]}
                    >
                        <Input placeholder="Enter Contact number" disabled={!isEditing} />
                    </Form.Item>
                    <div className={` ${isEditing ? "delete_button_section password_buttons" : "download_button contact_button"}`}>
                        {isEditing ? (
                            <>
                                <Buttons
                                    type="secondary"
                                    variant="secondary"
                                    className="password_btn"
                                    isDisabled={false}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Buttons>
                                <Buttons
                                    type="primary"
                                    variant="primary"
                                    className="password_btn"
                                    isDisabled={false}
                                    onClick={form.submit}
                                >
                                    Save
                                </Buttons>
                            </>
                        ) : (
                            <Buttons
                                onClick={handleClick}
                                type="primary"
                                variant="primary"
                                className="contact_btn"
                                isDisabled={false}
                            >
                                Change Contact Number
                            </Buttons>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ContactNumber;
