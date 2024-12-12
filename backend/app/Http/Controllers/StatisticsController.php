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
            $totalRevenue = $this->statisticsService->gettotalRevenue();
            $revenueByProduct = $this->statisticsService->getRevenueByProduct();
            $revenueChart = $this->statisticsService->getRevenueByTimeFrameForChart($timeFrame);

            return view('admin.index', compact('totalProducts', 'totalOrders', 'totalRevenue', 'revenueByProduct', 'revenueChart', 'timeFrame', 'timeFrameText'));
        }
    }
    // public function indexStaff()
    // {
    //     return view('admin.index');
    // }
}
