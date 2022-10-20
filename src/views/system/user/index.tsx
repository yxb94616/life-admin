import { useEffect, useState } from "react";
import { message, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ResultEnum } from "~@/api/helper/httpEnum";
import { IUserinfo } from "~@/api/interface/user";
import { pageUsers } from "~@/api/module/system/user";

const UseComponent = () => {
	const columns: ColumnsType<IUserinfo> = [
		{
			title: "用户账号",
			dataIndex: "username",
		},
		{
			title: "用户名",
			dataIndex: "nickname",
		},
		{
			title: "性别",
			dataIndex: "sexName",
		},
		{
			title: "手机号",
			dataIndex: "phone",
		},
		{
			title: "角色",
			dataIndex: "roles",
			render: (_, { roles }) => {
				if (roles) {
					return roles.map((item) => {
						return (
							<Tag key={item.roleId} color="processing">
								{item.roleName}
							</Tag>
						);
					});
				}
				return "";
			},
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
		},
		{
			title: "状态",
			dataIndex: "status",
			render: (_, { status }) => <Switch checked={status === 0} onChange={handleStatusChange} />,
		},
	];

	const handleStatusChange = (checked: boolean) => {
		console.log(checked);
	};

	const [dataSource, setDataSource] = useState<IUserinfo[]>([]);
	const [loading, setLoading] = useState(false);

	const handlePageUsers = async () => {
		setLoading(true);
		try {
			const { code, data, msg } = await pageUsers({
				page: 1,
				limit: 10,
			});
			if (code == ResultEnum.SUCCESS) {
				setDataSource(data.list);
			} else {
				message.error(msg);
				setDataSource([]);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handlePageUsers();
	}, []);

	return (
		<Table
			rowKey="userId"
			rowSelection={{
				type: "checkbox",
			}}
			loading={loading}
			dataSource={dataSource}
			columns={columns}
		/>
	);
};

export default UseComponent;
