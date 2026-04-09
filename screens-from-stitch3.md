<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400;1,700&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-bright": "#353a36",
                      "tertiary-fixed-dim": "#e9c349",
                      "on-surface-variant": "#bec9c1",
                      "primary-fixed": "#a0f4ca",
                      "on-secondary-fixed": "#281903",
                      "outline-variant": "#3f4943",
                      "surface-tint": "#84d7af",
                      "on-background": "#dfe4dd",
                      "on-error": "#690005",
                      "tertiary-fixed": "#ffe088",
                      "outline": "#88938c",
                      "inverse-surface": "#dfe4dd",
                      "error": "#ffb4ab",
                      "on-primary-fixed-variant": "#005137",
                      "tertiary-container": "#cba72f",
                      "on-secondary-fixed-variant": "#574329",
                      "surface-container": "#1c211c",
                      "on-tertiary-fixed-variant": "#574500",
                      "error-container": "#93000a",
                      "surface": "#101511",
                      "primary": "#84d7af",
                      "surface-container-lowest": "#0a0f0b",
                      "secondary": "#dfc29f",
                      "on-surface": "#dfe4dd",
                      "surface-container-highest": "#313631",
                      "primary-fixed-dim": "#84d7af",
                      "on-primary": "#003825",
                      "tertiary": "#e9c349",
                      "inverse-on-surface": "#2c322d",
                      "surface-variant": "#313631",
                      "on-secondary-container": "#d0b492",
                      "on-tertiary-container": "#4e3d00",
                      "on-tertiary": "#3c2f00",
                      "on-secondary": "#3f2d15",
                      "on-tertiary-fixed": "#241a00",
                      "on-primary-fixed": "#002114",
                      "background": "#101511",
                      "surface-container-low": "#181d19",
                      "secondary-fixed": "#fcdeba",
                      "primary-container": "#006747",
                      "secondary-container": "#5a452b",
                      "on-error-container": "#ffdad6",
                      "inverse-primary": "#0b6c4b",
                      "on-primary-container": "#8fe2ba",
                      "surface-dim": "#101511",
                      "secondary-fixed-dim": "#dfc29f",
                      "surface-container-high": "#262b27"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "fontFamily": {
                      "headline": ["Newsreader", "serif"],
                      "body": ["Manrope", "sans-serif"],
                      "label": ["Manrope", "sans-serif"]
              }
            },
          },
        }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; }
        .font-serif { font-family: 'Newsreader', serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background min-h-screen pb-24">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-gradient-to-b from-[#1c211c] to-transparent flex justify-between items-center px-6 h-16 w-full shadow-none bg-[#101511] dark:bg-[#101511]">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
<img alt="User Profile" data-alt="Close up portrait of a confident man in his 30s with a clean groomed beard wearing a premium polo shirt in soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwjByiWUMrwkk8Nn8uWwRxtrvvf4o6KX5j_1H4Io9ABIVnzUB4xV7ov0gc64Stob7ThuSVv_qPeHdsLTIQbhjszS3YKWZcM7gCdBMbHmq4N1W8dMPZr49ClZBnDylALoaD5c-bhSupzst_l9fTxT-q-mSPRDrWSf6BiPRKEKZ8eHHY0LhlPFSmQkIDc7VDAlXiQrckZiGt2lusvqgbuFLAM8VXDNKeQK3lj-i4bSOxN-ZATFGPeZGnViwQMjgTweCEvU46jfBR7Gw"/>
</div>
</div>
<h1 class="font-serif italic tracking-tighter text-[#dfe4dd] uppercase text-2xl">STICKS</h1>
<button class="text-[#84d7af] hover:opacity-80 transition-opacity active:transition-transform scale-95">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</header>
<main class="pt-20 px-4 space-y-8 max-w-2xl mx-auto">
<!-- Rivalry Module -->
<section>
<div class="flex justify-between items-end mb-4">
<h2 class="font-serif italic text-2xl tracking-tight text-on-surface">Active Rivalry</h2>
<span class="font-label uppercase text-[10px] tracking-widest text-primary font-bold">Season 2024</span>
</div>
<div class="relative overflow-hidden rounded-lg bg-surface-container border border-outline-variant/10 shadow-2xl">
<!-- Background decorative element -->
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
<div class="p-6 relative z-10">
<div class="flex justify-between items-center mb-8">
<div class="flex flex-col items-center gap-3">
<div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-transparent">
<img alt="You" class="w-full h-full rounded-full object-cover border-2 border-surface" data-alt="Professional headshot of a golfer in a dark green polo shirt against a blurred club background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkuYGczpB26AyOQp433GrqP5PeKT6pUq-Q3kX3gRnUW1qGfg1VeO9oKtHa06rQ_xVyd0SyAoBFy9zkM4GsY48hFOUWOLpDne77TWpJ2VCYnWwPVxDA8DxhBqztEbTTj01Wyq_mEk3RyoqiWu6cr5-wZ2M0KqFQng2CaPIJnNYmsvO9_P98C5nultkZLKKaQHjuBeOeeSjZkdaoFwB3EJPj-fZ2eowPIr2q6rK-9-rb7RneXRAQN3SsxPtcGGmqwTyiHAbHvIqe1FA"/>
</div>
<span class="font-label uppercase text-[10px] font-extrabold tracking-tighter text-on-surface-variant">You</span>
</div>
<div class="text-center flex flex-col items-center">
<div class="font-serif italic text-4xl text-on-surface mb-1">12-8-2</div>
<div class="bg-primary-container/20 px-3 py-1 rounded-full border border-primary/20">
<span class="font-label text-[10px] font-bold text-primary tracking-widest uppercase">Lead +4</span>
</div>
</div>
<div class="flex flex-col items-center gap-3">
<div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-tertiary to-transparent">
<img alt="Tyler" class="w-full h-full rounded-full object-cover border-2 border-surface" data-alt="Close-up portrait of a competitive athlete with focused expression, dark hair, wearing premium athletic gear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0-RxC_6pfvyjFfFx64ESaLHEmP9_3Je1nG_do5-BCuNFFC-LleYP4lmoJ5mlCJd72dvJHvjvH4Ybmc1g5dAXt2VEzwF-g-AmZvI69UJ8adRhiMYQGoSoZfjBbhdRjlKvmJ9dTSFmO6VpgaESyBC8XHEVw93SXIlMASowd9JJ4gop1d2s19FwrgvKueDXFma3Aya38r6eGPZqz5AH6WcsGGsuzIMXZxYfvT9gqwftwR3lRAH_geI4eu8qXQGdPCUHEFy6L6DLtJNs"/>
</div>
<span class="font-label uppercase text-[10px] font-extrabold tracking-tighter text-on-surface-variant">Tyler</span>
</div>
</div>
<div class="bg-surface-container-low rounded p-4 flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="history">history</span>
<div class="flex flex-col">
<span class="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Last Round</span>
<span class="text-xs text-on-surface font-medium">Ocean Dunes • Tyler (+2)</span>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-sm" data-icon="chevron_right">chevron_right</span>
</div>
</div>
</div>
</section>
<!-- Live Activity Feed -->
<section class="space-y-6">
<div class="flex items-center gap-2">
<div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(132,215,175,0.6)]"></div>
<h2 class="font-serif italic text-2xl tracking-tight text-on-surface">Live Activity</h2>
</div>
<div class="space-y-4">
<!-- Leaderboard Move -->
<div class="bg-surface-container-low rounded-lg p-5 border-l-2 border-primary">
<div class="flex justify-between items-start mb-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="trending_up">trending_up</span>
</div>
<div>
<h3 class="text-sm font-bold text-on-surface"><span class="text-primary">Tyler</span> moved to 1st</h3>
<p class="text-[11px] text-on-surface-variant font-medium uppercase tracking-tight">Club Championship</p>
</div>
</div>
<span class="text-[10px] text-outline italic">2m ago</span>
</div>
<div class="flex items-center gap-2 text-xs text-primary font-bold">
<span class="material-symbols-outlined text-sm" data-icon="arrow_upward">arrow_upward</span>
<span>2 positions jumped this round</span>
</div>
</div>
<!-- Bet Settlement -->
<div class="bg-surface-container-low rounded-lg p-5 border-l-2 border-tertiary">
<div class="flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary" data-icon="payments">payments</span>
</div>
<div>
<h3 class="text-sm font-bold text-on-surface"><span class="text-secondary">Jake</span> won <span class="text-tertiary text-base">$24</span></h3>
<p class="text-[11px] text-on-surface-variant font-medium uppercase tracking-tight">Game: Skins at Pine Valley</p>
</div>
</div>
<div class="text-[10px] text-outline italic">15m ago</div>
</div>
</div>
<!-- Crew Post -->
<div class="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/5">
<div class="p-4 flex items-center gap-3">
<img alt="Crew member" class="w-8 h-8 rounded-full border border-primary/20" data-alt="Young professional woman smiling with a golf course in the background, warm natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLmvJeos_gWAUh6ouTpDEqdeDvvU_pA6Nr9XqDVn0ck_269rGtRNz3UtXPN4VrtRM_RIzKRL8AiKlKsixtMsSc11SAXtTnnj13XcH_HsFdc1YlJwT6n1VHKzyjtyWtkxlGLRuQDJBrygLylsRi0OXMOXXhN2zfAsvSKBOdTcx3oKw2oQr26Ap1dbiZHuAk-v028yYNuqqmpC4NCDfre7TMsh1qyB3quqPP6OY2BvbeV_3PAKZzoi9VJPqUeYN-OqSF0kYfsHfsy1E"/>
<div>
<p class="text-xs font-bold text-on-surface">The Sunday Crew</p>
<p class="text-[10px] text-on-surface-variant font-medium">Bandon Dunes, OR</p>
</div>
</div>
<div class="relative aspect-video">
<img alt="Golf Course" class="w-full h-full object-cover" data-alt="Breathtaking wide shot of a coastal golf course at sunset, emerald greens meeting dark blue ocean waves, dramatic golden sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwTPU1pyjo6xVfIZo1gF2mblRdv1jVgXlDsvpI3a2QcF8uD8uKV_RpxxCpGD6z2wdlRXlfEfpxwAKzpTyzpsOCaKvzLHMvs6C6PO4RoRoJrkG-aNFeR__JuCJj0uqbiobe-tSA9O2VfgIojgMrn2LL_DhYjuRLQ8H52lJgCm7pkG-TjjyzSMdMZKu0q2RaDQYgF-rcY6da26sJUx0KTEhcirKWxtjoCQFFjVQFx6kNiG4KZuOj3jP-ONtNhOfYRBcseLOgURnq2xU"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div class="absolute bottom-4 left-4 right-4">
<p class="text-xs italic text-on-primary-container leading-relaxed">"Pure vibes at the 16th. The wind was howling but the sticks were hot today. Best round of the season."</p>
</div>
</div>
<div class="p-4 flex justify-between items-center">
<div class="flex gap-4">
<button class="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="favorite">favorite</span>
<span class="text-[10px] font-bold">42</span>
</button>
<button class="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="chat_bubble">chat_bubble</span>
<span class="text-[10px] font-bold">12</span>
</button>
</div>
<button class="text-on-surface-variant">
<span class="material-symbols-outlined text-lg" data-icon="share">share</span>
</button>
</div>
</div>
</div>
</section>
</main>
<!-- FAB -->
<button class="fixed bottom-24 right-6 w-14 h-14 rounded-lg bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-[0_8px_24px_rgba(0,56,37,0.4)] z-40 active:scale-90 duration-200">
<span class="material-symbols-outlined text-on-primary text-2xl" data-icon="add">add</span>
</button>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-6 bg-[#101511]/70 backdrop-blur-xl border-t border-[#3f4943]/20 shadow-[0_-8px_24px_rgba(0,56,37,0.4)] rounded-t-lg">
<a class="flex flex-col items-center justify-center text-[#84d7af] transition-colors duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-sans uppercase tracking-[0.05rem] text-[10px] font-bold mt-1">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] hover:text-[#84d7af] transition-all active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="golf_course">golf_course</span>
<span class="font-sans uppercase tracking-[0.05rem] text-[10px] font-bold mt-1">Play</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] hover:text-[#84d7af] transition-all active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span class="font-sans uppercase tracking-[0.05rem] text-[10px] font-bold mt-1">Leaderboard</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] hover:text-[#84d7af] transition-all active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="font-sans uppercase tracking-[0.05rem] text-[10px] font-bold mt-1">Bets</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] hover:text-[#84d7af] transition-all active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-sans uppercase tracking-[0.05rem] text-[10px] font-bold mt-1">Profile</span>
</a>
</nav>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Golf with Stakes</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,200..800;6..72,1,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-fixed": "#a0f4ca",
                    "primary-container": "#006747",
                    "on-tertiary-container": "#4e3d00",
                    "on-error": "#690005",
                    "surface": "#101511",
                    "tertiary-container": "#cba72f",
                    "tertiary-fixed-dim": "#e9c349",
                    "primary-fixed-dim": "#84d7af",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "error": "#ffb4ab",
                    "secondary": "#dfc29f",
                    "on-primary": "#003825",
                    "on-secondary-fixed-variant": "#574329",
                    "surface-container-low": "#181d19",
                    "inverse-on-surface": "#2c322d",
                    "on-surface": "#dfe4dd",
                    "on-error-container": "#ffdad6",
                    "on-primary-fixed-variant": "#005137",
                    "surface-variant": "#313631",
                    "outline": "#88938c",
                    "error-container": "#93000a",
                    "on-secondary-container": "#d0b492",
                    "background": "#101511",
                    "surface-container-highest": "#313631",
                    "primary": "#84d7af",
                    "on-surface-variant": "#bec9c1",
                    "on-secondary": "#3f2d15",
                    "surface-bright": "#353a36",
                    "surface-container": "#1c211c",
                    "surface-tint": "#84d7af",
                    "on-tertiary-fixed": "#241a00",
                    "on-background": "#dfe4dd",
                    "inverse-surface": "#dfe4dd",
                    "tertiary": "#e9c349",
                    "secondary-fixed": "#fcdeba",
                    "surface-dim": "#101511",
                    "surface-container-lowest": "#0a0f0b",
                    "outline-variant": "#3f4943",
                    "on-primary-fixed": "#002114",
                    "on-primary-container": "#8fe2ba",
                    "inverse-primary": "#0b6c4b",
                    "secondary-fixed-dim": "#dfc29f",
                    "secondary-container": "#5a452b",
                    "on-tertiary": "#3c2f00",
                    "on-secondary-fixed": "#281903",
                    "tertiary-fixed": "#ffe088"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Newsreader", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .topo-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231c211c' stroke-width='1'%3E%3Cpath d='M800 562.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 462.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 362.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 262.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 162.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3C/g%3E%3C/svg%3E");
            background-size: cover;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface font-body min-h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- Splash Screen Container -->
