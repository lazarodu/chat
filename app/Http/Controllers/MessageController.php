<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
  public function __construct()
  {
  }
  public function index()
  {
    return view('messages.index');
  }
}
