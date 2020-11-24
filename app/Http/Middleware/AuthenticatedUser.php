<?php

namespace App\Http\Middleware;

use App\Models\Message;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;

class AuthenticatedUser
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    $messages = Message::whereDoesntHave('messageUser', function (Builder $query) {
      $query->where('user_id', '=', Auth::user()->id);
    })->with(['userEnvio'])->get();
    View::share('message', $messages);
    return $next($request);
  }
}
