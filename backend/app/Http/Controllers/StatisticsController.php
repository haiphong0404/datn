<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;


class StatisticsController extends Controller
{   
    protected $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    public function index()
    {
        $totalProducts = $this->statisticsService->getTotalProducts();
        $totalOrders = $this->statisticsService->gettotalOrders();
        $totalRevenue = $this->statisticsService->gettotalRevenue();
        $revenueByProduct = $this->statisticsService->getRevenueByProduct();
        $revenueByMonth = $this->statisticsService->getRevenueByMonth();

        return view('admin.index', compact('totalProducts', 'totalOrders', 'totalRevenue', 'revenueByProduct', 'revenueByMonth'));
    }
}
