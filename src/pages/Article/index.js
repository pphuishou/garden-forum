import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useChannel } from "@/hooks/useChannel";
import { reqArticleList, reqdDelItem } from '@/apis/article';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import {
  Button,
  DatePicker,
  Form,
  Radio,
  Select,
  Breadcrumb,
  Card,
  Space,
  ConfigProvider,
  Tag,
  Table,
  Image,
  Popconfirm,
  message
} from "antd";
const { RangePicker } = DatePicker;

// 不要放在任何import位置之上
dayjs.locale("zh-cn");

const Article = () => {
  const navigate = useNavigate();

  const { channelList } = useChannel();
  // 文章列表
  const [ articleList, setArticleList ] = useState([])
  // 列表总数
  const [ total, setTotal ] = useState(0);
  // 当前页码
  const [ pageCurrent, setPageCurrent ] = useState(1);
  // 筛选数据
  const [ screenData, setScreenData ] = useState({
    statue: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 10
  })
  // 获取筛选条件数据
  const handleFormValue = (value) => {
    const { statue, channel_id, date } = value;
    setScreenData({
      ...screenData,
      statue,
      channel_id,
      begin_pubdate:"" || date[0]?.format('YYYY-MM-DD'),
      end_pubdate:"" || date[1]?.format('YYYY-MM-DD'),
    });
  }
  // 表格中tag字典
  const statusMap = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">已通过</Tag>
  }
  // 确认删除数据
  const handleDelete = async ({id}) => {
    const result = await reqdDelItem(id);
    message.success(result.message)
  }
  // 切换页面
  const handlePageChange = (page) => {
    setPageCurrent(page)
  }
  // 修改数据
  const handleEdit = ({id}) => {
    /**
     * 这种路由间传递参数的方式，在目标组件中使用useLocation拿到
     * 另一种navigate(`/publish?id=${id}`)，在目标组件中使用const searchParams = useSearchParams()
     * const id = searchParams.get('id) 拿到
     */ 
    navigate('/publish',{state: {id}})
  }
  // 配置分页器
  const pagination = {
    defaultCurrent: 1,
    total,
    current: pageCurrent,
    onChange: handlePageChange,
    defaultPageSize: 4
  }
  // 表格数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover) => 
        <Image
          width={50}
          src={cover.images[0]}
        />,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => statusMap[status]
      
    },
    {
      title: '发布时间',
      key: 'pubdate',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      key: 'read_count',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      key: 'comment_count',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      key: 'like_count',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      key: 'id',
      render: (row) => (
        <Space size="middle">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(row)}></Button>
          <Popconfirm
            title="删除确认"
            description="确定删除这条数据吗？"
            onConfirm={() => handleDelete(row)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    // 获取文章列表
    async function getArticle() {
      const result = await reqArticleList(screenData);
      if (result) {
        setArticleList(result.data.results);
      }
    }
    getArticle();
  }, [screenData])
  return (
    <Card>
      <Breadcrumb
        items={[{ title: <Link to={"/"}>首页</Link> }, { title: "文章列表" }]}
      />
      <Space  direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Form layout="inline" onFinish={handleFormValue} >
          <Form.Item name="statue" label="状态">
            <Radio.Group>
              <Radio value=""> 全部 </Radio>
              <Radio value="0"> 草稿 </Radio>
              <Radio value="2"> 审核通过 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="channel_id" label="频道">
            <Select style={{ width: "100px" }}> 
              {channelList.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          
          <ConfigProvider locale={locale}>
            <Form.Item name="date" label="日期">
              <RangePicker />
            </Form.Item>
          </ConfigProvider>
          
          <Form.Item>
            <Button htmlType="submit" type="primary">筛选</Button>
          </Form.Item>
          
        </Form>
      
        <Table columns={columns} dataSource={articleList} pagination={pagination} rowKey="id" />
      </Space>
    </Card>
  );
};
export default () => <Article />;
