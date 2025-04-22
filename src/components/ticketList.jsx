import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Tag, Row, Col, Empty, Spin } from 'antd';
import { PlusOutlined, FileTextOutlined, ClockCircleOutlined, EyeOutlined, InboxOutlined, } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

function TicketList() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'green';
      case 'medium':
        return 'blue';
      case 'high':
        return 'red';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('http://192.168.26.98:5004/api/Mattermost/all');
        const data = await res.json();
        setTickets(data.reverse());
      } catch (error) {
        console.error('❌ Failed to fetch tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white px-6 py-4 rounded-xl shadow flex justify-between items-center mb-8">
          <div className="text-2xl font-semibold text-black">Tickets</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/create')}
            className="rounded-full bg-blue-600 px-5 hover:bg-blue-700"
          >
            New Ticket
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin tip="Loading tickets..." size="large" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="flex justify-center mt-20">
            <Empty
              description="No tickets found"
              image={<InboxOutlined style={{ fontSize: 60, color: '#d9d9d9' }} />}
              imageStyle={{ height: 100 }}
            >
              <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/create')}>
                Create Ticket
              </Button>
            </Empty>
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {tickets.map((ticket) => (
              <Col key={ticket.id} xs={24} sm={24} md={12} lg={8}>
                  <Card
                    hoverable
                    bordered
                    className="rounded-lg shadow-sm transition-transform hover:scale-[1.01] h-full flex flex-col justify-between"
                    title={
                      <div className="flex justify-between items-center">
                        <span className="text-blue-900 font-semibold flex items-center gap-1">
                          <FileTextOutlined /> {ticket.ticketNo} - {ticket.topic}
                        </span>
                        <Tag color={getStatusColor(ticket.severity)}>{ticket.severity}</Tag>
                      </div>
                    }
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <Text type="secondary" className="block mb-1 text-sm items-center gap-1">
                          <ClockCircleOutlined /> Location: {ticket.location}
                        </Text>
                        <Paragraph ellipsis={{ rows: 3 }}>{ticket.detail}</Paragraph>
                      </div>
                      <button
                        className="cursor-pointer hover:text-blue-400 mt-auto text-blue-500 border rounded-md border-blue-500"
                        onClick={() => navigate(`/create/${ticket.id}`)}
                      >
                        <EyeOutlined className='mr-2'/>View Details
                      </button>
                    </div>
                  </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default TicketList;