<main class="relative flex flex-col items-center justify-between min-h-screen w-full px-8 py-16 topo-bg">
<!-- Subtle radial glow for atmospheric depth -->
<div class="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,103,71,0.08)_0%,transparent_60%)] pointer-events-none"></div>
<!-- Top spacing/TopAppBar Placeholder -->
<header class="fixed top-0 w-full flex justify-center items-center px-6 py-8 w-full">
<!-- As per JSON structure for STICKS wordmark -->
<span class="font-headline text-3xl font-bold text-on-surface tracking-tighter opacity-0">STICKS</span>
</header>
<!-- Center Content -->
<div class="flex-1 flex flex-col items-center justify-center text-center z-10 space-y-4">
<h1 class="font-headline text-7xl md:text-9xl text-primary-container tracking-widest font-extrabold" data-alt="minimalist elegant typography of the word STICKS in deep forest green">
                STICKS
            </h1>
<p class="font-label text-sm md:text-base text-on-surface-variant tracking-[0.4em] uppercase font-medium">
                Golf is more fun with stakes.
            </p>
<div class="h-1 w-12 bg-primary-container/30 mt-8"></div>
</div>
<!-- Bottom Actions (Navigation Shell Influence) -->
<div class="w-full max-w-sm flex flex-col space-y-4 z-10">
<!-- Primary Action -->
<button class="group relative overflow-hidden bg-gradient-to-br from-primary-container to-primary text-on-primary font-label font-bold py-5 rounded-lg transition-transform active:scale-[0.98]">
<span class="relative z-10 uppercase tracking-widest text-sm">Get Started</span>
<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
</button>
<!-- Secondary Action (Ghost/Outline) -->
<button class="font-label font-bold py-5 rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors active:scale-[0.98]">
<span class="uppercase tracking-widest text-sm">Sign In</span>
</button>
</div>
<!-- Semantic Shell: BottomNavBar Suppression is active (Transactional/Splash screen) -->
<!-- No BottomNavBar rendered as per UX Goal rules for focus journeys -->
</main>
<!-- Visual Identity Polish: Fixed Branding Element -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
<span class="material-symbols-outlined text-on-surface text-2xl">sports_golf</span>
</div>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Golf with Stakes</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,ital,wght@6..72,0,200..800;6..72,1,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-fixed": "#a0f4ca",
                    "primary-container": "#006747",
                    "on-tertiary-container": "#4e3d00",
                    "on-error": "#690005",
                    "surface": "#101511",
                    "tertiary-container": "#cba72f",
                    "tertiary-fixed-dim": "#e9c349",
                    "primary-fixed-dim": "#84d7af",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "error": "#ffb4ab",
                    "secondary": "#dfc29f",
                    "on-primary": "#003825",
                    "on-secondary-fixed-variant": "#574329",
                    "surface-container-low": "#181d19",
                    "inverse-on-surface": "#2c322d",
                    "on-surface": "#dfe4dd",
                    "on-error-container": "#ffdad6",
                    "on-primary-fixed-variant": "#005137",
                    "surface-variant": "#313631",
                    "outline": "#88938c",
                    "error-container": "#93000a",
                    "on-secondary-container": "#d0b492",
                    "background": "#101511",
                    "surface-container-highest": "#313631",
                    "primary": "#84d7af",
                    "on-surface-variant": "#bec9c1",
                    "on-secondary": "#3f2d15",
                    "surface-bright": "#353a36",
                    "surface-container": "#1c211c",
                    "surface-tint": "#84d7af",
                    "on-tertiary-fixed": "#241a00",
                    "on-background": "#dfe4dd",
                    "inverse-surface": "#dfe4dd",
                    "tertiary": "#e9c349",
                    "secondary-fixed": "#fcdeba",
                    "surface-dim": "#101511",
                    "surface-container-lowest": "#0a0f0b",
                    "outline-variant": "#3f4943",
                    "on-primary-fixed": "#002114",
                    "on-primary-container": "#8fe2ba",
                    "inverse-primary": "#0b6c4b",
                    "secondary-fixed-dim": "#dfc29f",
                    "secondary-container": "#5a452b",
                    "on-tertiary": "#3c2f00",
                    "on-secondary-fixed": "#281903",
                    "tertiary-fixed": "#ffe088"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Newsreader", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .topo-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231c211c' stroke-width='1'%3E%3Cpath d='M800 562.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 462.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 362.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 262.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 162.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3C/g%3E%3C/svg%3E");
            background-size: cover;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface font-body min-h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- Splash Screen Container -->
<main class="relative flex flex-col items-center justify-between min-h-screen w-full px-8 py-16 topo-bg">
<!-- Subtle radial glow for atmospheric depth -->
<div class="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,103,71,0.08)_0%,transparent_60%)] pointer-events-none"></div>
<!-- Top spacing/TopAppBar Placeholder -->
<header class="fixed top-0 w-full flex justify-center items-center px-6 py-8 w-full">
<!-- As per JSON structure for STICKS wordmark -->
<span class="font-headline text-3xl font-bold text-on-surface tracking-tighter opacity-0">STICKS</span>
</header>
<!-- Center Content -->
<div class="flex-1 flex flex-col items-center justify-center text-center z-10 space-y-4">
<h1 class="font-headline text-7xl md:text-9xl text-primary-container tracking-widest font-extrabold" data-alt="minimalist elegant typography of the word STICKS in deep forest green">
                STICKS
            </h1>
<p class="font-label text-sm md:text-base text-on-surface-variant tracking-[0.4em] uppercase font-medium">
                Golf is more fun with stakes.
            </p>
<div class="h-1 w-12 bg-primary-container/30 mt-8"></div>
</div>
<!-- Bottom Actions (Navigation Shell Influence) -->
<div class="w-full max-w-sm flex flex-col space-y-4 z-10">
<!-- Primary Action -->
<button class="group relative overflow-hidden bg-gradient-to-br from-primary-container to-primary text-on-primary font-label font-bold py-5 rounded-lg transition-transform active:scale-[0.98]">
<span class="relative z-10 uppercase tracking-widest text-sm">Get Started</span>
<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
</button>
<!-- Secondary Action (Ghost/Outline) -->
<button class="font-label font-bold py-5 rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors active:scale-[0.98]">
<span class="uppercase tracking-widest text-sm">Sign In</span>
</button>
</div>
<!-- Semantic Shell: BottomNavBar Suppression is active (Transactional/Splash screen) -->
<!-- No BottomNavBar rendered as per UX Goal rules for focus journeys -->
</main>
<!-- Visual Identity Polish: Fixed Branding Element -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
<span class="material-symbols-outlined text-on-surface text-2xl">sports_golf</span>
</div>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Sign Up</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-tertiary-fixed": "#241a00",
                    "on-error": "#690005",
                    "outline": "#88938c",
                    "on-primary": "#003825",
                    "on-background": "#dfe4dd",
                    "inverse-on-surface": "#2c322d",
                    "secondary-fixed-dim": "#dfc29f",
                    "surface-bright": "#353a36",
                    "primary-fixed-dim": "#84d7af",
                    "on-tertiary-fixed-variant": "#574500",
                    "inverse-surface": "#dfe4dd",
                    "secondary": "#dfc29f",
                    "on-primary-fixed-variant": "#005137",
                    "secondary-fixed": "#fcdeba",
                    "on-secondary-fixed": "#281903",
                    "on-secondary-container": "#d0b492",
                    "surface-dim": "#101511",
                    "primary-container": "#006747",
                    "surface-container-lowest": "#0a0f0b",
                    "primary": "#84d7af",
                    "inverse-primary": "#0b6c4b",
                    "surface-container-low": "#181d19",
                    "surface-variant": "#313631",
                    "surface-container-high": "#262b27",
                    "outline-variant": "#3f4943",
                    "tertiary-fixed-dim": "#e9c349",
                    "surface-tint": "#84d7af",
                    "on-surface-variant": "#bec9c1",
                    "on-tertiary-container": "#4e3d00",
                    "on-surface": "#dfe4dd",
                    "on-secondary": "#3f2d15",
                    "on-primary-container": "#8fe2ba",
                    "secondary-container": "#5a452b",
                    "on-secondary-fixed-variant": "#574329",
                    "tertiary": "#e9c349",
                    "surface-container-highest": "#313631",
                    "surface-container": "#1c211c",
                    "background": "#101511",
                    "on-tertiary": "#3c2f00",
                    "tertiary-fixed": "#ffe088",
                    "primary-fixed": "#a0f4ca",
                    "error": "#ffb4ab",
                    "tertiary-container": "#cba72f",
                    "on-primary-fixed": "#002114",
                    "surface": "#101511",
                    "error-container": "#93000a",
                    "on-error-container": "#ffdad6"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Newsreader", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .premium-blur {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body antialiased min-h-screen flex flex-col">
