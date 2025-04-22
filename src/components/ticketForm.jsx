import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message as antdMessage } from 'antd';
import { ArrowLeftOutlined, ClusterOutlined, EnvironmentOutlined, FileTextOutlined, ExclamationCircleOutlined, PlusOutlined, } from '@ant-design/icons';
import formImage from '../assets/img.png';
import TicketSuccess from './ticketSucccess';

const { TextArea } = Input;

function TicketForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [generatedTicket, setGeneratedTicket] = useState(null);

  const isViewMode = !!id;

  const handleSubmit = async (values) => {
    const payload = {
      topic: values.topic,
      detail: values.detail,
      severity: values.severity,
      location: values.location,
      channelName: values.channel,
    };

    try {
      const response = await fetch('http://192.168.26.98:5004/api/Mattermost/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        setGeneratedTicket(responseData?.ticketNo);
        antdMessage.success('✅ Ticket submitted successfully!');
        form.resetFields();
      } else {
        antdMessage.error(`❌ ${responseData?.message || 'Failed to submit ticket'}`);
      }
    } catch (error) {
      console.error('❌ API Error:', error);
      antdMessage.error('An error occurred while submitting the ticket.');
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://192.168.26.98:5004/api/Mattermost/${id}`);
        const data = await res.json();

        form.setFieldsValue({
          topic: data.topic || '',
          location: data.location || '',
          detail: data.detail || '',
          severity: data.severity || '',
          channel: data.channelName || '',
        });
      } catch (err) {
        console.error('❌ Failed to load ticket data:', err);
      }
    };

    fetchTicket();
  }, [id, form]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        {!generatedTicket ? (
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-md overflow-hidden border border-gray-400 relative">
            {/* Header */}
            <div className="relative bg-gray-100 px-6 py-4 flex flex-col items-center border-b">
              <button
                onClick={() => navigate('/')}
                className="absolute left-4 top-4 text-gray-600 hover:text-black transition cursor-pointer"
              >
                <ArrowLeftOutlined className="text-lg" />
              </button>
              {isViewMode && (
                <div className="absolute right-4 top-4 text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                  View Mode
                </div>
              )}
              <img src={formImage} alt="Demo" className="w-60 h-28 object-contain" />
              <h2 className="text-lg font-bold text-gray-800">{isViewMode
                  ? 'View Ticket Details'
                  : 'Create Ticket'}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {isViewMode
                  ? 'You are viewing an existing ticket.'
                  : 'Fill in your details to raise a support ticket.'}
              </p>
            </div>

            {/* Form */}
            <div className="py-4 px-6">
              <Form form={form} layout="vertical" onFinish={handleSubmit} size="middle">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Form.Item
                      name="topic"
                      label={
                        <span className="text-base font-medium text-gray-700">
                          <ClusterOutlined className="mr-1" /> Topic
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter topic" disabled={isViewMode} />
                    </Form.Item>

                    <Form.Item
                      name="location"
                      label={
                        <span className="text-base font-medium text-gray-700">
                          <EnvironmentOutlined className="mr-1" /> Location
                        </span>
                      }
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter location" disabled={isViewMode} />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="detail"
                    label={
                      <span className="text-base font-medium text-gray-700">
                        <FileTextOutlined className="mr-1" /> Detail
                      </span>
                    }
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={4} placeholder="Enter ticket details" disabled={isViewMode} />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="severity"
                    label={
                      <span className="text-base font-medium text-gray-700">
                        <ExclamationCircleOutlined className="mr-1" /> Severity
                      </span>
                    }
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select severity" disabled={isViewMode}>
                      <Select.Option value="Low">Low</Select.Option>
                      <Select.Option value="Medium">Medium</Select.Option>
                      <Select.Option value="High">High</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="channel"
                    label={
                      <span className="text-base font-medium text-gray-700">
                        <ClusterOutlined className="mr-1" /> Channel
                      </span>
                    }
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter communication channel" disabled={isViewMode} />
                  </Form.Item>
                </div>

                {/* Submit button only in Create mode */}
                {!isViewMode && (
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full bg-gradient-to-r hover:scale-105 from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      <PlusOutlined className="mr-1" /> Submit Ticket
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
          </div>
        ) : (
          <TicketSuccess ticketNo={generatedTicket} />
        )}
      </div>
    </div>
  );
}

export default TicketForm;
