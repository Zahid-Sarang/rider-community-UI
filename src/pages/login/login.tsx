import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex, Alert } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";

const LoginPage = () => {
    return (
        <>
            <Layout
                style={{
                    backgroundColor: "#10172A",
                    height: "100vh",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Space direction="vertical" align="center" size="large">
                    <Layout.Content
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Logo />
                    </Layout.Content>
                    <Card
                        bordered={false}
                        style={{ width: 300, backgroundColor: "#1E293B" }}
                        title={
                            <Space
                                style={{
                                    width: "100%",
                                    fontSize: 16,
                                    justifyContent: "center",
                                }}
                            >
                                <LockFilled />
                                Sign In
                            </Space>
                        }
                    >
                        <Form
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Username",
                                    },
                                    {
                                        type: "email",
                                        message: "Email is not valid",
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password",
                                    },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Flex justify="space-between">
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox style={{ color: "#FFF" }}>Remember me</Checkbox>
                                </Form.Item>
                                <a href="" id="login-form-forgot">
                                    Forgot Password
                                </a>
                            </Flex>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Space>
            </Layout>
        </>
    );
};

export default LoginPage;
