import { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function ProductForm({ onSubmit }) {
    const [fileList, setFileList] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [form] = Form.useForm();

    const handleChangeImage = (data) => {
        console.log(data);
        setFileList([...data.fileList]);
    };

    const handlePreviewImage = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setShowImage(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleSubmit = (values) => {
        if (!fileList.length) {
            console.log('ERROR: YOU MUST UPLOAD AT LEAST 1 IMAGE!');
            return;
        }
        onSubmit({ ...values });
        handleResetForm();
    };

    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
    }

    return (
        <>
            <Form layout="vertical" size="middle" form={form} name="control-ref" onFinish={handleSubmit}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <TextArea size="small" />
                </Form.Item>
                <Form.Item
                    name="images"
                    label="Images"
                >
                    <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreviewImage}
                        onChange={handleChangeImage}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="primary" danger htmlType="button" onClick={handleResetForm}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
                <Modal visible={showImage} title={previewTitle} footer={null} onCancel={() => setShowImage(false)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form>
        </>
    );
}

export default ProductForm;