<!-- Top Navigation Anchor (As per Shared Components JSON) -->
<header class="bg-[#101511] flex items-center justify-between px-6 py-4 w-full fixed top-0 z-50">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af]">close</span>
</div>
<div class="text-lg font-bold uppercase tracking-[0.2em] text-[#dfe4dd] font-serif italic">JOIN THE CLUB</div>
<div class="w-6"></div> <!-- Spacer for symmetry -->
</header>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col items-center justify-center px-8 pt-24 pb-12 w-full max-w-md mx-auto relative overflow-hidden">
<!-- Subtle Ambient Background Texture -->
<div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,#006747_0%,transparent_70%)]"></div>
<!-- Hero Branding Section -->
<div class="text-center mb-16 relative z-10">
<h1 class="text-6xl font-headline italic tracking-tight text-on-surface mb-2">Sticks</h1>
<p class="text-on-surface-variant font-label text-xs uppercase tracking-[0.3em] font-medium opacity-80">The Private Reserve</p>
</div>
<!-- Auth Action Container -->
<div class="w-full space-y-4 relative z-10">
<!-- Apple Auth -->
<button class="w-full h-14 bg-[#000000] text-white flex items-center justify-center gap-3 rounded hover:opacity-90 transition-opacity">
<svg class="w-5 h-5 fill-current" viewbox="0 0 384 512">
<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
</svg>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Apple</span>
</button>
<!-- Google Auth -->
<button class="w-full h-14 bg-white text-background flex items-center justify-center gap-3 rounded hover:bg-[#f5f5f5] transition-colors">
<svg class="w-5 h-5" viewbox="0 0 48 48">
<path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"></path>
<path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"></path>
<path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" fill="#FBBC05"></path>
<path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"></path>
<path d="M0 0h48v48H0z" fill="none"></path>
</svg>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Google</span>
</button>
<!-- Separator -->
<div class="flex items-center gap-4 py-4">
<div class="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
<span class="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">or</span>
<div class="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
</div>
<!-- Phone Auth -->
<button class="w-full h-14 bg-surface-container text-on-surface flex items-center justify-center gap-3 rounded hover:bg-surface-container-high transition-colors premium-blur border border-outline-variant/10">
<span class="material-symbols-outlined text-xl">smartphone</span>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Phone</span>
</button>
<!-- Email Auth -->
<button class="w-full h-14 bg-surface-container text-on-surface flex items-center justify-center gap-3 rounded hover:bg-surface-container-high transition-colors premium-blur border border-outline-variant/10">
<span class="material-symbols-outlined text-xl">mail</span>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Email</span>
</button>
</div>
<!-- Footer / Policy -->
<footer class="mt-auto pt-12 text-center w-full relative z-10">
<p class="text-[11px] text-on-surface-variant font-body leading-relaxed max-w-[280px] mx-auto opacity-70">
                By creating an account, you agree to our 
                <a class="text-on-surface underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all" href="#">Terms of Service</a> 
                and 
                <a class="text-on-surface underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all" href="#">Privacy Policy</a>.
            </p>
