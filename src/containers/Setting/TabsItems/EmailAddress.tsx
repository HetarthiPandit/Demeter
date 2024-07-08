import React, { useEffect, useState } from 'react';
import { Form, Input, Table, Button, Modal, message, Select } from 'antd';
import '../../../style/main.css';
import Buttons from '../../../components/Common/Button';
import EditIcon from "../../../assets/images/SettingImg/edit.svg";
import DeleteIcon from "../../../assets/images/SettingImg/delete.svg";
import DeleteImg from "../../../assets/images/SettingImg/delete.png";
import OTPInput from 'react-otp-input';
import { ROUTES } from '../../../constant';


const { Option } = Select;

interface EmailRecord {
    key: string;
    Email: string;
    Type: string;
}

export type FixedType = 'left' | 'right';

const EmailAddress: React.FC = () => {
    const [form] = Form.useForm();
    const [modalChangeOpen, setModalChangeOpen] = useState(false);
    const [modalOtpOpen, setModalOtpOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<EmailRecord | null>(null);
    const [emailList, setEmailList] = useState<EmailRecord[]>([]);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [showVerifyButton, setShowVerifyButton] = useState(true);
    const [isPrimaryChange, setIsPrimaryChange] = useState(false);

    useEffect(() => {
        // Initialize with some data
        setEmailList([
            {
                key: '1',
                Email: 'user1@example.com',
                Type: 'cc',
            },
            {
                key: '2',
                Email: 'user2@example.com',
                Type: 'Bcc',
            },
            {
                key: '3',
                Email: 'user3@example.com',
                Type: 'cc',
            },
            {
                key: '4',
                Email: 'use43@example.com',
                Type: 'Bcc',
            },
        ]);
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
            setShowVerifyButton(false);
        }
    }, [timer]);

    const handleEdit = (record: EmailRecord) => {
        setSelectedRecord(record);
        setModalChangeOpen(true);
        setIsPrimaryChange(false);
    };

    const handleDelete = (record: EmailRecord) => {
        setSelectedRecord(record);
        setModalDeleteOpen(true);
    };

    const handleAddEmail = () => {
        setModalAddOpen(true);
    };

    const handleChangePrimaryEmail = () => {
        setModalChangeOpen(true);
        setIsPrimaryChange(true);
    };

    const handleResend = () => {
        if (canResend) {
            setTimer(60);
            setCanResend(false);
            setShowVerifyButton(true);
            message.success("Verification code resent!");
        }
    };

    const handleVerifyOtp = () => {
        setModalOtpOpen(true);
        setModalChangeOpen(false);
    };

    const handleConfirmDelete = () => {
        setEmailList(emailList.filter(item => item.key !== selectedRecord?.key));
        setModalDeleteOpen(false);
        setSelectedRecord(null);
        message.success("Email deleted successfully!");
    };

    const handleAddNewEmail = (values: any) => {
        const newEmail = {
            key: (emailList.length + 1).toString(),
            Email: values.email,
            Type: values.type,
        };
        setEmailList([...emailList, newEmail]);
        setModalAddOpen(false);
        message.success("Email added successfully!");
    };

    const handleSubmitNewEmail = () => {
        form.validateFields().then(values => {
            handleAddNewEmail(values);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            width: '45%',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
            width: '45%',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: "10%",
            className: 'action',
            render: (_: any, record: EmailRecord) => (
                <span className="action_icons">
                    <Button
                        icon={<img src={EditIcon} alt="Edit" />}
                        onClick={() => handleEdit(record)}
                        className="action_btn"
                    />
                    <Button
                        icon={<img src={DeleteIcon} alt="Delete" />}
                        onClick={() => handleDelete(record)}
                        className="action_btn"
                    />
                </span>
            ),
        },
    ];

    return (
        <>
            <div className="setting_section">
                <Form
                    form={form}
                    name="reports"
                    onFinish={handleAddNewEmail}
                    layout="vertical"
                    className="setting_form"
                >
                    <Form.Item name="primaryEmail" label="Primary email address" className="setting_input" initialValue={"michael.brown@example.com"}>
                        <Input placeholder="Enter Deposit" disabled />
                    </Form.Item>
                    <div className="download_button setting_button">
                        <Buttons
                            onClick={handleChangePrimaryEmail}
                            type="primary"
                            variant="primary"
                            className="download_fill_button setting_fill_button"
                            isDisabled={false}
                        >
                            Change
                        </Buttons>
                    </div>
                </Form>
            </div>
            <div className="setting_table report_table">
                <Table
                    columns={columns}
                    dataSource={emailList}
                    size="large"
                    bordered
                    scroll={{ x: 700 }}
                />
                <div className="download_button setting_button">
                    <Buttons
                        onClick={handleAddEmail}
                        type="primary"
                        variant="primary"
                        className="download_fill_button setting_fill_button"
                        isDisabled={false}
                    >
                        Add
                    </Buttons>
                </div>
            </div>

            <Modal
                centered
                open={modalChangeOpen}
                onOk={() => setModalChangeOpen(false)}
                onCancel={() => setModalChangeOpen(false)}
                footer={false}
            >
                <h2 className="change_email_title">Change Email Address</h2>
                <p className="change_email_dis">
                    {isPrimaryChange ? 'Please enter the new Primary email address' : 'Please enter the new Cc/Bcc email address'}
                </p>
                <Form
                    form={form}
                    name="changeEmail"
                    onFinish={handleVerifyOtp}
                    layout="vertical"
                    className="setting_form"
                >
                    <Form.Item name="newEmail" label="New Email" className="setting_input modal_input" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                        <Input placeholder="Enter new email" />
                    </Form.Item>
                    <div className="download_button">
                        <Buttons
                            onClick={handleVerifyOtp}
                            type="primary"
                            variant="primary"
                            className=""
                            isDisabled={false}
                        >
                            Verify
                        </Buttons>
                    </div>
                </Form>
            </Modal>

            <Modal
                centered
                open={modalOtpOpen}
                onOk={() => setModalOtpOpen(false)}
                onCancel={() => setModalOtpOpen(false)}
                footer={false}
            >
                <h2 className="change_email_title">Verification Code</h2>
                <p className="change_email_dis">Enter the verification code from the old email address.</p>
                <div className="form_container modalotp_container">
                    <Form
                        name="verifyOtp"
                        layout="vertical"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item className="otp_container">
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input {...props} />}
                            />
                            <div className="resend_otp_div">
                                {!canResend ? (
                                    <p className="otp_time">Resend code in 00:{timer < 10 ? `0${timer}` : timer}</p>
                                ) : (
                                    <p className="resend_otp" onClick={handleResend}>Resend the code.</p>
                                )}
                            </div>
                        </Form.Item>

                        {showVerifyButton && (
                            <Buttons
                                href={ROUTES.SETTINGS.PATH}
                                type="primary"
                                variant="primary"
                                className="otp_button"
                                isDisabled={false}
                                onClick={() => setModalOtpOpen(false)}
                            >
                                Submit
                            </Buttons>
                        )}

                    </Form>
                </div>
            </Modal>

            <Modal
                centered
                open={modalAddOpen}
                onOk={handleSubmitNewEmail}
                onCancel={() => setModalAddOpen(false)}
                footer={false}
            >
                <h2 className="change_email_title">Add Email Address</h2>
                <p className="change_email_dis">Please enter the new Cc/Bcc email address</p>
                <Form
                    form={form}
                    name="addEmail"
                    onFinish={handleSubmitNewEmail}
                    layout="vertical"
                    className="setting_form"
                >
                    <Form.Item name="email" label="Email address " className="setting_input modal_input" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item name="type" label="Choose type" className="setting_input modal_input" rules={[{ required: true, message: 'Please select a type' }]}>
                        <Select placeholder="Select account number">
                            <Option value={"cc"}>cc</Option>
                            <Option value={"Bcc"}>Bcc</Option>
                        </Select>
                    </Form.Item>
                    <div className="download_button">
                        <Buttons
                            onClick={handleSubmitNewEmail}
                            type="primary"
                            variant="primary"
                            className="download_fill_button"
                            isDisabled={false}
                        >
                            Add
                        </Buttons>
                    </div>
                </Form>
            </Modal>

            <Modal
                centered
                open={modalDeleteOpen}
                onOk={handleConfirmDelete}
                onCancel={() => setModalDeleteOpen(false)}
                footer={false}
            >
                <div className="delete_img">
                    <img src={DeleteImg} alt="" />
                </div>
                <h2 className="change_email_title">Are you sure?</h2>
                <p className="change_email_dis">Really, would you like these records to be deleted? This procedure cannot be reversed.</p>
                <div className="download_button delete_button_section">
                    <Buttons
                        onClick={() => setModalDeleteOpen(false)}
                        type="secondary"
                        variant="secondary"
                        className=""
                        isDisabled={false}
                    >
                        Cancel
                    </Buttons>
                    <Buttons
                        onClick={handleConfirmDelete}
                        type="primary"
                        variant="primary"
                        className=""
                        isDisabled={false}
                    >
                        Delete
                    </Buttons>

                </div>
            </Modal>
        </>
    );
};

export default EmailAddress;
