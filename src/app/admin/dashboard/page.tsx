'use client'
import { DASHBOARD_ITEMS, DASHBOARD_ITEMS_ADMIN } from "@/_utils/constant";
import DashboardCard from "@/components/common/cards/dashboard-card";
import { Bar, Line, Pie, PolarArea } from "react-chartjs-2"
import { Chart, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement,LineElement,BarElement, Tooltip } from 'chart.js'
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
Chart.register(Tooltip)
// Chart.register(ChartDataLabels);
Chart.register(RadialLinearScale);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(ArcElement);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);


const options: any = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Avg interest by month (days)",
      padding: {
        bottom: 30
      },
      weight: "bold",
      color: "#00325c",
      font: {
        size: 13
      },
      align: "start"
    },
    datalabels: {
      display: true,
      color: "white"
    }
  }
}




export default function Dashboard() {
  const getAdminStats=useQuery(['adminStats'],()=>axiosInstance.get('/admin/stats'),{
    onSuccess(data) {
      console.log(Object.keys(data?.data.data))
    },
  })

  // console.log()
  return (
    <section className="p-4 flex flex-col gap-4">
       <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 ">
          Dashboard
        </h5>
        {/* tradesPersonSignedUp: 4
activeTradesPerson: 4
totalJobs: 7
jobsCompleted: 2
totalRefunds: 3 */}
      <div className="flex flex-wrap items-center justify-center w-full text-gray-800  bg-gray-100 gap-10">
        {!getAdminStats.isLoading && Object.keys(getAdminStats.data?.data.data).map((item, index) =>{
          if(item!=='graph'){
            return (
              <DashboardCard
                key={index}
                icon={DASHBOARD_ITEMS_ADMIN.find((e)=>e.slug==item)!.icon}
                title={DASHBOARD_ITEMS_ADMIN.find((e)=>e.slug==item)!.title}
                value={getAdminStats.data?.data.data[item]}
              />
            )
          }
        } )}
      </div>
      <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 ">
          Activities
        </h5>

        <div className="flex gap-8 sm:flex-nowrap flex-wrap">
          <div className="w-full bg-white rounded-lg p-4">
            <div className="flex justify-between">
            <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-10">
            Monthly Tradepeople Activity
            </h5>
            </div>
            <div className="flex w-full">
            <Line className="!h-full !w-full" options={options} data={{
              labels: getAdminStats.data?.data.data.graph.jobsPosted.map((e:any)=>e.month),
              datasets: [{
                label: 'Total Tradepersons',
                data: getAdminStats.data?.data.data.graph.jobsPosted.map((e:any)=>e.jobsPosted),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }} />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg p-4">
          <h5 className="capitalize text-lg text-center lg:text-xl font-semibold text-color-17 pb-10">
          Total TradePersons
            </h5>
            
            <div className="flex justify-center">
            <Pie className="!w-max !h-[20rem]" options={options} data={{
    labels: [
      'Plumber',
      'Electrician',
      'Total'
    ],
    datasets: [{
      // label: 'My First Dataset',
      data: [getAdminStats.data?.data.data.graph.tradesPersonCount.plumber,getAdminStats.data?.data.data.graph.tradesPersonCount.electrician,getAdminStats.data?.data.data.graph.tradesPersonCount.plumber+getAdminStats.data?.data.data.graph.tradesPersonCount.electrician],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 8
    }]
            }} />
            </div>
          </div>
          
        </div>
        


      
    </section>
  );
}