</footer>
</main>
<!-- Decorative Corner Elements -->
<div class="fixed bottom-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
<img class="w-full h-full object-cover grayscale" data-alt="close-up of a premium leather golf bag with intricate stitching and dark green highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEnU8L2WBo6Kc1OgdnFfM-4i4A1VCcOpT9699e6P3918A9glJZWZ1gvBbOuESTktBVV_JIbD2qGEPSTre8Cf06Gy4wgQ2y1VlZK8sCrYnpgASHlhvvvN8iSf2BzZHAtY4wUp00QCf0uguNM1NMjonEsnzZ5fV2_PHrvNoJgAU2XBkk8WiBzSPORSVr1XwLH2zJ43Ldj-zRmdIsS09D0lgY2bc7ryi-J96Tv4X7tRwOK-T1QNcQ-fNv4HUgsEczwf2taO8mFUmwrTE"/>
</div>
<div class="fixed top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
<img class="w-full h-full object-cover" data-alt="macro shot of freshly mown golf green grass with dew drops in soft morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAExdafRUpd1gem-JGKN1ZcUdQBh3EU8ZWdVFWqhyrI8aPtkEfEBSOcCuzRQT06FqcLKZRIS9Z-TcGV7GYFHqqKQ_owDEBWPmRpJN6SaS7wId9n7i56NvTdtx0oxkF6n-ctmcG9Wkmp9v1bTdZF5EEsjytiN8QWzouyRv18ErsLDMn0nWff2-CUCydWBo3bKEeA3I_xLOFfMoe0SeOjCEHlEoZBriT7uFGkWz_AFcMvux1XNOLLk3i1eKYdDnD6IhBRfv7Y-CKgz40"/>
</div>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Onboarding Profile Basics</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-secondary-container": "#d0b492",
                        "secondary-container": "#5a452b",
                        "error-container": "#93000a",
                        "primary-container": "#006747",
                        "on-background": "#dfe4dd",
                        "secondary-fixed": "#fcdeba",
                        "primary-fixed-dim": "#84d7af",
                        "on-primary": "#003825",
                        "on-error": "#690005",
                        "primary-fixed": "#a0f4ca",
                        "surface-container": "#1c211c",
                        "error": "#ffb4ab",
                        "on-tertiary-container": "#4e3d00",
                        "surface-variant": "#313631",
                        "surface-bright": "#353a36",
                        "surface-container-lowest": "#0a0f0b",
                        "background": "#101511",
                        "on-primary-container": "#8fe2ba",
                        "on-error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#574500",
                        "surface-container-high": "#262b27",
                        "secondary-fixed-dim": "#dfc29f",
                        "secondary": "#dfc29f",
                        "primary": "#84d7af",
                        "tertiary-container": "#cba72f",
                        "on-secondary-fixed": "#281903",
                        "inverse-primary": "#0b6c4b",
                        "surface-container-low": "#181d19",
                        "surface-dim": "#101511",
                        "surface": "#101511",
                        "surface-container-highest": "#313631",
                        "on-secondary-fixed-variant": "#574329",
                        "tertiary-fixed": "#ffe088",
                        "tertiary": "#e9c349",
                        "on-surface-variant": "#bec9c1",
                        "on-surface": "#dfe4dd",
                        "outline-variant": "#3f4943",
                        "on-primary-fixed": "#002114",
                        "inverse-on-surface": "#2c322d",
                        "tertiary-fixed-dim": "#e9c349",
                        "on-secondary": "#3f2d15",
                        "surface-tint": "#84d7af",
                        "on-tertiary": "#3c2f00",
                        "inverse-surface": "#dfe4dd",
                        "outline": "#88938c",
                        "on-tertiary-fixed": "#241a00",
                        "on-primary-fixed-variant": "#005137"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "fontFamily": {
                        "headline": ["Newsreader"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #101511;
        }
        .serif-italic {
            font-family: 'Newsreader', serif;
            font-style: italic;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface min-h-screen flex flex-col items-center">
<!-- TopAppBar Section - Shared Component Mapping -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 w-full bg-[#101511] bg-gradient-to-b from-[#181d19] to-transparent">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af] hover:opacity-80 transition-opacity scale-95 duration-200 cursor-pointer">close</span>
</div>
<div class="flex flex-col items-center">
<h1 class="text-xl font-bold text-[#dfe4dd] font-serif italic tracking-tight">Profile Basics</h1>
</div>
<div class="w-8"></div> <!-- Spacer for balance -->
</header>
<main class="w-full max-w-md px-6 pt-24 pb-32 flex-grow flex flex-col">
<!-- Progress Indicator -->
<div class="mb-12">
<div class="flex justify-between items-end mb-2">
<span class="text-xs font-label uppercase tracking-widest text-secondary">Step 1 of 5</span>
<span class="text-xs font-label text-on-surface-variant">Personal Identity</span>
</div>
<div class="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary-container w-1/5"></div>
</div>
</div>
<!-- Avatar Upload Section -->
<div class="flex flex-col items-center mb-10">
<div class="relative group">
<div class="w-32 h-32 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/20 hover:border-primary/40 transition-colors cursor-pointer overflow-hidden shadow-2xl">
<div class="flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-4xl mb-1">photo_camera</span>
<span class="text-[10px] font-label uppercase tracking-tighter">Upload</span>
</div>
<!-- Subtle Glass Texture Overlay -->
<div class="absolute inset-0 bg-gradient-to-tr from-primary-container/5 to-transparent pointer-events-none"></div>
</div>
<!-- Premium Accent -->
<div class="absolute -bottom-1 -right-1 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">add</span>
</div>
</div>
<p class="mt-4 text-sm text-on-surface-variant font-label italic text-center">Add a profile photo for the clubhouse</p>
</div>
<!-- Form Section -->
<div class="space-y-6">
<div class="relative">
<label class="block text-[10px] font-label uppercase tracking-widest text-secondary mb-1.5 ml-1">First Name</label>
<input class="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary/60 rounded-lg py-4 px-4 text-on-surface placeholder:text-on-surface-variant/30 transition-all font-body" placeholder="e.g. Alister" type="text"/>
</div>
<div class="relative">
<label class="block text-[10px] font-label uppercase tracking-widest text-secondary mb-1.5 ml-1">Last Name</label>
<input class="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary/60 rounded-lg py-4 px-4 text-on-surface placeholder:text-on-surface-variant/30 transition-all font-body" placeholder="e.g. Mackenzie" type="text"/>
</div>
<div class="pt-4 px-1">
<p class="text-xs text-on-surface-variant/60 leading-relaxed">
                    Your name will be visible to other members during match booking and on the live leaderboards.
                </p>
</div>
</div>
<!-- Decorative Background Element -->
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
<div class="absolute -top-[10%] -right-[10%] w-[60%] h-[40%] bg-primary-container/10 blur-[120px] rounded-full"></div>
<div class="absolute -bottom-[5%] -left-[5%] w-[40%] h-[30%] bg-secondary-container/10 blur-[100px] rounded-full"></div>
</div>
</main>
<!-- Bottom Action Area -->
<div class="fixed bottom-0 w-full max-w-md px-6 pb-10 pt-6 bg-gradient-to-t from-background via-background to-transparent">
<button class="w-full py-4 bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold rounded-lg shadow-xl shadow-primary-container/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
<span class="font-label uppercase tracking-widest text-sm">Continue</span>
<span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks | Handicap Onboarding</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-secondary-container": "#d0b492",
                      "tertiary-container": "#cba72f",
                      "on-tertiary-fixed": "#241a00",
                      "on-error": "#690005",
                      "error": "#ffb4ab",
                      "tertiary-fixed": "#ffe088",
                      "on-error-container": "#ffdad6",
                      "secondary-fixed-dim": "#dfc29f",
                      "surface-container-high": "#262b27",
                      "secondary": "#dfc29f",
                      "primary": "#84d7af",
                      "on-tertiary": "#3c2f00",
                      "primary-fixed-dim": "#84d7af",
                      "surface-container-low": "#181d19",
                      "on-surface": "#dfe4dd",
                      "secondary-fixed": "#fcdeba",
                      "on-primary": "#003825",
                      "surface-bright": "#353a36",
                      "inverse-on-surface": "#2c322d",
                      "outline": "#88938c",
                      "surface-container-highest": "#313631",
                      "surface-container": "#1c211c",
                      "inverse-primary": "#0b6c4b",
                      "on-primary-container": "#8fe2ba",
                      "tertiary-fixed-dim": "#e9c349",
                      "background": "#101511",
                      "tertiary": "#e9c349",
                      "on-tertiary-container": "#4e3d00",
                      "surface-dim": "#101511",
                      "primary-container": "#006747",
                      "surface": "#101511",
                      "error-container": "#93000a",
                      "on-secondary": "#3f2d15",
                      "on-primary-fixed": "#002114",
                      "on-background": "#dfe4dd",
                      "surface-variant": "#313631",
                      "primary-fixed": "#a0f4ca",
                      "on-secondary-fixed": "#281903",
                      "outline-variant": "#3f4943",
                      "secondary-container": "#5a452b",
                      "surface-tint": "#84d7af",
                      "surface-container-lowest": "#0a0f0b",
                      "on-secondary-fixed-variant": "#574329",
                      "on-surface-variant": "#bec9c1",
                      "on-tertiary-fixed-variant": "#574500",
                      "on-primary-fixed-variant": "#005137",
                      "inverse-surface": "#dfe4dd"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "fontFamily": {
                      "headline": ["Newsreader", "serif"],
                      "body": ["Manrope", "sans-serif"],
                      "label": ["Manrope", "sans-serif"]
              }
            },
          }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .premium-border {
            border: 1px solid rgba(233, 195, 73, 0.4);
        }
        .ghost-border {
            border: 1px solid rgba(63, 73, 67, 0.2);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex items-center px-4 bg-[#101511] dark:bg-[#101511] h-16">
<div class="w-full h-16 flex items-center justify-between px-2">
<button class="text-[#84d7af] opacity-60 hover:bg-[#1c211c] transition-colors duration-300 p-2 rounded-lg">
<span class="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
</button>
<div class="text-[#dfe4dd] font-headline font-black text-xl tracking-tight">STICKS</div>
<button class="text-[#84d7af] opacity-60 hover:bg-[#1c211c] transition-colors duration-300 p-2 rounded-lg">
<span class="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 mt-16 px-6 pb-32 max-w-2xl mx-auto w-full flex flex-col">
<!-- Progress Indicator -->
<div class="mt-8 mb-10">
<div class="flex items-center justify-between mb-3">
<span class="font-label uppercase text-[10px] tracking-[0.15rem] text-on-surface-variant font-bold">Step 2 of 5</span>
<span class="font-label uppercase text-[10px] tracking-[0.15rem] text-primary">Onboarding</span>
</div>
<div class="h-[2px] w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary w-2/5 shadow-[0_0_8px_rgba(132,215,175,0.4)]"></div>
</div>
</div>
<!-- Hero Section -->
<div class="mb-12">
<h1 class="font-headline italic text-4xl md:text-5xl text-on-surface leading-tight tracking-tight mb-4">
                Establish Your Standing
            </h1>
<p class="text-on-surface-variant text-lg font-body leading-relaxed max-w-md">
                A verified handicap is the currency of the clubhouse. Choose how you’d like to track your game.
            </p>
</div>
<!-- Selection Grid -->
<div class="space-y-6">
<!-- Premium Option: GHIN Sync -->
<div class="group relative overflow-hidden bg-surface-container-low premium-border rounded-lg p-6 transition-all duration-300 hover:bg-surface-container cursor-pointer shadow-[0_8px_24px_rgba(0,56,37,0.1)]">
<div class="flex items-start justify-between">
<div class="flex-1">
<div class="flex items-center gap-3 mb-2">
<span class="material-symbols-outlined text-tertiary" data-icon="verified" style="font-variation-settings: 'FILL' 1;">verified</span>
<h3 class="font-headline font-bold text-xl text-on-surface">Link my GHIN Handicap</h3>
</div>
<p class="text-on-surface-variant text-sm leading-snug mb-6 pr-8">
                            Auto-sync your official USGA index for verified competitive play and elite clubhouse access.
                        </p>
<!-- Placeholder for GHIN Logo / Brand Area -->
<div class="bg-surface-container-highest rounded-lg h-12 w-32 flex items-center justify-center opacity-60">
<span class="font-label font-extrabold text-[#dfe4dd] tracking-tighter italic">GHIN</span>
</div>
</div>
<div class="h-6 w-6 rounded-full border-2 border-tertiary flex items-center justify-center">
<div class="h-3 w-3 bg-tertiary rounded-full"></div>
</div>
</div>
<!-- Decorative Corner -->
<div class="absolute -top-6 -right-6 w-12 h-12 bg-tertiary/10 rotate-45"></div>
</div>
<!-- Manual Option -->
<div class="bg-surface-container-lowest ghost-border rounded-lg p-6 transition-all duration-300 hover:bg-surface-container cursor-pointer">
<div class="flex items-start justify-between mb-6">
<div class="flex-1">
<div class="flex items-center gap-3 mb-2">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="edit_note">edit_note</span>
<h3 class="font-headline font-bold text-xl text-on-surface">Enter Manually</h3>
</div>
<p class="text-on-surface-variant text-sm leading-snug">
                            Provide your current estimated index. Note: Unverified handicaps may limit tournament eligibility.
                        </p>
</div>
<div class="h-6 w-6 rounded-full border-2 border-outline-variant opacity-40"></div>
</div>
<div class="relative">
<label class="absolute -top-2 left-3 px-1 bg-surface-container-lowest text-secondary font-label text-[10px] uppercase tracking-wider font-bold">Handicap Index</label>
<input class="w-full bg-transparent border border-outline-variant/30 rounded-lg py-4 px-4 text-2xl font-headline text-on-surface focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-on-surface-variant/20 transition-all outline-none" placeholder="e.g. 12.4" step="0.1" type="number"/>
</div>
</div>
<!-- No Handicap Link -->
<div class="pt-4 flex justify-center">
<button class="text-on-surface-variant font-label text-xs uppercase tracking-widest hover:text-primary transition-colors py-2 px-4 border-b border-outline-variant/20">
                    No handicap yet
                </button>
</div>
</div>
</main>
<!-- Bottom Action Bar (Replaces BottomNavBar for Transactional Flow) -->
<div class="fixed bottom-0 left-0 w-full bg-[#101511]/80 backdrop-blur-3xl z-50 px-6 py-8 flex flex-col gap-4">
<button class="w-full py-5 rounded-lg bg-gradient-to-tr from-primary-container to-primary text-on-primary font-label font-bold uppercase tracking-widest text-sm shadow-[0_8px_24px_rgba(0,56,37,0.4)] active:scale-[0.98] transition-all duration-150">
            Continue
        </button>
<div class="flex justify-center items-center gap-2 text-on-surface-variant/40">
<span class="material-symbols-outlined text-sm" data-icon="lock" style="font-variation-settings: 'FILL' 1;">lock</span>
<span class="font-label text-[10px] uppercase tracking-tighter">Secure USGA verification</span>
</div>
</div>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Select Home Course</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#2c322d",
                    "on-primary-fixed-variant": "#005137",
                    "secondary-fixed-dim": "#dfc29f",
                    "outline": "#88938c",
                    "tertiary-container": "#cba72f",
                    "background": "#101511",
                    "on-primary-fixed": "#002114",
                    "surface-dim": "#101511",
                    "surface": "#101511",
                    "on-primary": "#003825",
                    "on-background": "#dfe4dd",
                    "surface-container": "#1c211c",
                    "error": "#ffb4ab",
                    "primary-container": "#006747",
                    "outline-variant": "#3f4943",
                    "surface-tint": "#84d7af",
                    "on-secondary-fixed-variant": "#574329",
                    "tertiary-fixed": "#ffe088",
                    "on-secondary-fixed": "#281903",
                    "surface-container-low": "#181d19",
                    "surface-container-highest": "#313631",
                    "secondary": "#dfc29f",
                    "primary": "#84d7af",
                    "on-tertiary-container": "#4e3d00",
                    "on-secondary-container": "#d0b492",
                    "on-primary-container": "#8fe2ba",
                    "on-error-container": "#ffdad6",
                    "secondary-container": "#5a452b",
                    "on-surface": "#dfe4dd",
                    "surface-bright": "#353a36",
                    "on-surface-variant": "#bec9c1",
                    "on-secondary": "#3f2d15",
                    "surface-container-lowest": "#0a0f0b",
                    "surface-variant": "#313631",
                    "inverse-primary": "#0b6c4b",
                    "primary-fixed-dim": "#84d7af",
                    "on-tertiary": "#3c2f00",
                    "on-error": "#690005",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "secondary-fixed": "#fcdeba",
                    "inverse-surface": "#dfe4dd",
                    "tertiary": "#e9c349",
                    "on-tertiary-fixed": "#241a00",
                    "tertiary-fixed-dim": "#e9c349",
                    "error-container": "#93000a",
                    "primary-fixed": "#a0f4ca"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Newsreader", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .brass-gradient {
            background: linear-gradient(135deg, #dfc29f 0%, #5a452b 100%);
        }
        .augusta-gradient {
            background: linear-gradient(45deg, #006747 0%, #84d7af 100%);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body min-h-screen flex flex-col">
<!-- TopAppBar -->
<nav class="w-full sticky top-0 bg-[#101511] dark:bg-[#101511] z-40">
<div class="flex items-center px-6 h-16 w-full justify-between">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af] cursor-pointer hover:opacity-80 transition-opacity active:scale-95 duration-200">arrow_back</span>
<span class="text-lg font-serif text-[#dfe4dd] font-serif italic tracking-tight">Select Home Course</span>
</div>
<div class="flex items-center gap-1">
<span class="text-[10px] uppercase tracking-widest font-sans text-secondary">Step 3</span>
<span class="text-[10px] uppercase tracking-widest font-sans text-on-surface-variant">of 5</span>
</div>
</div>
</nav>
<!-- Main Content -->
<main class="flex-1 px-6 pt-4 pb-32 max-w-2xl mx-auto w-full">
<!-- Progress Bar (Visual) -->
<div class="w-full h-1 bg-surface-container-high rounded-full mb-8 flex overflow-hidden">
<div class="h-full w-3/5 augusta-gradient rounded-full"></div>
</div>
<header class="mb-10">
<h1 class="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Find your clubhouse.</h1>
<p class="text-on-surface-variant text-sm font-light">Select the course you play most often to tailor your experience and find local matches.</p>
</header>
<!-- Search Bar -->
<div class="relative mb-12">
<div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline text-xl">search</span>
</div>
<input class="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary/50 transition-colors font-label placeholder:text-on-surface-variant/50" placeholder="Search courses near you" type="text"/>
</div>
<!-- Course Suggestions -->
<div class="space-y-4">
<div class="flex items-center justify-between mb-4">
<h3 class="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">Nearby Suggestions</h3>
<span class="text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:opacity-80">View Map</span>
</div>
<!-- Selected Card: Cypress Hollow -->
<div class="group relative overflow-hidden bg-surface-container border-2 border-primary-container p-5 rounded-lg flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]">
<div class="flex items-center gap-4">
<div class="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Golf course fairway" class="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" data-alt="lush green golf course fairway with dramatic shadows from tall pine trees under a moody afternoon sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmwr0Jf1V22u8P3NeSqWml0jveQwE03TRsfm3z8OMrzBpjIO1rSO0-YBfe_aKRt-x8t9q4SfFYt-y8rNBZE8s8an6VpEKVpAvwfkHcVAvh-D_wTrpITbXUzRWtlMMAV86BssEwTNYoVI_oT_bRN9ShCXxMlkLAjIymx_xfiZapjATQ7x9QScsM12bPm3H-AnpYY1qiKigYr8jo-g0qBrDTR0NFj2HCKZBrtiOkMcZb0NX8CsY2L8lrIOLZD9adYXTvHY7VIA1ItlM"/>
</div>
<div>
<h4 class="font-headline text-xl text-on-surface italic">Cypress Hollow</h4>
<p class="text-on-surface-variant text-xs uppercase tracking-wider">Pebble Beach, CA</p>
</div>
</div>
<div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container">
<span class="material-symbols-outlined text-on-primary-container text-lg" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
</div>
<!-- Card: Oakmont Country Club -->
<div class="group relative overflow-hidden bg-surface-container-low hover:bg-surface-container border border-transparent p-5 rounded-lg flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]">
<div class="flex items-center gap-4">
<div class="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Golf club approach" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" data-alt="pristine golf course green with white sand bunkers and a luxury clubhouse in the distant background under clear sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoF9vFSwJ7iJpM3UMQ7i5OcbkOZD6THvM7N2Dw-ekqWOqm-EZe8TcYABYICuji8ycAoibCiwDrBZ2qYAXPAySQE6oVzAuQfHM3tgJzew7qs09Q2ArRDwoOQb8AdOSm8-Ud9KpJOhUKJbQqvW7eMpXoAeEFqQ6X8-jbCZ6IlRibTxTpgodSkUaEZae2B_MzYH4bVznx7TDXbyR1kQNZinPN3xD6xb9GNzo4Rvs7f1YfR5nkr6rIQKu2y10E5h8JbcJQhXDe67z2Yn8"/>
</div>
<div>
<h4 class="font-headline text-xl text-on-surface italic">Oakmont Country Club</h4>
<p class="text-on-surface-variant text-xs uppercase tracking-wider">Oakmont, PA</p>
</div>
</div>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">add_circle</span>
</div>
<!-- Card: Pine Valley -->
<div class="group relative overflow-hidden bg-surface-container-low hover:bg-surface-container border border-transparent p-5 rounded-lg flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]">
<div class="flex items-center gap-4">
<div class="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Golf forest" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" data-alt="dense forest surrounding a golf course with warm sunlight filtering through the trees onto the turf" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwf9kT5Ni5vL21pZuC_Ee9TnnJaWQznB_qQm7QvsbFR5YMwa8cRcS2FYWT1PxBrtICKL6qubMLAuMtRtN3XDMPEYY6Cpdh-xUZuzca7DP5hFVcgKVKS2Wrs4eIF4WiaB4D5z4nFlViD4hrzMkGP5MWjlpY2dR0JAtOv-KgLNpexlvhJXgc8Q7_aoNQx-HSHwlWkTMkH3l8OwAwl4IJ0Z0GWM9nTRJdwUhAQpMY5XeCQUodSzWKsfZ-sxMDDCPCJjlnfU5pr_upSaI"/>
</div>
<div>
<h4 class="font-headline text-xl text-on-surface italic">Pine Valley</h4>
<p class="text-on-surface-variant text-xs uppercase tracking-wider">Pine Hill, NJ</p>
</div>
</div>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">add_circle</span>
</div>
<!-- Card: Winged Foot -->
<div class="group relative overflow-hidden bg-surface-container-low hover:bg-surface-container border border-transparent p-5 rounded-lg flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]">
<div class="flex items-center gap-4">
<div class="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Golf course detail" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" data-alt="close up of a golf ball on a tee with blurred green grass and a luxury leather golf bag in the background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBezlNou9pW-74KP8Eo-trfmNFy0pssSDfzWQikauDZoFB-M1GLjVDcSpitKL-sEdD15fhrIdSJz1In--iZAbbGfswvG4cPwEDUs5NHiG5jt2ER9jz9bJafQGAwfffwpBlXdBiFXFdwtn_v6bzOKMUrLlWEvAEnweZPFOzQEs6eBirbExHNEEpvUtFxT_gWL84NK66Owa_LynRNMQBPuRGIyRWxHTJtFIeDy8lnpuC2Hi6aOlopUJJuH6_S-LZ8KO6V8MB7pVeB7tY"/>
</div>
<div>
<h4 class="font-headline text-xl text-on-surface italic">Winged Foot</h4>
<p class="text-on-surface-variant text-xs uppercase tracking-wider">Mamaroneck, NY</p>
</div>
</div>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">add_circle</span>
</div>
</div>
<!-- Empty state/Browse link -->
<div class="mt-8 text-center">
<button class="text-secondary text-sm font-label uppercase tracking-widest border-b border-secondary/30 pb-1 hover:border-secondary transition-all">
                Don't see your course? Browse All
            </button>
</div>
</main>
<!-- BottomNavBar (Action Shell) -->
<footer class="fixed bottom-0 left-0 w-full flex justify-between items-center px-8 pb-8 pt-4 bg-[#101511]/70 dark:bg-[#101511]/70 backdrop-blur-xl z-50 rounded-t-lg shadow-[0_-8px_24px_rgba(0,56,37,0.4)]">
<div class="flex-1">
<p class="text-[10px] uppercase tracking-widest font-sans text-on-surface-variant">Selected</p>
<p class="text-sm font-serif italic text-primary">Cypress Hollow</p>
</div>
<div class="flex items-center gap-4">
<button class="text-[#bec9c1] px-4 py-2 hover:brightness-110 transition-all active:scale-98 text-[10px] uppercase tracking-widest font-sans">
                Skip
            </button>
<button class="bg-gradient-to-tr from-[#006747] to-[#84d7af] text-[#101511] rounded-sm px-8 py-3 font-bold flex items-center gap-2 hover:brightness-110 transition-all active:scale-98">
                Continue
                <span class="material-symbols-outlined text-base">arrow_forward</span>
</button>
</div>
</footer>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
                  "surface-container-lowest": "#0a0f0b",
                  "on-primary": "#003825",
                  "on-primary-fixed-variant": "#005137",
                  "secondary-fixed-dim": "#dfc29f",
                  "on-surface-variant": "#bec9c1",
                  "on-secondary-fixed-variant": "#574329",
                  "on-primary-fixed": "#002114",
                  "surface-container": "#1c211c",
                  "on-error-container": "#ffdad6",
                  "surface-tint": "#84d7af",
                  "on-tertiary-fixed-variant": "#574500",
                  "on-error": "#690005",
                  "primary-fixed-dim": "#84d7af",
                  "background": "#101511",
                  "on-background": "#dfe4dd",
                  "inverse-on-surface": "#2c322d",
                  "primary-container": "#006747",
                  "secondary-fixed": "#fcdeba",
                  "on-primary-container": "#8fe2ba",
                  "error": "#ffb4ab",
                  "outline-variant": "#3f4943",
                  "surface-variant": "#313631",
                  "primary": "#84d7af",
                  "outline": "#88938c",
                  "tertiary": "#e9c349",
                  "primary-fixed": "#a0f4ca",
                  "on-secondary-fixed": "#281903",
                  "secondary": "#dfc29f",
                  "on-tertiary-fixed": "#241a00",
                  "error-container": "#93000a",
                  "surface-container-low": "#181d19",
                  "on-secondary-container": "#d0b492",
                  "tertiary-fixed": "#ffe088",
                  "surface-container-high": "#262b27",
                  "inverse-surface": "#dfe4dd",
                  "surface-dim": "#101511",
                  "secondary-container": "#5a452b",
                  "surface-container-highest": "#313631",
                  "tertiary-fixed-dim": "#e9c349",
                  "surface": "#101511",
                  "on-tertiary": "#3c2f00",
                  "on-secondary": "#3f2d15",
                  "inverse-primary": "#0b6c4b",
                  "on-tertiary-container": "#4e3d00",
                  "surface-bright": "#353a36",
                  "on-surface": "#dfe4dd",
                  "tertiary-container": "#cba72f"
          },
          "borderRadius": {
                  "DEFAULT": "0.125rem",
                  "lg": "0.25rem",
                  "xl": "0.5rem",
                  "full": "0.75rem"
          },
          "fontFamily": {
                  "headline": ["Newsreader", "serif"],
                  "body": ["Manrope", "sans-serif"],
                  "label": ["Manrope", "sans-serif"]
          }
        },
      },
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .selected-glow {
      box-shadow: 0 0 20px rgba(0, 103, 71, 0.4);
      border-color: #006747 !important;
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body min-h-screen flex flex-col">
<!-- TopAppBar from JSON -->
<header class="bg-[#101511] flex justify-between items-center px-6 py-4 w-full docked full-width top-0">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af] cursor-pointer hover:opacity-80 transition-opacity scale-95 duration-150" data-icon="arrow_back">arrow_back</span>
<span class="text-lg font-serif text-[#dfe4dd]">Step 4 of 5</span>
</div>
<h1 class="font-serif italic tracking-tight text-[#84d7af]">Step 4 of 5</h1>
<div class="w-6"></div> <!-- Spacer for centering logic if needed -->
</header>
<div class="bg-[#181d19] h-[2px] w-full block"></div>
<main class="flex-grow flex flex-col px-6 pt-12 pb-24 max-w-2xl mx-auto w-full">
<!-- Hero Headline -->
<section class="mb-12">
<h2 class="font-headline text-5xl md:text-6xl text-on-background leading-tight mb-4 italic">
        How do you play?
      </h2>
<p class="text-on-surface-variant text-lg max-w-md">
        Select all that apply to your game style. This helps us match you with the right foursomes and tournaments.
      </p>
</section>
<!-- Selection Tiles - Bento Style -->
<div class="grid grid-cols-1 gap-4">
<!-- Competitive Tile -->
<button class="group relative flex items-center p-6 bg-surface-container-low rounded-lg border border-transparent transition-all duration-300 text-left hover:bg-surface-container selected-glow">
<div class="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-primary-container/10 rounded-full text-primary mr-6">
<span class="material-symbols-outlined text-4xl" data-icon="trophy" style="font-variation-settings: 'FILL' 1;">trophy</span>
</div>
<div class="flex-grow">
<h3 class="font-headline text-2xl text-on-surface mb-1">Competitive</h3>
<p class="text-on-surface-variant text-sm font-medium">I play to win. Every stroke counts.</p>
</div>
<div class="flex-shrink-0 ml-4">
<div class="w-6 h-6 rounded-full border-2 border-primary bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-sm text-on-primary-container font-bold" data-icon="check">check</span>
</div>
</div>
</button>
<!-- Casual Tile -->
<button class="group relative flex items-center p-6 bg-surface-container-low rounded-lg border border-outline-variant/20 transition-all duration-300 text-left hover:bg-surface-container">
<div class="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-surface-container-high rounded-full text-on-surface-variant mr-6 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-4xl" data-icon="flag">flag</span>
</div>
<div class="flex-grow">
<h3 class="font-headline text-2xl text-on-surface mb-1">Casual</h3>
<p class="text-on-surface-variant text-sm font-medium">I play for fun. Bets optional.</p>
</div>
<div class="flex-shrink-0 ml-4">
<div class="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
</button>
<!-- Social Tile -->
<button class="group relative flex items-center p-6 bg-surface-container-low rounded-lg border border-outline-variant/20 transition-all duration-300 text-left hover:bg-surface-container">
<div class="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-surface-container-high rounded-full text-on-surface-variant mr-6 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-4xl" data-icon="group">group</span>
</div>
<div class="flex-grow">
<h3 class="font-headline text-2xl text-on-surface mb-1">Social</h3>
<p class="text-on-surface-variant text-sm font-medium">It's about the crew. Golf is the excuse.</p>
</div>
<div class="flex-shrink-0 ml-4">
<div class="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
</button>
</div>
<!-- Background Decorative Element -->
<div class="fixed bottom-0 right-0 -z-10 opacity-10 pointer-events-none overflow-hidden">
<img alt="" class="w-[600px] grayscale" data-alt="Close-up artistic shot of a dimpled golf ball sitting on a dark green putting surface with moody atmospheric lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT0vqYhdWchJDSyAqvl3uvr93uRMfsew3IE6toKIYMkWnY2OKV4oGcgo_v-HYRWDUn1bBHgjRsukRJqo3JLJmYWt6Vs7zpSvsYwyA4hN7UML3favQMR4mULZC3YbOCPGeyCYlAzohXU1IWdThCMsHCY10-IO9e4eNI-loD87bOCsjEIvuTYQVhtffRNDiWgjj1_vkMNhsrVLPTz7x-NWzDqDQaAYdZQ0B9o5oOz1oV5RY7kPUR9aTNcoGlyGjZikBWHReADXHhZ1A"/>
</div>
</main>
<!-- Sticky Bottom CTA Section -->
<footer class="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background to-transparent">
<div class="max-w-2xl mx-auto flex flex-col gap-4">
<button class="w-full py-4 bg-gradient-to-r from-primary-container to-primary rounded-lg shadow-lg shadow-primary-container/40 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]">
<span class="font-label font-bold text-on-primary text-sm tracking-widest uppercase">Continue</span>
<span class="material-symbols-outlined text-on-primary text-sm group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</button>
<div class="flex justify-center items-center gap-1">
<div class="h-1 w-8 bg-primary rounded-full"></div>
<div class="h-1 w-8 bg-primary rounded-full"></div>
<div class="h-1 w-8 bg-primary rounded-full"></div>
<div class="h-1 w-12 bg-primary rounded-full"></div>
<div class="h-1 w-8 bg-surface-container-highest rounded-full"></div>
</div>
</div>
</footer>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,700;1,6..72,500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary": "#e9c349",
                    "background": "#101511",
                    "inverse-on-surface": "#2c322d",
                    "error": "#ffb4ab",
                    "outline-variant": "#3f4943",
                    "on-tertiary-container": "#4e3d00",
                    "surface-dim": "#101511",
                    "on-secondary": "#3f2d15",
                    "surface-container-low": "#181d19",
                    "tertiary-fixed": "#ffe088",
                    "on-error-container": "#ffdad6",
                    "error-container": "#93000a",
                    "tertiary-fixed-dim": "#e9c349",
                    "on-secondary-fixed": "#281903",
                    "surface-tint": "#84d7af",
                    "outline": "#88938c",
                    "on-background": "#dfe4dd",
                    "inverse-primary": "#0b6c4b",
                    "on-surface": "#dfe4dd",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-lowest": "#0a0f0b",
                    "primary-fixed-dim": "#84d7af",
                    "on-secondary-container": "#d0b492",
                    "primary-container": "#006747",
                    "surface-container": "#1c211c",
                    "on-tertiary": "#3c2f00",
                    "inverse-surface": "#dfe4dd",
                    "on-primary-container": "#8fe2ba",
                    "primary-fixed": "#a0f4ca",
                    "surface-bright": "#353a36",
                    "primary": "#84d7af",
                    "secondary-container": "#5a452b",
                    "on-tertiary-fixed": "#241a00",
                    "secondary": "#dfc29f",
                    "on-primary-fixed": "#002114",
                    "on-error": "#690005",
                    "surface-variant": "#313631",
                    "tertiary-container": "#cba72f",
                    "on-secondary-fixed-variant": "#574329",
                    "on-primary": "#003825",
                    "surface-container-high": "#262b27",
                    "secondary-fixed": "#fcdeba",
                    "surface-container-highest": "#313631",
                    "secondary-fixed-dim": "#dfc29f",
                    "on-surface-variant": "#bec9c1",
                    "surface": "#101511",
                    "on-tertiary-fixed-variant": "#574500"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Newsreader", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .topo-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100' stroke='%231c211c' fill='transparent'/%3E%3Cpath d='M0 150 Q 50 100, 100 150 T 200 150 T 300 150 T 400 150' stroke='%23181d19' fill='transparent'/%3E%3Cpath d='M0 200 Q 50 150, 100 200 T 200 200 T 300 200 T 400 200' stroke='%231c211c' fill='transparent'/%3E%3Cpath d='M0 250 Q 50 200, 100 250 T 200 250 T 300 250 T 400 250' stroke='%23181d19' fill='transparent'/%3E%3C/svg%3E");
            background-repeat: repeat;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col overflow-x-hidden">
