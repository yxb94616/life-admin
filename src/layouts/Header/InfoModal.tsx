import { Ref, useImperativeHandle, useState } from "react";
import { message, Modal } from "antd";

interface Props {
	innerRef: Ref<{ showModal: () => void } | undefined>;
}

const InfoModal = (props: Props) => {
	const [modalVisible, setModalVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));

	const showModal = () => {
		setModalVisible(true);
	};

	const handleOk = () => {
		message.success("修改用户信息成功 🎉🎉🎉");
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};
	return (
		<Modal title="个人信息" open={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>User Info...</p>
			<p>User Info...</p>
			<p>User Info...</p>
		</Modal>
	);
};
export default InfoModal;
