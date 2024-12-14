<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    protected $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    public function index(Request $request)
    {
        if (auth()->user()->role == 'admin' || auth()->user()->role == 'staff') {
            $timeFrame = $request->get('timeFrame', 'month'); // Mặc định là 'month'
            $startDate = $request->get('startDate');
            $endDate = $request->get('endDate');

            $timeFrame = $this->statisticsService->getTimeFrameFromDateRange($startDate, $endDate, $timeFrame);

            $timeFrameText = $this->statisticsService->getTimeFrameText($timeFrame);
            $totalProducts = $this->statisticsService->getTopSellingProduct($timeFrame, $startDate, $endDate);
            $totalOrders = $this->statisticsService->gettotalOrders($timeFrame, $startDate, $endDate);
            $totalRevenue = $this->statisticsService->gettotalRevenue($timeFrame, $startDate, $endDate);
            $revenueByProduct = $this->statisticsService->getRevenueByProduct($timeFrame, $startDate, $endDate);
            $revenueChart = $this->statisticsService->getRevenueByTimeFrameForChart($timeFrame);
            $tableData = $this->statisticsService->getOrderStatusTableData($timeFrame, $startDate, $endDate);
            $pieChartData = $this->statisticsService->getOrderStatusData($timeFrame, $startDate, $endDate);

            return view('admin.index', compact('totalProducts', 'totalOrders', 'totalRevenue', 'revenueByProduct', 'revenueChart', 'timeFrame', 'timeFrameText', 'tableData', 'pieChartData'));
        }
    }

}
