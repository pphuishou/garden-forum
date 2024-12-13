import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { reqAddArticle, reqArticleDetail } from "@/apis/article";
import { useState, useEffect } from "react";
import { useChannel } from "@/hooks/useChannel";
import { useLocation } from 'react-router-dom'

const { Option } = Select;

const Publish = () => {
  // useHook 
  const { channelList } = useChannel();
  
  const $location = useLocation();
  // 设置form表单回填
  const [ form ] = Form.useForm();
  const [ imageCount, setImageCount ] = useState(1);
  const [ imageFile, setImageFile ] = useState();
  const [loading, setLoading] = useState(false);

  const formFinish = (value) => {
    const { title, content, channel_id } = value;
    let imageArr = imageFile.map(item => item.response.data.url );
    let data = {
      title,
      content,
      channel_id,
      cover: {
        type: imageCount,
        images: imageArr,
      },
    };
    reqAddArticle(data);
  };
  // 选择图片数量
  const handleImageCount = ({target}) => {
    setImageCount(target.value);
  }

  const handleChange = (info) => {
    setImageFile(info.fileList);
  };
  // 获取文章详情
  const getArticle = async (id) => {
    const result = await reqArticleDetail(id);
    form.setFieldValue(result.data);
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  let id = $location.state?.id  || "";
  useEffect(() => {
    // const channelList = useChannel()
    // getChannelList();
    
    async function getArticle (id) {
      const result = await reqArticleDetail(id);
      form.setFieldValue(result.data);
    }
    getArticle(id)
  }, [id, form]);
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={formFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="封面"
            name="cover"
            rules={[{ required: true, message: "请上传图片" }]}
          >
            <Space direction="vertical">
              <Radio.Group onChange={handleImageCount} defaultValue={imageCount}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
              {
                imageCount > 0 &&
                <Upload
                  name="image"
                  listType="picture-card"
                  showUploadList
                  action="http://geek.itheima.net/v1_0/upload"
                  onChange={handleChange}
                  maxCount={imageCount}
                >
                  {uploadButton}
                </Upload>
              }
            </Space>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
