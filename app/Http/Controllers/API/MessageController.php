<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Models\Message;
use App\Models\UserMessage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $messages = Message::whereDoesntHave('messageUser', function (Builder $query) {
      $query->where('user_id', '=', Auth::user()->id);
    })->with(['userEnvio'])->get();
    return new DataResource($messages);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
      "message" => "required|max:255",
    ]);
    $message = new Message([
      "message" => $request->get('message'),
      "user_id" => Auth::user()->id
    ]);
    $message->save();
    return new DataResource($message);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $message = Message::findOrFail($id);
    $user = new UserMessage([
      "user_id" => Auth::user()->id,
      "message_id" => $message->id
    ]);
    $user->save();
    return new DataResource($message);
  }
}
