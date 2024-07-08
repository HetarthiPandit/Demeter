import React, { useState } from 'react';
import { DatePicker, Form, Input, Select, TimeRangePickerProps } from 'antd';
import '../../style/main.css';
import dayjs from 'dayjs';
import Buttons from '../../components/Common/Button';
import Tables from './Table';
import type { Dayjs } from 'dayjs';

const { Option } = Select;

const Reports: React.FC = () => {
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState('');
  const [formData, setFormData] = useState<any>({
    accountNumber: '',
    date: "",
    deposit: '4,054.02',
    openingBalance: '35,277.21',
    profit: '-4,054.02',
    closingBalance: '31,223.19',
    total: '-12,921.41',
    fileFormat: ''
  });

  const onFinish = (value:any) => {
    setFormData(value)
  };

  const options = [
    { value: "218080980", label: "218080980" },
    { value: "169402349", label: "169402349" },
    { value: "923546795", label: "923546795" },
  ];

  const handleClick = () => {
  };

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Yeaterday', value: [dayjs().subtract(1, 'd'), dayjs()] },
    { label: 'Last 7 Days', value: [dayjs().subtract(7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().subtract(14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().subtract(30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().subtract(90, 'd'), dayjs()] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setDateRange(`${dateStrings[0]} - ${dateStrings[1]}`);
    } else {
      setDateRange('');
    }
  };

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  return (
    <>
      <div className="report_top_boxs">
        <div className="account_top_box reports_box">
          <h2 className="top_title">Account Number</h2>
          <Form
            form={form}
            name="accountDetails"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="accountNumber">
              <Select placeholder="Select account number">
                {options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="account_top_box reports_box">
          <h2 className="top_title">Date</h2>
          <Form
            form={form}
            name="accountDetails"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="dateRange">
              <DatePicker.RangePicker presets={rangePresets} onChange={onRangeChange} disabledDate={disabledDate} format={"DD/MM/YYYY"}   defaultValue={[dayjs().subtract(1, 'd'), dayjs()]} />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="account_details">
        <h2 className="account_under_title">Daily Summary {dateRange && `(${dateRange})`}</h2>
        <Form
          form={form}
          name="reports"
          onFinish={onFinish}
          layout="vertical"
          className="account_details_form"
        >
          <Form.Item name="deposit" label="Deposit" initialValue={formData.deposit}>
            <Input placeholder="Enter Deposit" disabled />
          </Form.Item>

          <Form.Item name="openingBalance" label="Opening Balance" initialValue={formData.openingBalance}>
            <Input placeholder="Enter Balance" disabled />
          </Form.Item>

          <Form.Item name="profit" label="Profit / Loss (x% Adjusted)" initialValue={formData.profit}>
            <Input placeholder="Enter Profit / Loss" disabled />
          </Form.Item>

          <Form.Item name="closingBalance" label="Closing Balance" initialValue={formData.closingBalance}>
            <Input placeholder="Enter Closing Balance" disabled />
          </Form.Item>

          <Form.Item name="total" label="Total P/L" initialValue={formData.total}>
            <Input placeholder="Enter Total" disabled />
          </Form.Item>

        </Form>
      </div>
      <div className="account_details report_table">
        <h2 className="account_under_title">Account Summary</h2>
        <Tables />
      </div>
      <div className="download_section">
        <div className="download_file">
          <span className="download_text">Download File Format</span>
          <Select placeholder="Select">
            <Option value="PDF">PDF</Option>
            <Option value="Ex sheet">Ex sheet</Option>
          </Select>
        </div>
        <div className="download_button">
          <Buttons
            href={"/"}
            onClick={handleClick}
            type="primary"
            variant="primary"
            className="download_fill_button"
            isDisabled={false}
          >
            Download
          </Buttons>
        </div>
      </div>
    </>
  );
};

export default Reports;
