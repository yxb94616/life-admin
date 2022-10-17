import { Ref, useImperativeHandle, useState } from "react";
import { Form, Input, message, Modal } from "antd";
import { IUpdatePasswordReq } from "~@/api/interface/user";
import { updatePassword } from "~@/api/module/user";

interface Props {
	innerRef: Ref<{ showModal: () => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		setLoading(true);
		try {
			const values: IUpdatePasswordReq = await form.validateFields();
			const { code } = await updatePassword(values);
			if (code === 200) {
				message.success("修改密码成功 🎉🎉🎉");
				form.resetFields();
				setIsModalVisible(false);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		setIsModalVisible(false);
	};

	return (
		<Modal
			title="修改密码"
			open={isModalVisible}
			confirmLoading={loading}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose={true}
		>
			<Form
				name="password"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				form={form}
				initialValues={{
					oldPassword: "",
					password: "",
					password2: "",
				}}
				autoComplete="off"
			>
				<Form.Item label="旧密码" name="oldPassword" rules={[{ required: true, message: "请输入旧密码" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="新密码" name="password" hasFeedback rules={[{ required: true, message: "请输入新密码" }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="确认新密码"
					name="password2"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{ required: true, message: "请确认新密码" },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("输入的两个密码不一致"));
							},
						}),
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default PasswordModal;