<!-- TopAppBar -->
<header class="fixed top-0 w-full bg-[#101511] dark:bg-[#101511] flex justify-between items-center px-6 h-16 w-full z-50">
<div class="flex items-center gap-4">
<button class="text-[#84d7af] hover:opacity-80 transition-opacity active:scale-95 transition-transform">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<span class="font-serif font-medium tracking-tight text-[#dfe4dd]">Step 5 of 5</span>
</div>
<div class="flex items-center">
<button class="text-[#84d7af] font-bold hover:opacity-80 transition-opacity active:scale-95 transition-transform uppercase text-xs tracking-widest">
                Skip
            </button>
</div>
</header>
<main class="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-32 topo-bg relative overflow-hidden">
<!-- Background Vignette -->
<div class="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-60"></div>
<!-- Content Canvas -->
<div class="w-full max-w-md mx-auto relative z-10 text-center">
<div class="mb-12">
<h1 class="font-headline text-5xl md:text-6xl text-on-surface font-medium leading-[1.1] mb-4 tracking-tight">
                    Find your crew.
                </h1>
<p class="text-on-surface-variant font-body text-lg max-w-[280px] mx-auto opacity-80 leading-relaxed">
                    Connect your accounts to see which members are already on the green.
                </p>
</div>
<div class="space-y-4">
<!-- Button 1: Sync Contacts -->
<button class="group w-full flex items-center p-5 bg-surface-container-low border border-outline-variant/10 rounded-xl hover:bg-surface-container transition-all duration-300 active:scale-[0.98] text-left">
<div class="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mr-5 shadow-inner">
<span class="material-symbols-outlined text-2xl" data-weight="fill" style="font-variation-settings: 'FILL' 1;">contacts</span>
</div>
<div class="flex-grow">
<h3 class="text-on-surface font-bold text-lg mb-0.5 group-hover:text-primary transition-colors">Sync Contacts</h3>
<p class="text-on-surface-variant text-sm font-medium">12 of your contacts are on Sticks</p>
</div>
<div class="text-tertiary/60 group-hover:text-tertiary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</button>
<!-- Button 2: Connect Instagram -->
<button class="group w-full flex items-center p-5 bg-surface-container-low border border-outline-variant/10 rounded-xl hover:bg-surface-container transition-all duration-300 active:scale-[0.98] text-left">
<div class="w-14 h-14 rounded-full bg-surface-container-high border border-tertiary/20 flex items-center justify-center text-tertiary mr-5">
<span class="material-symbols-outlined text-2xl">camera</span>
</div>
<div class="flex-grow">
<h3 class="text-on-surface font-bold text-lg mb-0.5 group-hover:text-primary transition-colors">Connect Instagram</h3>
<p class="text-on-surface-variant text-sm font-medium">34 people you follow are on Sticks</p>
</div>
<div class="text-tertiary/60 group-hover:text-tertiary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</button>
<!-- Button 3: Connect X / Twitter -->
<button class="group w-full flex items-center p-5 bg-surface-container-low border border-outline-variant/10 rounded-xl hover:bg-surface-container transition-all duration-300 active:scale-[0.98] text-left">
<div class="w-14 h-14 rounded-full bg-surface-container-high border border-tertiary/20 flex items-center justify-center text-on-surface mr-5">
<span class="material-symbols-outlined text-2xl">alternate_email</span>
</div>
<div class="flex-grow">
<h3 class="text-on-surface font-bold text-lg mb-0.5 group-hover:text-primary transition-colors">Connect X / Twitter</h3>
<p class="text-on-surface-variant text-sm font-medium">8 people you follow are on Sticks</p>
</div>
<div class="text-tertiary/60 group-hover:text-tertiary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</button>
</div>
<!-- Bottom Link -->
<div class="mt-12">
<button class="text-on-surface-variant hover:text-primary transition-colors font-label uppercase text-[10px] tracking-[0.2em] font-bold">
                    Skip for now
                </button>
