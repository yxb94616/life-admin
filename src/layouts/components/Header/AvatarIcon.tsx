import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Menu, message, Modal } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import { HOME_URL } from "~@/config/constant";
import { userStore } from "~@/store/user";
import avatar from "../../../assets/images/avatar.png";
import InfoModal from "./InfoModal";
import PasswordModal from "./PasswordModal";

interface ModalProps {
	showModal: (params: { name: number }) => void;
}

const AvatarIcon = () => {
	const navigate = useNavigate();

	const passRef = useRef<ModalProps>(null!);
	const infoRef = useRef<ModalProps>(null!);

	const logout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				localStorage.clear();
				userStore.token = null;
				userStore.userinfo = null;
				message.success("退出登录成功！");
				navigate("/login");
			},
		});
	};

	const menu = (
		<Menu
			items={[
				{
					label: <Link to={HOME_URL}>首页</Link>,
					key: "0",
				},
				{
					label: <span onClick={() => infoRef.current.showModal()}>个人信息</span>,
					key: "1",
				},
				{
					label: <span onClick={() => passRef.current.showModal()}>修改密码</span>,
					key: "3",
				},
				{
					type: "divider",
				},
				{
					label: <span onClick={logout}>退出登录</span>,
					key: "4",
				},
			]}
		></Menu>
	);

	const snap = useSnapshot(userStore);

	return (
		<>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
				<div className="flex items-center cursor-pointer">
					<span className="mr-2 text-base text-black/80">{snap.userinfo?.nickname}</span>
					<Avatar src={avatar} />
					<DownOutlined className="ml-2" />
				</div>
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};

export default AvatarIcon;
