import { Ref, useImperativeHandle, useState } from "react";
import { message, Modal } from "antd";

interface Props {
	innerRef: Ref<{ showModal: () => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		message.success("修改密码成功 🎉🎉🎉");
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal title="修改密码" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>Some Password...</p>
			<p>Some Password...</p>
			<p>Some Password...</p>
		</Modal>
	);
};
export default PasswordModal;