</div>
</div>
<!-- Decorative Elements -->
<div class="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full"></div>
<div class="absolute -top-20 -right-20 w-64 h-64 bg-tertiary-container/5 blur-[100px] rounded-full"></div>
</main>
<!-- Bottom Navigation Suppressed for Onboarding Flow per "Destination Rule" -->
<!-- Hero Image Placeholder for Contextual Background Texture -->
<div class="hidden">
<img alt="" data-alt="abstract close up of professional golf club textures with dark greens and metallic highlights in a moody studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFbwykCThq3cr0MkyGtk2z3hWfoRMF9oIy4002vB-WgbCg4KDvag3cWbz2mDeIMvl8tnpXBEh69MZaFzmaUjhS2fmsluNyNNJjvsyHBfb1_NTAL7IZU9s0eBReQOTInCviyh5-KU0UQBGntKomIzYB1GvcpyDx1q1hD8X-OMTIQuA1hEVmQZvwtjMG8Z6uKB0ZaTX07eUhR3roqo89ZaIyQTEvGD_-xbwmWAxfCkI_3xyZ4gEyRPszUuZ8oZW4_r-1OlDf1MTezyk"/>
</div>
</body></html>
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Notification Permissions</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400;1,700&amp;family=Manrope:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "outline-variant": "#3f4943",
                        "on-background": "#dfe4dd",
                        "background": "#101511",
                        "primary-fixed-dim": "#84d7af",
                        "secondary": "#dfc29f",
                        "on-error-container": "#ffdad6",
                        "on-secondary-fixed-variant": "#574329",
                        "surface-container-lowest": "#0a0f0b",
                        "on-surface-variant": "#bec9c1",
                        "surface-bright": "#353a36",
                        "surface-container-low": "#181d19",
                        "primary": "#84d7af",
                        "on-tertiary": "#3c2f00",
                        "tertiary-container": "#cba72f",
                        "surface": "#101511",
                        "primary-fixed": "#a0f4ca",
                        "outline": "#88938c",
                        "primary-container": "#006747",
                        "on-tertiary-container": "#4e3d00",
                        "surface-tint": "#84d7af",
                        "inverse-surface": "#dfe4dd",
                        "surface-dim": "#101511",
                        "on-tertiary-fixed-variant": "#574500",
                        "on-error": "#690005",
                        "tertiary": "#e9c349",
                        "on-surface": "#dfe4dd",
                        "surface-container-high": "#262b27",
                        "error-container": "#93000a",
                        "error": "#ffb4ab",
                        "on-secondary-fixed": "#281903",
                        "tertiary-fixed": "#ffe088",
                        "tertiary-fixed-dim": "#e9c349",
                        "on-tertiary-fixed": "#241a00",
                        "on-primary-container": "#8fe2ba",
                        "inverse-on-surface": "#2c322d",
                        "on-primary": "#003825",
                        "secondary-container": "#5a452b",
                        "inverse-primary": "#0b6c4b",
                        "surface-container": "#1c211c",
                        "on-primary-fixed": "#002114",
                        "on-secondary": "#3f2d15",
                        "on-primary-fixed-variant": "#005137",
                        "surface-variant": "#313631",
                        "surface-container-highest": "#313631",
                        "secondary-fixed-dim": "#dfc29f",
                        "secondary-fixed": "#fcdeba",
                        "on-secondary-container": "#d0b492"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "fontFamily": {
                        "headline": ["Newsreader", "serif"],
                        "body": ["Manrope", "sans-serif"],
                        "label": ["Manrope", "sans-serif"]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .hero-gradient {
            background: radial-gradient(circle at center, rgba(132, 215, 175, 0.08) 0%, rgba(16, 21, 17, 0) 70%);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col overflow-x-hidden">
<!-- TopAppBar from JSON Logic -->
<header class="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 w-full bg-[#101511] dark:bg-[#101511] bg-gradient-to-b from-[#101511] to-transparent">
<div class="flex items-center">
<span class="material-symbols-outlined text-[#bec9c1] hover:opacity-80 transition-opacity cursor-pointer">close</span>
</div>
<h1 class="text-xl font-bold tracking-widest text-[#dfe4dd] uppercase">STICKS</h1>
<div class="w-6"></div> <!-- Spacer for center alignment -->
</header>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col items-center justify-center px-8 relative overflow-hidden">
<!-- Background Texture/Gradient -->
<div class="absolute inset-0 hero-gradient pointer-events-none"></div>
<div class="max-w-md w-full flex flex-col items-center text-center space-y-12 z-10">
<!-- Hero Illustration Container -->
<div class="relative w-64 h-64 flex items-center justify-center">
<!-- Outer Glow -->
<div class="absolute inset-0 bg-primary-container/20 blur-[60px] rounded-full"></div>
<!-- Main Illustration: The Clubhouse Trophy -->
<div class="relative bg-surface-container-low rounded-xl p-8 border border-outline-variant/20 shadow-2xl">
<div class="flex flex-col items-center gap-4">
<span class="material-symbols-outlined text-tertiary text-7xl" style="font-variation-settings: 'FILL' 1;">trophy</span>
<div class="flex flex-col gap-2 w-full">
<div class="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full w-3/4 bg-primary rounded-full"></div>
</div>
<div class="flex justify-between items-center text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
<span>Leaderboard Live</span>
<span class="text-primary font-bold">Updated</span>
</div>
</div>
</div>
<!-- Floating Notification Pill (Asymmetry) -->
<div class="absolute -top-4 -right-4 bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-secondary-container text-lg">notifications_active</span>
</div>
<div class="text-left">
<p class="text-[10px] font-bold leading-tight uppercase text-on-surface tracking-tighter">New Alert</p>
<p class="text-[9px] text-on-surface-variant">Hole 14: Birdie!</p>
</div>
</div>
</div>
</div>
<!-- Typography Cluster -->
<div class="space-y-4">
<h2 class="text-4xl md:text-5xl font-headline italic tracking-tight text-on-surface leading-tight">
                    Don't miss a move
                </h2>
<p class="text-on-surface-variant text-base leading-relaxed font-body max-w-sm mx-auto">
                    Stay connected to the clubhouse with real-time updates on leaderboard moves, bet settlements, tee time reminders, and crew activity.
                </p>
</div>
<!-- Features Bento-lite -->
<div class="grid grid-cols-2 gap-3 w-full">
<div class="bg-surface-container-low p-4 rounded-lg flex flex-col items-start text-left gap-2 border border-outline-variant/10">
<span class="material-symbols-outlined text-primary text-xl">payments</span>
<p class="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Settlements</p>
</div>
<div class="bg-surface-container-low p-4 rounded-lg flex flex-col items-start text-left gap-2 border border-outline-variant/10">
<span class="material-symbols-outlined text-secondary text-xl">schedule</span>
<p class="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Tee Times</p>
</div>
</div>
<!-- Actions -->
<div class="w-full space-y-6">
<button class="w-full bg-gradient-to-r from-primary-container to-primary py-5 rounded-lg shadow-[0_8px_24px_rgba(0,56,37,0.4)] hover:opacity-90 active:scale-[0.98] transition-all group">
<span class="text-on-primary font-label font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                        TURN ON NOTIFICATIONS
                        <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">chevron_right</span>
</span>
</button>
<button class="text-on-surface-variant hover:text-on-surface font-label text-xs uppercase tracking-[0.15rem] transition-colors">
                    Not now
                </button>
</div>
</div>
</main>
<!-- Aesthetic Floating Elements (The "Digital Locker Room" Vibe) -->
<div class="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none z-0"></div>
<!-- Hidden Bottom Nav for structural logic check, but suppressed as per Task/Visibility rules (Focused Task) -->
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks Membership | Elevate Your Game</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400;1,700&amp;family=Manrope:wght@400;500;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container-highest": "#313631",
                    "surface": "#101511",
                    "secondary-container": "#5a452b",
                    "on-tertiary": "#3c2f00",
                    "outline-variant": "#3f4943",
                    "on-tertiary-fixed": "#241a00",
                    "background": "#101511",
                    "on-secondary": "#3f2d15",
                    "secondary": "#dfc29f",
                    "inverse-on-surface": "#2c322d",
                    "tertiary": "#e9c349",
                    "surface-container-low": "#181d19",
                    "on-secondary-fixed-variant": "#574329",
                    "primary-fixed-dim": "#84d7af",
                    "on-error-container": "#ffdad6",
                    "error": "#ffb4ab",
                    "inverse-primary": "#0b6c4b",
                    "on-background": "#dfe4dd",
                    "on-surface": "#dfe4dd",
                    "secondary-fixed-dim": "#dfc29f",
                    "primary": "#84d7af",
                    "on-tertiary-container": "#4e3d00",
                    "on-primary-container": "#8fe2ba",
                    "on-tertiary-fixed-variant": "#574500",
                    "on-primary": "#003825",
                    "on-secondary-fixed": "#281903",
                    "error-container": "#93000a",
                    "surface-variant": "#313631",
                    "on-surface-variant": "#bec9c1",
                    "surface-container": "#1c211c",
                    "surface-container-high": "#262b27",
                    "tertiary-fixed": "#ffe088",
                    "surface-container-lowest": "#0a0f0b",
                    "primary-container": "#006747",
                    "tertiary-container": "#cba72f",
                    "surface-dim": "#101511",
                    "surface-tint": "#84d7af",
                    "on-primary-fixed": "#002114",
                    "tertiary-fixed-dim": "#e9c349",
                    "on-secondary-container": "#d0b492",
                    "secondary-fixed": "#fcdeba",
                    "primary-fixed": "#a0f4ca",
                    "outline": "#88938c",
                    "on-error": "#690005",
                    "on-primary-fixed-variant": "#005137",
                    "surface-bright": "#353a36",
                    "inverse-surface": "#dfe4dd"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Newsreader", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .serif-italic { font-family: 'Newsreader', serif; font-style: italic; }
        .glass-panel {
            background: rgba(16, 21, 17, 0.7);
            backdrop-filter: blur(30px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-[#101511]/70 backdrop-blur-3xl flex justify-between items-center px-6 py-4 w-full">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af] hover:opacity-80 transition-opacity cursor-pointer active:scale-95 duration-200">close</span>
</div>
<h1 class="text-lg font-serif italic text-[#dfe4dd] tracking-widest">STICKS MEMBERSHIP</h1>
<div class="w-6"></div> <!-- Spacer for centering -->
</header>
<main class="relative min-h-screen pt-24 pb-32 px-6 flex flex-col items-center">
<!-- Hero Section -->
<section class="w-full max-w-4xl mb-12 text-center md:text-left">
<div class="inline-block mb-2 px-3 py-1 bg-surface-container-high rounded-full">
<span class="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Private Access</span>
</div>
<h2 class="text-5xl md:text-7xl font-headline italic tracking-tight text-on-surface mb-4">Elevate Your Game</h2>
<p class="text-on-surface-variant max-w-xl text-lg font-light leading-relaxed">
                Join the inner circle of competitive golf. Unlock advanced metrics, priority booking, and professional-grade tracking tools.
            </p>
</section>
<!-- Pricing Cards Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl relative">
<!-- Fairway Tier -->
<div class="group surface-container-low rounded-lg p-8 flex flex-col border border-outline-variant/10 hover:bg-surface-container transition-all duration-300">
<div class="mb-6">
<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">The Entry</span>
<h3 class="text-3xl font-headline italic mt-1">Fairway</h3>
</div>
<div class="mb-8">
<div class="flex items-baseline gap-1">
<span class="text-4xl font-headline font-bold text-on-surface">$29</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-10 flex-grow">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Live GPS Tracking</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Ticker Access</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Bet Tracking</span>
</li>
</ul>
<button class="w-full py-3 rounded-sm bg-surface-container-highest text-on-surface text-sm font-bold tracking-wider hover:bg-surface-container-high transition-colors uppercase">Select Fairway</button>
</div>
<!-- Eagle Tier (Most Popular) -->
<div class="relative z-10 surface-container rounded-lg p-8 flex flex-col border border-primary/20 shadow-[0_8px_48px_rgba(0,56,37,0.3)] scale-105 md:scale-110">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary-container to-secondary px-4 py-1 rounded-sm">
<span class="text-on-secondary text-[10px] font-extrabold tracking-widest uppercase">Most Popular</span>
</div>
<div class="mb-6">
<span class="text-secondary text-[10px] font-bold tracking-widest uppercase">The Standard</span>
<h3 class="text-3xl font-headline italic mt-1 text-on-surface">Eagle</h3>
</div>
<div class="mb-8">
<div class="flex items-baseline gap-1">
<span class="text-4xl font-headline font-bold text-on-surface">$59</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-10 flex-grow">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="text-sm text-on-surface">All Fairway features</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Advanced Stats</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Rivalry Insights</span>
</li>
</ul>
<button class="w-full py-3 rounded-sm bg-gradient-to-br from-[#006747] to-[#84d7af] text-on-primary text-sm font-bold tracking-wider hover:opacity-90 transition-opacity uppercase">Choose Eagle</button>
</div>
<!-- Tour Tier -->
<div class="group surface-container-low rounded-lg p-8 flex flex-col border border-outline-variant/10 hover:bg-surface-container transition-all duration-300">
<div class="mb-6">
<span class="text-tertiary text-[10px] font-bold tracking-widest uppercase">The Pro</span>
<h3 class="text-3xl font-headline italic mt-1">Tour</h3>
</div>
<div class="mb-8">
<div class="flex items-baseline gap-1">
<span class="text-4xl font-headline font-bold text-on-surface">$99</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-10 flex-grow">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="text-sm text-on-surface">All Eagle features</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Commissioner Tools</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Priority Booking</span>
</li>
</ul>
<button class="w-full py-3 rounded-sm bg-surface-container-highest text-on-surface text-sm font-bold tracking-wider hover:bg-surface-container-high transition-colors uppercase">Upgrade to Tour</button>
</div>
</div>
<!-- Sticky Bottom CTA Area -->
<div class="w-full max-w-md mt-20 text-center flex flex-col items-center">
<button class="group relative w-full overflow-hidden rounded-sm bg-primary-container px-8 py-5 transition-all active:scale-95 shadow-[0_12px_32px_rgba(0,56,37,0.5)]">
<div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
<span class="relative z-10 text-on-primary-container text-lg font-bold tracking-[0.15em] uppercase">Start for Free</span>
</button>
<p class="mt-4 text-xs text-on-surface-variant tracking-wide">
                Free members can book tee times only. <a class="text-primary hover:underline underline-offset-4 ml-1" href="#">Continue as free member</a>
</p>
</div>
<!-- Decorative Background Element -->
<div class="fixed top-0 right-0 -z-10 w-full h-full opacity-20 pointer-events-none">
<img alt="golf fairway" class="w-full h-full object-cover grayscale mix-blend-overlay" data-alt="dramatic wide angle of a professional golf course at sunrise with deep green fairways and mist rolling over the hills" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYOgXPDmNxfoIH6Dkr-sRZ4VzTkJ88KmMgellKfqZ8hgC7cnsNvQ3y3nkUBP6UNDamzhJJa_m8jsFDkkaol_hWG855XGqB64N-aX4Uz5j6CiWP7_KVImXUGAPcGi-k13FMvCH-ssAQG7mTjsQ1JDtEXdg9DaVeu9VZ-Hcm8c9rWGUTVmLYruoLJI_CQdroIt1zND6uCdYEcvWRuWoEpgeUpHOM0JhcXxzU6tR9G8kWx3Ee6KIWRdXcGSiLizT1iwwfLgWTu4jccKI"/>
<div class="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full z-50 rounded-t-xl bg-[#101511]/80 backdrop-blur-3xl shadow-[0_-8px_24px_rgba(0,56,37,0.4)] flex justify-around items-center w-full px-4 pb-8 pt-4">
<a class="flex flex-col items-center justify-center text-[#bec9c1] px-4 py-1 hover:text-[#84d7af] transition-colors" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-sans text-[10px] uppercase tracking-wider font-bold">HOME</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] px-4 py-1 hover:text-[#84d7af] transition-colors" href="#">
<span class="material-symbols-outlined">golf_course</span>
<span class="font-sans text-[10px] uppercase tracking-wider font-bold">PLAY</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] px-4 py-1 hover:text-[#84d7af] transition-colors" href="#">
<span class="material-symbols-outlined">military_tech</span>
<span class="font-sans text-[10px] uppercase tracking-wider font-bold">CLUBS</span>
</a>
<!-- Active: Profile (assuming membership is part of profile flow) -->
<a class="flex flex-col items-center justify-center bg-gradient-to-br from-[#006747] to-[#84d7af] text-[#101511] rounded-sm px-4 py-1 Active: scale-90 duration-300" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-sans text-[10px] uppercase tracking-wider font-bold">PROFILE</span>
</a>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-fixed": "#a0f4ca",
                    "primary-container": "#006747",
                    "on-tertiary-container": "#4e3d00",
                    "on-error": "#690005",
                    "surface": "#0a110d",
                    "tertiary-container": "#cba72f",
                    "tertiary-fixed-dim": "#e9c349",
                    "primary-fixed-dim": "#84d7af",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#18211a",
                    "error": "#ffb4ab",
                    "secondary": "#dfc29f",
                    "on-primary": "#003825",
                    "on-secondary-fixed-variant": "#574329",
                    "surface-container-low": "#0d140f",
                    "inverse-on-surface": "#2c322d",
                    "on-surface": "#dfe4dd",
                    "on-error-container": "#ffdad6",
                    "on-primary-fixed-variant": "#005137",
                    "surface-variant": "#313631",
                    "outline": "#88938c",
                    "error-container": "#93000a",
                    "on-secondary-container": "#d0b492",
                    "background": "#0a110d",
                    "surface-container-highest": "#1c261e",
                    "primary": "#107e54",
                    "on-surface-variant": "#bec9c1",
                    "on-secondary": "#3f2d15",
                    "surface-bright": "#353a36",
                    "surface-container": "#121a14",
                    "surface-tint": "#107e54",
                    "on-tertiary-fixed": "#241a00",
                    "on-background": "#dfe4dd",
                    "inverse-surface": "#dfe4dd",
                    "tertiary": "#e9c349",
                    "secondary-fixed": "#fcdeba",
                    "surface-dim": "#0a110d",
                    "surface-container-lowest": "#070c08",
                    "outline-variant": "#3f4943",
                    "on-primary-fixed": "#002114",
                    "on-primary-container": "#8fe2ba",
                    "inverse-primary": "#0b6c4b",
                    "secondary-fixed-dim": "#dfc29f",
                    "secondary-container": "#5a452b",
                    "on-tertiary": "#3c2f00",
                    "on-secondary-fixed": "#281903",
                    "tertiary-fixed": "#ffe088"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Playfair Display", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
    body {
        background-color: #0a110d;
        font-family: "Manrope", sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    .topo-bg {
        background-image: url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23121a14' stroke-width='1'%3E%3Cpath d='M800 562.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 462.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 362.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 262.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 162.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3C/g%3E%3C/svg%3E");
        background-size: cover;
    }
    .text-augusta {
        color: #006747;
    }
    .bg-augusta {
        background-color: #006747;
    }
    .border-brass {
        border-color: #5a452b;
    }
    body {
      min-height: max(884px, 100dvh);
    }
</style>
</head>
<body class="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- Topographic Background Overlay -->
<div class="absolute inset-0 topo-bg pointer-events-none opacity-50"></div>
<!-- TopAppBar -->
<header class="w-full top-0 px-6 py-6 flex justify-center items-center z-50 bg-surface">
<div class="flex items-center justify-between w-full max-w-2xl">
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:opacity-80 transition-opacity">close</span>
<h1 class="text-3xl font-headline italic font-black tracking-tighter text-on-surface">STICKS</h1>
<div class="w-6"></div> <!-- Spacer for centering -->
</div>
</header>
<main class="flex-grow flex flex-col items-center justify-center px-6 py-8 z-10 max-w-2xl mx-auto w-full relative">
<!-- Subtle radial glow -->
<div class="absolute inset-0 bg-[radial-gradient(circle,rgba(0,103,71,0.03)_0%,transparent_70%)] pointer-events-none"></div>
<!-- Welcome Heading -->
<section class="w-full mb-10 text-center">
<h2 class="text-5xl md:text-7xl font-headline font-light leading-tight mb-6 text-on-surface">
                Welcome to <br/><span class="italic font-normal">Sticks, Alexander.</span>
</h2>
<div class="w-12 h-1 bg-primary mx-auto rounded-full"></div>
</section>
<!-- Profile Summary Section -->
<section class="w-full space-y-4">
<div class="flex items-center justify-between mb-2">
<h3 class="text-[10px] font-label tracking-[0.3em] text-on-surface-variant uppercase font-semibold">Your Clubhouse Profile</h3>
<span class="h-[1px] flex-grow ml-4 bg-outline-variant opacity-10"></span>
</div>
<!-- Profile Cards -->
<div class="grid grid-cols-1 gap-3">
<!-- Handicap Row -->
<div class="bg-surface-container-low p-5 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors border border-outline-variant/10">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">sports_golf</span>
</div>
<span class="text-xs font-label tracking-[0.15em] text-on-surface-variant uppercase font-medium">Handicap</span>
</div>
<span class="text-2xl font-headline text-secondary italic">4.2</span>
</div>
<!-- Home Course Row -->
<div class="bg-surface-container-low p-5 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors border border-outline-variant/10">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">landscape</span>
</div>
<span class="text-xs font-label tracking-[0.15em] text-on-surface-variant uppercase font-medium">Home Course</span>
</div>
<span class="text-xl font-headline text-secondary italic">Cypress Hollow</span>
</div>
<!-- Crew Row -->
<div class="bg-surface-container-low p-5 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors border border-outline-variant/10">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">group</span>
</div>
<span class="text-xs font-label tracking-[0.15em] text-on-surface-variant uppercase font-medium">Crew</span>
</div>
<span class="text-xl font-headline text-secondary italic">12 members</span>
</div>
</div>
</section>
<!-- Decorative Image Context -->
<div class="mt-10 w-full aspect-[21/9] rounded-xl overflow-hidden relative border border-outline-variant/20 shadow-2xl">
<img alt="Golf Course" class="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" data-alt="cinematic low angle shot of a pristine golf fairway at dusk, misty morning light, deep green grass textures, premium club feel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF1ujCwpYLn4Wspsh_dYMe5bFkKOYrSeR9K8HeyST6qC5v9duiniy1CDWKTGyoPl8L2i3q3IBF0ww5tnJd9HBqnI6x_C_mPwkh3q9p65it20SnwTA8-vT59RwN-yUMGpa7XQo0WHeV7w_mLw3t42W5s0gl-GBGQt6mGSonCF9fOIUaAAHTr5wDZGdKAuiudnyoAX10ctXzRqxx61wWpKQw7ajWpHUCK-b7pvFmCN8XrqevcJpXv7IzWfXhVoLh1crQEacPXYw0xhA"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
</div>
</main>
<!-- Bottom CTA Action -->
<footer class="p-8 w-full max-w-sm mx-auto z-20">
<button class="w-full py-5 bg-[#006747] hover:bg-[#005137] transition-all duration-300 rounded-lg flex items-center justify-center gap-3 group shadow-lg shadow-[#006747]/20 active:scale-[0.98]">
<span class="text-xs font-label font-bold tracking-[0.2em] text-white uppercase">Take Me to Sticks</span>
<span class="material-symbols-outlined text-white text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<p class="mt-6 text-center text-[9px] font-label tracking-[0.3em] text-on-surface-variant opacity-40 uppercase font-medium">
            EST. 2024 • Private Member Access
        </p>
</footer>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks Membership | Elevate Your Game</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary": "#107e54", // Augusta Green
                    "surface": "#0a110d",
                    "surface-container": "#121a14",
                    "surface-container-high": "#18211a",
                    "surface-container-low": "#0d140f",
                    "on-surface": "#dfe4dd",
                    "on-surface-variant": "#bec9c1",
                    "outline-variant": "#3f4943",
                    "secondary": "#dfc29f", // Brass/Sand
                    "secondary-container": "#5a452b",
                    "on-secondary": "#3f2d15",
                    "tertiary": "#e9c349", // Gold
                    "background": "#0a110d"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Playfair Display", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .topo-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23121a14' stroke-width='1'%3E%3Cpath d='M800 562.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 462.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 362.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 262.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 162.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3C/g%3E%3C/svg%3E");
            background-size: cover;
        }
        body {
            min-height: 100dvh;
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary selection:text-white topo-bg">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-[#0a110d]/80 backdrop-blur-3xl flex justify-between items-center px-6 py-5">
<div class="flex items-center">
<span class="material-symbols-outlined text-primary hover:opacity-80 transition-opacity cursor-pointer active:scale-95">close</span>
</div>
<h1 class="text-sm font-label font-bold text-on-surface tracking-[0.3em] uppercase">Membership</h1>
<div class="w-6"></div>
</header>
<main class="relative min-h-screen pt-28 pb-40 px-6 flex flex-col items-center">
<!-- Hero Section -->
<section class="w-full max-w-4xl mb-12 text-center">
<div class="inline-block mb-4 px-4 py-1 border border-primary/20 bg-primary/5 rounded-full">
<span class="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Private Access</span>
</div>
<h2 class="text-5xl md:text-7xl font-headline italic tracking-tight text-on-surface mb-6">Elevate Your Game</h2>
<p class="text-on-surface-variant max-w-xl mx-auto text-lg font-light leading-relaxed">
                Join the inner circle of competitive golf. Unlock advanced metrics, priority booking, and professional-grade tracking tools.
            </p>
</section>
<!-- Pricing Cards List -->
<div class="flex flex-col gap-8 w-full max-w-lg relative">
<!-- Free Tier (The Foundation) -->
<div class="surface-container-low rounded-xl p-8 flex flex-col border border-white/5 opacity-80">
<div class="mb-6">
<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase opacity-60">The Foundation</span>
<h3 class="text-3xl font-headline italic mt-1 text-on-surface">Clubhouse</h3>
</div>
<div class="mb-6">
<div class="flex items-baseline gap-1">
<span class="text-3xl font-headline font-bold text-on-surface">Free</span>
</div>
</div>
<ul class="space-y-4 mb-8">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface-variant">Standard Tee Time Booking</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-on-surface-variant/30 text-sm mt-1">block</span>
<span class="text-sm text-on-surface-variant/50">No Live Tracking</span>
</li>
</ul>
</div>
<!-- Fairway Tier (Good) -->
<div class="group surface-container-low rounded-xl p-8 flex flex-col border border-white/5 hover:border-primary/20 transition-all duration-500">
<div class="mb-6">
<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase opacity-60">Good</span>
<h3 class="text-4xl font-headline italic mt-1 text-on-surface">Fairway</h3>
</div>
<div class="mb-8">
<div class="flex items-baseline gap-1">
<span class="text-4xl font-headline font-bold text-on-surface">$29</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-10">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Live GPS Tracking</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Ticker Access</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Bet Tracking</span>
</li>
</ul>
<button class="w-full py-4 rounded-lg bg-surface-container-high text-on-surface text-xs font-bold tracking-[0.2em] hover:bg-surface-container-highest transition-colors uppercase border border-outline-variant/10">Select Fairway</button>
</div>
<!-- Eagle Tier (Better - Most Popular) -->
<div class="relative z-10 surface-container rounded-xl p-8 flex flex-col border border-secondary shadow-[0_20px_50px_rgba(223,194,159,0.1)] scale-105">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary px-6 py-1.5 rounded-full shadow-lg">
<span class="text-on-secondary text-[10px] font-extrabold tracking-[0.2em] uppercase">Most Popular</span>
</div>
<div class="mb-6">
<span class="text-secondary text-[10px] font-bold tracking-widest uppercase">Better</span>
<h3 class="text-4xl font-headline italic mt-1 text-on-surface">Eagle</h3>
</div>
<div class="mb-8">
<div class="flex items-baseline gap-1">
<span class="text-4xl font-headline font-bold text-on-surface">$59</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-10">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary text-sm mt-1" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="text-sm text-on-surface">Everything in Fairway</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Advanced Performance Stats</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Rivalry &amp; H2H Insights</span>
</li>
</ul>
<button class="w-full py-4 rounded-lg bg-primary text-white text-xs font-bold tracking-[0.2em] hover:brightness-110 transition-all uppercase shadow-lg shadow-primary/20">Choose Eagle</button>
</div>
<!-- Tour Tier (Best) -->
<div class="group surface-container-low rounded-xl p-8 flex flex-col border border-white/5 hover:border-tertiary/30 transition-all duration-500">
<div class="mb-6">
<span class="text-tertiary text-[10px] font-bold tracking-widest uppercase">Best</span>
<h3 class="text-4xl font-headline italic mt-1 text-on-surface">Tour</h3>
</div>
<div class="mb-8">
<div class="flex items-baseline gap-1">
<span class="text-4xl font-headline font-bold text-on-surface">$99</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="space-y-4 mb-10">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary text-sm mt-1" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="text-sm text-on-surface">Everything in Eagle</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Commissioner League Tools</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
<span class="text-sm text-on-surface">Priority Tee Time Booking</span>
</li>
</ul>
<button class="w-full py-4 rounded-lg bg-surface-container-high text-on-surface text-xs font-bold tracking-[0.2em] hover:bg-surface-container-highest transition-colors uppercase border border-outline-variant/10">Upgrade to Tour</button>
</div>
</div>
<!-- Sticky Bottom CTA Area -->
<div class="w-full max-w-sm mt-20 text-center flex flex-col items-center">
<button class="group relative w-full overflow-hidden rounded-lg bg-primary px-8 py-5 transition-all active:scale-95 shadow-xl shadow-primary/30">
<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="relative z-10 text-white text-xs font-bold tracking-[0.3em] uppercase">Start for Free</span>
</button>
<div class="mt-8 pt-8 border-t border-white/5 w-full">
<p class="text-[10px] text-on-surface-variant tracking-wider leading-relaxed mb-4">
                    Secure checkout powered by <span class="font-bold opacity-60">Stripe</span>. Cancel anytime.
                </p>
<a class="text-primary text-[11px] font-bold hover:underline underline-offset-4 tracking-widest uppercase" href="#">Continue as Clubhouse member</a>
</div>
</div>
<!-- Decorative Subtle Radial -->
<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(16,126,84,0.05)_0%,transparent_70%)] pointer-events-none -z-10"></div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full z-50 rounded-t-2xl bg-[#0a110d]/90 backdrop-blur-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex justify-around items-center px-4 pb-8 pt-4 border-t border-white/5">
<a class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-label text-[9px] uppercase tracking-[0.2em] font-bold mt-1">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">golf_course</span>
<span class="font-label text-[9px] uppercase tracking-[0.2em] font-bold mt-1">Play</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">military_tech</span>
<span class="font-label text-[9px] uppercase tracking-[0.2em] font-bold mt-1">Clubs</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-lg px-5 py-1.5 transition-all active:scale-95" href="#">
<span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-label text-[9px] uppercase tracking-[0.2em] font-bold mt-0.5">Profile</span>
</a>
</nav>
</body></html>


