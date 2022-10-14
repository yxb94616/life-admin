import { useState } from "react";
import { Divider, Drawer, Radio, RadioChangeEvent, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import { systemStore, updateGlobalConfig } from "~@/store/system";

const options = [
	{
		label: "默认",
		value: "middle",
	},
	{
		label: "大型",
		value: "large",
	},
	{
		label: "小型",
		value: "small",
	},
];

const Theme = () => {
	const [visible, setVisible] = useState(false);
	const { global } = useSnapshot(systemStore);

	return (
		<>
			<SettingOutlined
				className="!text-[#626262] mr-5 text-xl cursor-pointer"
				onClick={() => {
					setVisible(!visible);
				}}
			/>
			<Drawer
				title="设置"
				closable={false}
				open={visible}
				onClose={() => {
					setVisible(!visible);
				}}
			>
				<Divider plain>主题设置</Divider>
				<Divider plain>布局设置</Divider>
				<div className="space-y-5">
					<div className="flex items-center justify-between">
						<span>折叠菜单</span>
						<Switch
							checked={global.isCollapse}
							onChange={() => {
								updateGlobalConfig({ isCollapse: !global.isCollapse });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>面包屑导航</span>
						<Switch
							checked={global.isBreadcrumb}
							onChange={() => {
								updateGlobalConfig({ isBreadcrumb: !global.isBreadcrumb });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>标签栏</span>
						<Switch
							checked={global.isTabs}
							onChange={() => {
								updateGlobalConfig({ isTabs: !global.isTabs });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>页脚</span>
						<Switch
							checked={global.isFooter}
							onChange={() => {
								updateGlobalConfig({ isFooter: !global.isFooter });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>尺寸</span>
						<Radio.Group
							optionType="button"
							buttonStyle="solid"
							options={options}
							value={global.size}
							onChange={({ target: { value } }: RadioChangeEvent) => {
								updateGlobalConfig({ size: value });
							}}
						/>
					</div>
				</div>
			</Drawer>
		</>
	);
};
export default Theme;
