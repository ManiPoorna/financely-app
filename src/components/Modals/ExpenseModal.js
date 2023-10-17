import React from 'react'
import { Form, Modal, DatePicker, Select, Input, Button,InputNumber } from 'antd';
import "./style.css"

const ExpenseModal = ({ isExpenseModalOpen, closeExpenseModal, onSubmit }) => {
	const [form] = Form.useForm();
	return (
		<div className='expense-modal'>
			<Modal
				open={isExpenseModalOpen}
				onOk={onSubmit}
				onCancel={closeExpenseModal}
				footer={null}
			>
				<h2>Add Expense</h2>
				<Form
					form={form}
					className='expense-form'
					layout='vertical'
					onFinish={(values) => {
						onSubmit(values, "Expense");
						form.resetFields();
						closeExpenseModal();
					}}
				>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please enter name" }]}
					>
						<Input className='ant-input' />
					</Form.Item>
					<Form.Item
						label="Amount"
						name="amount"
						rules={[{ required: true, message: "Please enter Amount" }]}
					>
						<InputNumber className='ant-input' />
					</Form.Item>
					<Form.Item
						label="Date"
						name="date"
						rules={[{ required: true, message: "Please choose date" }]}
					>
						<DatePicker format="YYYY-MM-DD" className='ant-input' />
					</Form.Item>
					<Form.Item
						label="Tag"
						name="tag"
						rules={[{ required: true, message: "Please select a tag" }]}
					>
						<Select>
							<Select.Option value="Food">Food</Select.Option>
							<Select.Option value="Books">Books</Select.Option>
							<Select.Option value="Party">Party</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button className='button' type="primary" htmlType='sumbit'>Add Expense</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default ExpenseModal