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
			title: "????????????",
			dataIndex: "username",
			width: 150,
		},
		{
			title: "?????????",
			dataIndex: "nickname",
			width: 150,
		},
		{
			title: "??????",
			dataIndex: "sexName",
			align: "center",
			width: 100,
		},
		{
			title: "??????",
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
			title: "????????????",
			dataIndex: "createTime",
			align: "center",
			width: 150,
		},
		{
			title: "??????",
			dataIndex: "status",
			align: "center",
			width: 100,
			render: (_, { status }) => <Tag color={status === 0 ? "success" : "error"}>{status === 0 ? "??????" : "??????"}</Tag>,
		},
		{
			title: "??????",
			dataIndex: "action",
			align: "center",
			width: 200,
			fixed: "right",
			render: (_, { userId, status }) => (
				<span className="space-x-2">
					<Popconfirm
						title={`??????${status === 0 ? "??????" : "??????"}??????????????????`}
						onConfirm={() => {
							handleStatusChange(userId, status);
						}}
					>
						<Button size="small" danger={status === 0}>
							{status === 0 ? "??????" : "??????"}
						</Button>
					</Popconfirm>
					<Popconfirm
						title={`????????????????????????????????????8??????`}
						onConfirm={() => {
							handlePasswordReset(userId);
						}}
					>
						<Button size="small" type="primary">
							????????????
						</Button>
					</Popconfirm>
				</span>
			),
		},
	];

	// ???????????????????????? 1360px ?????? scroll.x
	return (
		<>
			<Form className="!mb-5 w-full" name="tableSearch" form={form} autoComplete="off">
				<Row gutter={15}>
					<Col span={6}>
						<Form.Item label="????????????" name="username">
							<Input placeholder="?????????" allowClear />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="?????????" name="nickname">
							<Input placeholder="?????????" allowClear />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="??????" name="sex">
							<Select placeholder="?????????" allowClear>
								<Select.Option value={1}>???</Select.Option>
								<Select.Option value={2}>???</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item>
							<div className="space-x-2">
								<Button type="primary" onClick={handleSearch}>
									??????
								</Button>
								<Button onClick={handleReset}>??????</Button>
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
					showTotal: (total) => `???${total}???`,
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
