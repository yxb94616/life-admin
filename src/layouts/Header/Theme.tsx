import { useState } from "react";
import { Divider, Drawer, Radio, RadioChangeEvent, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { globalAtom } from "~@/stores/theme";

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
	const [global, setGlobal] = useAtom(globalAtom);

	return (
		<>
			<SettingOutlined
				className="mr-5 text-xl cursor-pointer"
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
				<div className="space-y-5">
					<Divider plain>主题设置</Divider>
					{/* <div className="flex items-center justify-between">
						<span>暗黑模式</span>
						<Switch
							checkedChildren={<>🌞</>}
							unCheckedChildren={<>🌜</>}
							checked={global.isDark}
							onChange={() => {
								setGlobal({ ...global, isDark: !global.isDark });
							}}
						></Switch>
					</div> */}
					<div className="flex items-center justify-between">
						<span>色弱模式</span>
						<Switch
							checked={global.isWeak}
							onChange={() => {
								setGlobal({ ...global, isWeak: !global.isWeak });
							}}
						></Switch>
					</div>
					<Divider plain>布局设置</Divider>
					<div className="flex items-center justify-between">
						<span>折叠菜单</span>
						<Switch
							checked={global.isCollapse}
							onChange={() => {
								setGlobal({ ...global, isCollapse: !global.isCollapse });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>面包屑导航</span>
						<Switch
							checked={global.isBreadcrumb}
							onChange={() => {
								setGlobal({ ...global, isBreadcrumb: !global.isBreadcrumb });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>标签栏</span>
						<Switch
							checked={global.isTabs}
							onChange={() => {
								setGlobal({ ...global, isTabs: !global.isTabs });
							}}
						></Switch>
					</div>
					<div className="flex items-center justify-between">
						<span>页脚</span>
						<Switch
							checked={global.isFooter}
							onChange={() => {
								setGlobal({ ...global, isFooter: !global.isFooter });
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
								setGlobal({ ...global, size: value });
							}}
						/>
					</div>
				</div>
			</Drawer>
		</>
	);
};
export default Theme;
