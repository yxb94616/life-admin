import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { ILoginReq } from "~@/api/interface/user";
import { getCaptcha, LoginHttp } from "~@/api/module/user";
import { handleUserinfo, tokenAtom, userAtom } from "~@/stores/user";

const default_position = "left-1/2 -translate-x-1/2";
const initForm: ILoginReq = {
	tenantId: 1,
	remember: true,
	username: "admin",
	password: "admin",
	code: "",
};

function LoginForm({ position = "center" }) {
	const navigate = useNavigate();
	const [, setToken] = useAtom(tokenAtom);
	const [, setUser] = useAtom(userAtom);

	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: ILoginReq) => {
		setLoading(true);
		try {
			const { data, msg } = await LoginHttp(values);
			if (data) {
				message.success(msg);
				setToken(data.access_token);
				const { menus, authorities, roles } = handleUserinfo(data.user);
				setUser({
					info: data.user,
					menus,
					authorities,
					roles,
				});
				navigate("/", { replace: true });
			} else {
				message.error(msg);
			}
		} finally {
			setLoading(false);
		}
	};

	const {
		data,
		run,
		loading: captchaLoading,
	} = useRequest(getCaptcha, {
		onSuccess: (result) => {
			if (result.data) {
				form.setFieldValue("code", result.data.text);
			}
		},
	});

	return (
		<Form
			name="login"
			form={form}
			initialValues={initForm}
			onFinish={onFinish}
			className={`w-90 bg-white shadow-md rounded-sm !px-7 mx-auto
                  absolute top-1/2 -translate-y-1/2 z-10
                  ${
										position === "center"
											? default_position
											: position === "left"
											? `lg:left-80 ${default_position}`
											: position === "right"
											? `lg:right-80 lg:left-auto lg:-translate-x-0 ${default_position}`
											: ""
									}
                `}
		>
			<h1 className="text-xl py-6 text-center">{import.meta.env.VITE_APP_TITLE}</h1>
			<Form.Item name="username" rules={[{ required: true, message: "请输入登录账号" }]}>
				<Input prefix={<UserOutlined />} placeholder="请输入登录账号" size="large" allowClear />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入登录密码" }]}>
				<Input.Password prefix={<LockOutlined />} placeholder="请输入登录密码" size="large" />
			</Form.Item>
			<Form.Item className="!mb-0">
				<div className="flex items-start">
					<Form.Item name="code" rules={[{ required: true, message: "请输入验证码" }]} className="flex-1">
						<Input prefix={<SafetyCertificateOutlined />} placeholder="请输入验证码" size="large" allowClear />
					</Form.Item>
					<Button
						size="large"
						className="ml-3 flex items-center justify-center !p-0"
						onClick={() => {
							run();
						}}
					>
						<Spin spinning={captchaLoading}>
							<img src={data?.data?.base64} alt="验证码" className="w-[103px] h-[38px]" />
						</Spin>
					</Button>
				</div>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>记住密码</Checkbox>
				</Form.Item>
				<Link className="float-right" to="/forget-pwd">
					忘记密码
				</Link>
			</Form.Item>
			<Form.Item>
				<Button type="primary" block size="large" htmlType="submit" loading={loading}>
					登录
				</Button>
			</Form.Item>
		</Form>
	);
}

export default LoginForm;
