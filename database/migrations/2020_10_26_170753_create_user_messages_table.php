<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserMessagesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('user_messages', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')
        ->onUpdate('cascade')->onDelete('cascade');
      $table->foreignId('message_id')->constrained('messages')
        ->onUpdate('cascade')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('user_messages');
  }
}
