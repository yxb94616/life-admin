import { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ResultEnum } from "~@/api/helper/httpEnum";
import { IUserinfo } from "~@/api/interface/user";
import { pageUsers, updateUserPassword, updateUserStatus } from "~@/api/module/system/user";

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
			align: "center",
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
			align: "center",
		},
		{
			title: "状态",
			dataIndex: "status",
			render: (_, { status }) => <Tag color={status === 0 ? "success" : "error"}>{status === 0 ? "启用" : "禁用"}</Tag>,
		},
		{
			title: "操作",
			dataIndex: "action",
			align: "center",
			render: (_, { userId, status }) => (
				<span className="space-x-2">
					<Popconfirm
						title={`确定${status === 0 ? "禁用" : "启用"}这个用户吗？`}
						onConfirm={() => {
							handleStatusChange(userId, status);
						}}
					>
						<Button size="small" danger={status === 0}>
							{status === 0 ? "禁用" : "启用"}
						</Button>
					</Popconfirm>
					<Popconfirm
						title={`是否重置为该用户手机号后8位？`}
						onConfirm={() => {
							handlePasswordReset(userId);
						}}
					>
						<Button size="small" type="primary">
							重置密码
						</Button>
					</Popconfirm>
				</span>
			),
		},
	];

	const handlePasswordReset = async (userId: number) => {
		setLoading(true);
		try {
			const { code, msg } = await updateUserPassword({
				userId,
			});
			if (code == ResultEnum.SUCCESS) {
				message.success(msg);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleStatusChange = async (userId: number, status: number) => {
		setLoading(true);
		try {
			const { code, msg } = await updateUserStatus({
				userId,
				status: status === 0 ? 1 : 0,
			});
			if (code == ResultEnum.SUCCESS) {
				await handlePageUsers();
				message.success(msg);
			}
		} finally {
			setLoading(false);
		}
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
