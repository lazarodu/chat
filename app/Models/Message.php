<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;
  protected $fillable = ["message", "user_id"];

  public function userEnvio()
  {
    return $this->belongsTo("App\Models\User", "user_id", "id");
  }

  public function users()
  {
    return $this->belongsToMany("App\Models\User", "user_messages", "message_id", "user_id");
  }

  public function messageUser()
  {
    return $this->hasMany("App\Models\UserMessage", "message_id", "id");
  }
}
