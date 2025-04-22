import React from 'react';
import { CheckCircleTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
import formImage from '../assets/img.png';
import { useNavigate } from 'react-router-dom';

function TicketSuccess({ ticketNo }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-300 mt-6 animate-fade-in relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-gray-600 hover:text-black transition cursor-pointer"
        title="Back to Form"
      >
        <ArrowLeftOutlined className="text-xl" />
      </button>

      {/* Top Image Section */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 px-6 py-4 flex flex-col items-center border-b">
        <img
          src={formImage}
          alt="Ticket Success"
          className="w-56 h-24 object-contain"
        />
      </div>

      {/* Confirmation Section */}
      <div className="py-6 px-6 text-center">
        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '32px' }} />
        <h2 className="text-2xl font-bold text-black mt-2">
          Ticket Generated Successfully!
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Thank you! Your ticket has been submitted. Keep the ticket number below safe for reference.
        </p>

        {/* Ticket Display */}
        <div className="mt-5 p-5 border-2 border-dashed border-green-400 rounded-xl bg-green-50 shadow-inner">
          <div className="text-lg text-green-600 font-semibold">
            Your Ticket Number:
          </div>
          <div className="text-3xl font-extrabold text-green-800 mt-1 tracking-widest">
            {ticketNo}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketSuccess;
