import React from 'react'
import { Form, Modal, DatePicker, Select, Input, Button, InputNumber } from 'antd';
import "./style.css"

const IncomeModal = ({ isIncomeModalOpen, closeIncomeModal, onSubmit }) => {

  const [form] = Form.useForm();
  return (
    <div className='income-modal'>
      <Modal
        open={isIncomeModalOpen}
        onOk={onSubmit}
        onCancel={closeIncomeModal}
        footer={null}
      >
        <h2>Add Income</h2>
        <Form
          className='income-form'
          form={form}
          layout='vertical'
          onFinish={(values) => {
            onSubmit(values,"Income");
            form.resetFields();
            closeIncomeModal();
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
            <DatePicker format="YYYY-MM-DD"className='ant-input' />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="tag"
            rules={[{ required: true, message: "Please select a tag" }]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className='button' type="primary" htmlType='sumbit'>Add Income</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default IncomeModal