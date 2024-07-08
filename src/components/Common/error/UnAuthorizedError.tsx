import { useNavigate } from 'react-router-dom';
import { Layout, Result, Button } from "antd";
import { ROUTES } from '../../../constant';

const { Content } = Layout;


const UnAuthorizedError = () => {
    const navigate = useNavigate();
    return (
        <Content>
            <Result
                status="403"
                title=""
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={() => navigate(ROUTES.ACCOUNT_DETAILS.PATH)}>Back</Button>}
            />
        </Content>
    );
};
export default UnAuthorizedError;
