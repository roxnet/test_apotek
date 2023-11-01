<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_member', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id')->constrained('users','id')->onUpdate('cascade')->onDelete('cascade')->nullable();
            $table->string('no_telp',50)->nullable();
            $table->date('tgl_lahir')->nullable();
            $table->string('jk',1)->nullable();
            $table->string('no_ktp',16)->nullable();
            $table->string('photo',150)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_member');
    }
};
