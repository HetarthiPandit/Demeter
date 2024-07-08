import React from 'react';
import { Tabs } from 'antd';
import '../../style/main.css';
import EmailAddress from './TabsItems/EmailAddress';
import ContactNumber from './TabsItems/ContactNumber';
import ChangePassword from './TabsItems/ChangePassword';

const items = [
  {
    label: 'Email Address',
    key: '1',
    children: <EmailAddress/>,
  },
  {
    label: 'Contact number',
    key: '2',
    children: <ContactNumber/>,
  },
  {
    label: 'Password',
    key: '3',
    children: <ChangePassword/>,
  },
];

const Settings: React.FC = () => {
  return (
    <>
      <div className="setting">
        <Tabs items={items} />

      </div>
    </>
  );
};

export default Settings;
