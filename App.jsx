import React from 'react'
import 'animate.css'
import '@ant-design/v5-patch-for-react-19'
import { Button, Card, Empty, Form, InputNumber, message, Select, Tooltip } from 'antd'
import { Copy, Download } from 'lucide-react'
import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import TextArea from 'antd/es/input/TextArea'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function App() {
  const [data, setData] = React.useState([])
  const generateAdmins = () => {
    const admins = []
    for (let i = 0; i < 10; i++) {
      admins.push({
        id: nanoid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        pincode: faker.location.zipCode(),
      })
    }
    return admins
  }
  
  const generateProducts = () => {
    const products = []
    for (let i = 0; i < 10; i++) {
      products.push({
        id: nanoid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      })
    }
    return products
  }

 const generatePayment = () => {
    const payments = []
    for (let i = 0; i < 10; i++) {
      payments.push({
        id: nanoid(),
        amount: faker.finance.amount(),
        method: faker.helpers.arrayElement(['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash']),
        date: faker.date.recent().toISOString(),
        transactionId: faker.string.uuid(),
        discount: faker.finance.amount({ min: 0, max: 100, dec: 2 }),
        tax: faker.finance.amount({ min: 0, max: 20, dec: 2 }),
        createdAt: new Date().toISOString(),
      })
    }
    return payments
  }


  function generateData(value) {
    let tmp = []

    for (let i = 0; i < value.number; i++) {
      if (value.data === "admins") {
        tmp.push(generateAdmins())
      } else if (value.data === "products") {
        tmp.push(generateProducts())
      } else if (value.data === "payments") {
        tmp.push(generatePayment())
      }
    }
    console.log(tmp)
    const str = JSON.stringify(tmp, null, 2)
    setData(str)
  }

  function onCopy() {
    navigator.clipboard.writeText(data)
    message.success('JSON data copied to clipboard!')
  }

  function onDownload() {
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.json'
    link.click()
    URL.revokeObjectURL(url)
    message.success('JSON file downloaded!')
  }

  return (
    <div className="animate__animated animate__fadeIn bg-gray-100 min-h-screen py-10">
      <div className="w-9/12 mx-auto flex flex-col gap-12">
        <div className="text-4xl font-bold text-center">
          <h1 className="text-center mt-10 mb-5">JSON Generator</h1>
          <p className="text-center p-5">Generate JSON data effortlessly</p>
        </div>
      </div>
      <Card>
        <Form className='flex gap-12' onFinish={generateData} layout='vertical' initialValues={{ data: "admins", number: 10 }}>
          <Form.Item label="Choose Data" layout='vertical' name="data" className='w-full' rules={[{ required: true, message: 'Please select a data type!' }]}>
            <Select size="large" placeholder="Select a name">
              <Select.Option value="admins">admins</Select.Option>
              <Select.Option value="products">products</Select.Option>
              <Select.Option value="payments">payments</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='number' name="number">
            <InputNumber size="large" placeholder="Enter number of data" style={{ width: '100%' }} className='!w-full' max={100} />
          </Form.Item>
          <Form.Item label=' ' className='w-full' >
            <Button htmlType="submit" type="primary" size="large" className="w-full">Generate JSON</Button>
          </Form.Item>
        </Form>
      </Card>
      {data.length === 0 ? <Empty description="No data generated yet" /> :
        <Card title="Generated JSON" className='mt-4' extra={
          <div className='flex gap-3'>
            <Tooltip title="Copy to clipboard">
              <Copy onClick={onCopy} className='cursor-pointer' />
            </Tooltip>
            <Tooltip title="Download JSON">
              <Download onClick={onDownload} className='cursor-pointer ' />
            </Tooltip>
          </div>
        }>
          <SyntaxHighlighter language="json" style={docco} showLineNumbers>
            {data}
          </SyntaxHighlighter>
        </Card>}


    </div>
  )
}

export default App