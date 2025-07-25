import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Base_Url } from "../config";

export default function AnalyticsDashboard() {
  const { user } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          `${Base_Url}/api/tours/`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tours.");
        const tours = await res.json();

        const analyticsData = tours.map((tour) => ({
          id: tour._id,
          title: tour.title,
          views: Math.floor(Math.random() * 1000),
          clicks: Math.floor(Math.random() * 500),
        }));

        setAnalytics(analyticsData);
      } catch (error) {
        alert("We couldn't load your analytics data. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-red-200 dark:from-gray-700 dark:via-blue-900 dark:to-green-800 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Analytics Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading analytics data...
          </p>
        ) : analytics.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No data available. Start creating tours to track performance.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse rounded overflow-hidden">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900 bg-opacity-80 backdrop-blur-sm text-blue-800 dark:text-blue-200">
                  <th className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700 text-left">
                    Tour Title
                  </th>
                  <th className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700 text-right">
                    Views
                  </th>
                  <th className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700 text-right">
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.map(({ id, title, views, clicks }) => (
                  <tr
                    key={id}
                    className="hover:bg-blue-50 dark:hover:bg-blue-950 transition border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {title}
                    </td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">
                      {views}
                    </td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">
                      {clicks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
