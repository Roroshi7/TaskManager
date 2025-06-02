import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const getCompletionTrend = () => {
    const now = new Date();
    const days = timeRange === 'week' ? 7 : 30;
    const labels = [];
    const completedData = [];
    const createdData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      labels.push(dateStr);

      const completed = tasks.filter(task => {
        const taskDate = new Date(task.updatedAt);
        return (
          task.status === 'completed' &&
          taskDate.toLocaleDateString() === dateStr
        );
      }).length;

      const created = tasks.filter(task => {
        const taskDate = new Date(task.createdAt);
        return taskDate.toLocaleDateString() === dateStr;
      }).length;

      completedData.push(completed);
      createdData.push(created);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Completed Tasks',
          data: completedData,
          borderColor: '#10B981',
          backgroundColor: '#10B981',
          tension: 0.4
        },
        {
          label: 'Created Tasks',
          data: createdData,
          borderColor: '#3B82F6',
          backgroundColor: '#3B82F6',
          tension: 0.4
        }
      ]
    };
  };

  const getStatusDistribution = () => {
    const statusCounts = {
      todo: tasks.filter(task => task.status === 'todo').length,
      'in-progress': tasks.filter(task => task.status === 'in-progress').length,
      completed: tasks.filter(task => task.status === 'completed').length
    };

    return {
      labels: ['To Do', 'In Progress', 'Completed'],
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ['#6B7280', '#3B82F6', '#10B981'],
          borderWidth: 0
        }
      ]
    };
  };

  const getPriorityDistribution = () => {
    const priorityCounts = {
      high: tasks.filter(task => task.priority === 'high').length,
      medium: tasks.filter(task => task.priority === 'medium').length,
      low: tasks.filter(task => task.priority === 'low').length
    };

    return {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          data: Object.values(priorityCounts),
          backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
          borderWidth: 0
        }
      ]
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-48"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Task Completion Trend
          </h3>
          <div className="h-80">
            <Line
              data={getCompletionTrend()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Status Distribution
            </h3>
            <div className="h-64">
              <Bar
                data={getStatusDistribution()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Priority Distribution
            </h3>
            <div className="h-64">
              <Bar
                data={getPriorityDistribution()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 