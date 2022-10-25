import { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Popconfirm, Row, Select, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ResultEnum } from "~@/api/helper/httpEnum";
import { IPageUsersSearch, IUserinfo } from "~@/api/interface/user";
import { pageUsers, updateUserPassword, updateUserStatus } from "~@/api/module/system/user";

const UseComponent = () => {
	const [dataSource, setDataSource] = useState<IUserinfo[]>([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 1,
		total: 0,
	});
	const [form] = Form.useForm<IPageUsersSearch>();

	const handlePageUsers = async () => {
		setLoading(true);
		try {
			const { code, data, msg } = await pageUsers({
				page: pagination.current,
				limit: pagination.pageSize,
				...form.getFieldsValue(),
			});
			if (code == ResultEnum.SUCCESS) {
				setDataSource(data.list);
				setPagination({ ...pagination, total: data.count });
			} else {
				message.error(msg);
				setDataSource([]);
				setPagination({ ...pagination, total: 0 });
			}
		} finally {
			setLoading(false);
		}
	};

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

	const handlePageChange = (current: number, pageSize: number) => {
		setPagination({ ...pagination, current, pageSize });
	};

	const handleSearch = () => {
		setPagination({ ...pagination, current: 1 });
		handlePageUsers();
	};

	const handleReset = () => {
		form.resetFields();
		setPagination({ ...pagination, current: 1 });
	};

	useEffect(() => {
		handlePageUsers();
	}, []);

	const columns: ColumnsType<IUserinfo> = [
		{
			title: "用户账号",
			dataIndex: "username",
			width: 150,
		},
		{
			title: "用户名",
			dataIndex: "nickname",
			width: 150,
		},
		{
			title: "性别",
			dataIndex: "sexName",
			align: "center",
			width: 100,
		},
		{
			title: "角色",
			dataIndex: "roles",
			width: 150,
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
			width: 150,
		},
		{
			title: "状态",
			dataIndex: "status",
			align: "center",
			width: 100,
			render: (_, { status }) => <Tag color={status === 0 ? "success" : "error"}>{status === 0 ? "启用" : "禁用"}</Tag>,
		},
		{
			title: "操作",
			dataIndex: "action",
			align: "center",
			width: 200,
			fixed: "right",
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

	// 按照最小视口宽度 1360px 设置 scroll.x
	return (
		<>
			<Form className="!mb-5 w-full" name="tableSearch" form={form} autoComplete="off">
				<Row gutter={15}>
					<Col span={6}>
						<Form.Item label="用户账号" name="username">
							<Input placeholder="请输入" allowClear />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="用户名" name="nickname">
							<Input placeholder="请输入" allowClear />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="性别" name="sex">
							<Select placeholder="请选择" allowClear>
								<Select.Option value={1}>男</Select.Option>
								<Select.Option value={2}>女</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item>
							<div className="space-x-2">
								<Button type="primary" onClick={handleSearch}>
									查询
								</Button>
								<Button onClick={handleReset}>重置</Button>
							</div>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Table
				scroll={{
					x: 1076,
				}}
				rowKey="userId"
				rowSelection={{
					type: "checkbox",
				}}
				bordered
				loading={loading}
				dataSource={dataSource}
				columns={columns}
				pagination={{
					showQuickJumper: true,
					showTotal: (total) => `共${total}条`,
					showSizeChanger: true,
					pageSizeOptions: [10, 20, 50, 100],
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: pagination.total,
					onChange: handlePageChange,
				}}
			/>
		</>
	);
};

export default UseComponent;
