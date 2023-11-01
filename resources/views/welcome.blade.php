<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {{-- Google Font --}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;800&family=Open+Sans:wght@400;800&family=Poppins:wght@400;800&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  
  {{-- Tailwind Style --}}
  @vite('resources/css/app.css')
</head>
<body>
  {{-- Navigation --}}
  <nav class="py-7 px-10 mx-10 md:px-2 item-center" x-data="{navOpen:false,dropDown:false}">
    <div class="container mx-auto">
      <div class="flex justify-between item-center mx-2 xl:mx-10 h-6 md:h-8">
        <img src="{{ asset('/asset/logo-farmasi.png') }}" alt="" class="order-1 sm:order-2 w-60 h-12" >
        <img @click="navOpen=!navOpen"  src="{{ asset('/asset/burgericon.png') }}" alt="" class="lg:hidden order-2 sm:order-1 cursor-pointer">

        <div class="order-3 hidden sm:block">
          <a href="/login" class="grow px-4 py-2 font-bold text-grey rounded-3xl text-sm ">Login</a>
          <a href="/register" class="grow bg-blue-trans px-4 py-2 font-bold text-blue-solid rounded-3xl border border-blue-solid text-sm">Daftar</a>
        </div>
      </div>
    </div>
    <div x-show="navOpen"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 scale-90"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-90"
         x-data="{open:false}" class="lg:hidden fixed bottom-0 right-0 left-0 w-full p-4 border border-top bg-white z-10">
      <ul class="flex justify-between">
        <li>
          <button  class="flex justify-center flex-col items-center text-base gap-1">
            <ion-icon name="home-outline" class="text-2xl text-blue-solid"></ion-icon>
            <span class="text-base font-bold text-blue-solid">Home</span>
          </button>
        </li>
        <li>
          <button  class="flex justify-center flex-col items-center text-base gap-1">
            <ion-icon name="newspaper-outline" class="text-2xl"></ion-icon>
            <span class="text-base font-bold text-grey opacity-50 ">News</span>
          </button>
        </li>
        <li>
          <button  class="flex justify-center flex-col items-center text-base gap-1">
            <ion-icon name="cube-outline" class="text-2xl"></ion-icon>
            <span class="text-base font-bold text-grey opacity-50">Produk</span>
          </a>
        </li>
        <li>
          <button  class="flex justify-center flex-col items-center text-base gap-1">
            <ion-icon name="cart-outline" class="text-2xl"></ion-icon>
            <span class="text-base font-bold text-grey opacity-50">Pemesanan</span>
          </button>
        </li>
        <li>
          <button  class="flex justify-center flex-col items-center text-base gap-1">
            <ion-icon name="call-outline" class="text-2xl"></ion-icon>
            <span class="text-base font-bold text-grey opacity-50">Kontak</span>
          </button>
        </li>
        <li>
          <button  @click="open=!open" 
            class="flex justify-center flex-col items-center text-base gap-1">
            <ion-icon name="menu-outline" class="text-2xl"></ion-icon>
            <span class="text-base font-bold text-grey opacity-50">More</span>
          </button>
        </li>
      </ul>
      <div x-show="open"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 scale-90"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-90"
      class="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-4 w-3/4 bg-white p-5">
        <button class="grow px-4 py-2 font-bold text-grey rounded-3xl text-sm ">Login</button>
        <button class="grow bg-blue-trans px-4 py-2 font-bold text-blue-solid rounded-3xl border border-blue-solid text-sm">Sign Up</button>
      </div>
    </div>
  </nav>
  
  {{-- Hero Section --}}
  <section>
    <div class="container mx-auto ">
      <div class="grid grid-cols-12  xl:mx-10 items-center">
        <div class="col-span-12 pl-10 lg:col-span-6 lg:order-1 green order-2 mt-10">
          <h1 class="font-bold text-[35px] leading-tight ">Discover <span class="text-blue-solid">Healt Secrets</span>  at the <span class="text-blue-solid">24/7 Pharmacy</span></h1>
          <p class="mt-4 leading-tight">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis esse nulla nesciunt?</p>
        </div>
        <div class="col-span-12 mx-auto lg:mx-0 lg:col-span-6 lg:order-2 order-1"><img class="md:h-full  float-right" src="{{ asset('/asset/pharmatic.png') }}" alt=""></div>
        <div class="col-span-12 mx-10 my-10 order-3">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center">
            <div class="relative mx-auto text-center">
              <img class="h-54 w-54 lg:h-52 lg:w-52 rounded-lg cursor-pointer" src="{{ asset('image/dokter.png') }}" alt="">
              <p class="absolute bottom-8 md:bottom-4 lg:bottom-3 px-4 py-1 right-6 lg:right-2 bg-black text-white rounded-2xl text-md lg:text-xs cursor-pointer">Buka Praktek Dokter</p>
            </div>
            <div class="relative mx-auto">
              <img class="h-54 w-54 lg:h-52 lg:w-52 rounded-lg" src="{{ asset('image/obat.png') }}" alt="">
              <p class="absolute bottom-8 md:bottom-4 lg:bottom-3 px-4 py-1 right-6 lg:right-2 bg-black text-white rounded-2xl text-md lg:text-xs cursor-pointer">Obat Komplit</p>
            </div>
            <div class="relative mx-auto">
              <img class="h-54 w-54 lg:h-52 lg:w-52 rounded-lg" src="{{ asset('image/lab.png') }}" alt="">
              <p class="absolute bottom-8 md:bottom-4 lg:bottom-3 px-4 py-1 right-6 lg:right-2 bg-black text-white rounded-2xl text-md lg:text-xs cursor-pointer">Cek Lab</p>
            </div>
            <div class="relative mx-auto hover:cursor-pointer">
              <img class="h-54 w-54 lg:h-52 lg:w-52 rounded-lg " src="{{ asset('image/cek kesehatan.png') }}" alt="">
              <p class="absolute bottom-8 md:bottom-4 lg:bottom-3 px-4 py-1 right-2 lg:right-2 bg-black text-white rounded-2xl text-md lg:text-xs cursor-pointer">Cek Kesehatan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</body>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script src="//unpkg.com/alpinejs" defer></script>
</html>