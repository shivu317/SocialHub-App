import React, { useState } from 'react'
import { Button, Tag } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components'

export type Status = {
  color: string
  text: string
}

const statusMap = {
  0: {
    color: 'blue',
    text: 'In Progress',
  },
  1: {
    color: 'green',
    text: 'Completed',
  },
  2: {
    color: 'volcano',
    text: 'Warning',
  },
  3: {
    color: 'red',
    text: 'Failed',
  },
  4: {
    color: '',
    text: 'Not Completed',
  },
}

export type TableListItem = {
  key: number
  name: string
  containers: number
  creator: string
  status: Status
  createdAt: number
}

const tableListDataSource: TableListItem[] = []

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某']

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[((Math.floor(Math.random() * 10) % 5) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  })
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

const MyProTable = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] =
    useState<readonly TableListItem[]>(tableListDataSource)
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom')

  const expandedRowRender = () => {
    const data = []
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      })
    }

    return (
      <ProTable
        columns={[
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
          {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            valueType: 'option',
            render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
          },
        ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data}
        pagination={false}
      />
    )
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Application Name',
      width: 120,
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: 'Status',
      width: 120,
      dataIndex: 'status',
      render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
    },
    {
      title: 'Container Count',
      width: 120,
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: 'Creator',
      width: 120,
      dataIndex: 'creator',
      valueEnum: {
        all: { text: 'All' },
        付小小: { text: '付小小' },
        曲丽丽: { text: '曲丽丽' },
        林东东: { text: '林东东' },
        陈帅帅: { text: '陈帅帅' },
        兼某某: { text: '兼某某' },
      },
    },
  ]

  return (
    <>
      <EditableProTable<TableListItem>
        rowKey="key"
        headerTitle="可编辑表格"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: (index) => ({
                  key: index,
                  name: '',
                  containers: 0,
                  creator: '',
                  status: { color: '', text: '' },
                  createdAt: 0,
                }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: tableListDataSource,
          total: tableListDataSource.length,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row)
            await waitTime(2000)
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  )
}

export default MyProTable
