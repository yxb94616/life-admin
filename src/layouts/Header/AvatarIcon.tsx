import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Menu, message, Modal } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import avatar from "~@/assets/images/avatar.png";
import constant, { HOME_URL } from "~@/config/constant";
import { tokenAtom, userAtom } from "~@/stores/user";
import InfoModal from "./InfoModal";
import PasswordModal from "./PasswordModal";

interface ModalProps {
	showModal: () => void;
}

const AvatarIcon = () => {
	const navigate = useNavigate();

	const passRef = useRef<ModalProps>(null!);
	const infoRef = useRef<ModalProps>(null!);
	const [user, setUser] = useAtom(userAtom);
	const [, setToken] = useAtom(tokenAtom);

	const logout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				setToken("");
				localStorage.removeItem(constant.storage.token);
				setUser(RESET);
				message.success("退出登录！");
				navigate("/login");
			},
		});
	};

	const menu = (
		<Menu
			items={[
				{
					label: <Link to={HOME_URL}>首页</Link>,
					key: "1",
				},
				{
					label: <a onClick={() => infoRef.current.showModal()}>个人信息</a>,
					key: "2",
				},
				{
					label: <a onClick={() => passRef.current.showModal()}>修改密码</a>,
					key: "3",
				},
				{
					type: "divider",
				},
				{
					label: <a onClick={logout}>退出登录</a>,
					key: "4",
				},
			]}
		></Menu>
	);

	return (
		<>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
				<div className="flex items-center cursor-pointer">
					<span className="mr-2 text-base text-black/80">{user.info?.nickname}</span>
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
