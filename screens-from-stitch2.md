<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>STICKS | The Clubhouse Feed</title>
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
                    "surface-dim": "#101511",
                    "outline-variant": "#3f4943",
                    "error-container": "#93000a",
                    "on-secondary": "#3f2d15",
                    "on-error": "#690005",
                    "on-secondary-fixed": "#281903",
                    "background": "#101511",
                    "surface-container-lowest": "#0a0f0b",
                    "tertiary-container": "#cba72f",
                    "error": "#ffb4ab",
                    "surface-variant": "#313631",
                    "surface-bright": "#353a36",
                    "secondary": "#dfc29f",
                    "on-tertiary-container": "#4e3d00",
                    "tertiary": "#e9c349",
                    "on-tertiary-fixed-variant": "#574500",
                    "inverse-on-surface": "#2c322d",
                    "primary": "#84d7af",
                    "on-secondary-container": "#d0b492",
                    "surface-container-highest": "#313631",
                    "surface-container-high": "#262b27",
                    "on-surface": "#dfe4dd",
                    "surface-tint": "#84d7af",
                    "on-secondary-fixed-variant": "#574329",
                    "inverse-surface": "#dfe4dd",
                    "on-error-container": "#ffdad6",
                    "surface-container-low": "#181d19",
                    "on-surface-variant": "#bec9c1",
                    "secondary-container": "#5a452b",
                    "on-primary-fixed": "#002114",
                    "on-primary-container": "#8fe2ba",
                    "inverse-primary": "#0b6c4b",
                    "tertiary-fixed-dim": "#e9c349",
                    "secondary-fixed": "#fcdeba",
                    "tertiary-fixed": "#ffe088",
                    "outline": "#88938c",
                    "on-primary": "#003825",
                    "surface-container": "#1c211c",
                    "surface": "#101511",
                    "on-tertiary": "#3c2f00",
                    "on-background": "#dfe4dd",
                    "primary-container": "#006747",
                    "on-tertiary-fixed": "#241a00",
                    "secondary-fixed-dim": "#dfc29f",
                    "primary-fixed": "#a0f4ca",
                    "on-primary-fixed-variant": "#005137",
                    "primary-fixed-dim": "#84d7af"
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
        body { font-family: 'Manrope', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-emerald-950/70 backdrop-blur-3xl flex items-center justify-between px-6 h-16 shadow-[0_8px_24px_rgba(0,56,37,0.4)]">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
<img alt="Profile" class="w-full h-full object-cover" data-alt="Professional portrait of a golfer in a dark green polo shirt with a clubhouse locker room background blurred" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFDRJkHxWzX95KqfIu3ob2F82XYOWCaGL6m7ef0bEgyk6Dw_NtILMIEoqlLmXq0THUHMiO5oUq3f4DXAYu7DhFXMY5bs9zF_1MrLuuhR72V0T6ipa2hQsX5ckjkm44flGSPDiO7nVElHaSOda5pddoNAPSwKTENcVzgGOMAvowdY6u2En9lS8-0X9HQUZzYpPsVSMXtwLgdeZuvTmBcOlc6170gx18hs_RByWDh_0w4G4Wn4us63T98yyGeNQC22eF93jpyipvZ2s"/>
</div>
</div>
<div class="text-2xl font-bold tracking-[0.2em] text-emerald-50 font-['Newsreader'] uppercase">STICKS</div>
<button class="text-emerald-400 hover:opacity-80 transition-opacity active:duration-150 scale-95">
<span class="material-symbols-outlined">notifications</span>
</button>
</header>
<main class="pt-16 pb-24 max-w-2xl mx-auto px-4">
<!-- Live Match Ticker -->
<section class="mt-6 -mx-4 overflow-hidden">
<div class="flex items-center px-4 mb-3 gap-2">
<span class="flex h-2 w-2 rounded-full bg-error"></span>
<span class="font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant">Live Matches Near You</span>
</div>
<div class="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2">
<!-- Ticker Card 1 -->
<div class="flex-none w-72 bg-surface-container-low p-4 rounded-lg flex flex-col justify-between border-l-2 border-tertiary">
<div class="flex justify-between items-start mb-4">
<div class="space-y-1">
<p class="text-xs font-label text-on-surface-variant uppercase tracking-tighter">Augusta National</p>
<h4 class="font-headline text-lg leading-tight">The Founders Cup</h4>
</div>
<span class="bg-tertiary/10 text-tertiary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">$2.5k POT</span>
</div>
<div class="flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-6 h-6 rounded-full border border-surface" data-alt="Portrait of a male golfer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2jPFOkTAzWegDUdypa6xogudj6loHse7-7ndLIbpDNp_gsIL3EfnES48xvAhOz1ZieP6WDiidnJ8qBdsrmk-nmu8WJJH_yUNoxfD3PGGRX9r5DIcboct6OC2X0oRDwD-KISiC-vpMEXKsfmXa5oFn0lBaiq2j2A0ZTe9LyNdZQ32Vyz7cdPe0iupElBLsdIBMIV0J_feb0KkwO_x6LCOKGnUJC5ShKg0u6XcFzEVwUuDbuQCxULJFhkCOwL1tsRmtDzFg1ANs9o"/>
<img class="w-6 h-6 rounded-full border border-surface" data-alt="Portrait of a female golfer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMqSRmHKwaU7p6Lt2AeQPaUzTl2_AUzKCzdylFKv5aGDeP1JaZpTmUvg3IhEij7E1dmkYtRgqTl3EolHSbbTzTxXsV34SAJ6MftLV0PrmnK-oloppVnhRCVMEP8JYkwUX36ih2NHgReXhnfv8nWdlZdBS7KPA6QGjaVFnyIIxMwqZBB6mTzG-MvsaxOyCkC3eJYRemo_z5yE4oukR2NfG_gM3xdQVxDeKgPdraz1NeQkohONalkfGsKzjmLBby_mhSwnETiU0zPpA"/>
</div>
<p class="text-xs font-medium text-primary">Tied thru 12</p>
</div>
</div>
<!-- Ticker Card 2 -->
<div class="flex-none w-72 bg-surface-container-low p-4 rounded-lg flex flex-col justify-between border-l-2 border-outline-variant">
<div class="flex justify-between items-start mb-4">
<div class="space-y-1">
<p class="text-xs font-label text-on-surface-variant uppercase tracking-tighter">Pebble Beach</p>
<h4 class="font-headline text-lg leading-tight">Weekend Skins</h4>
</div>
<span class="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">$400 HOLE</span>
</div>
<div class="flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-6 h-6 rounded-full border border-surface" data-alt="Portrait of a man in a golf visor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq4r3oyNx5-MjAkfhzsRVY-fgMEmDBFRQC_93HHzoqv1h94MPqnsDZjYpZXswbGV2pljFsPPrToPV6exSMWPNBUxVjpund6kKkMJL78VStfyOTzTgdr5yWB7-m-TRoim7anKK_byA_Yr_J2tbCFVTPYgRAQYpVxth3nAxiMtsw9yF9pFMDx6moXIAO_GCWOIxROyad7J1UOW0oFYa3VBm9_YyFAVbDQDYacWU4t0GDiB_G0wuNUeBdO7LnLdPytS7t5M9Ddh6hJ-4"/>
<img class="w-6 h-6 rounded-full border border-surface" data-alt="Portrait of a woman golfer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJJx3l9FiO0DUpUG7qN4iu5wpYf5DCom8yWbO_Kj4dT-dr8ehUGhTT0KjA2p8yGxfFxA3mwr5YsNwj3utWM43GhfaPYq_NF3-PISLiVGX-EkD7yW8_jdscvBD3AMBxKq9Y_G02sovzravDbhs5XbvBh3zq75RIcwa2DS2M5HdSv_paIEco8bk-SWawdFjuO3NB216mvrovoZ4uW-iowXzU55NuvO0UWfjuzoPo68n4ai7BBwJ692bGUl8LoYbL0JwAXxpOnrPx1C4"/>
</div>
<p class="text-xs font-medium text-on-surface-variant">Sloan +2 UP</p>
</div>
</div>
</div>
</section>
<!-- Toggles Section -->
<nav class="sticky top-16 z-40 bg-surface/90 backdrop-blur-md py-4 flex gap-6 border-b border-surface-container-high mb-6">
<button class="font-label text-xs font-extrabold uppercase tracking-[0.15em] text-primary relative after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-[2px] after:bg-primary">Following</button>
<button class="font-label text-xs font-extrabold uppercase tracking-[0.15em] text-on-surface-variant hover:text-on-surface transition-colors">Local</button>
<button class="font-label text-xs font-extrabold uppercase tracking-[0.15em] text-on-surface-variant hover:text-on-surface transition-colors">Global</button>
</nav>
<!-- Feed Container -->
<div class="space-y-8">
<!-- Feed Item: Live Round Update (Bento Style) -->
<div class="bg-surface-container-low rounded-lg p-6 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
<div class="flex justify-between items-center mb-6">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-lg object-cover" data-alt="Headshot of a smiling young man in athletic gear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSv8EqNwCdsO7Dfh9Z9_7UoJLuDnZauWf5lwy9rEf2D5a6C5lRHh91UDYmqSufnYzd-cJkZgfSQJnH28sksciNbR1-kIw1KfxuokkA4lavSdD6W3LJv6YwHsyamft7lthwzaiaC328iHnQNDctYjWt0LNOak8BVmFtqNrAtokXF9uUbJGmqWAjQ3PPNQn_yguwWDcnHZ0RPS3s3oswg1OifMRI3S25oBKdSfnz0mdZUMJCDW00RK7f_dC8LTXYMEG_nQONYshRkJo"/>
<div>
<h3 class="font-bold text-sm text-on-surface">Tyler Henderson</h3>
<p class="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">34m ago • Augusta National</p>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant">more_horiz</span>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="col-span-2 bg-surface-container p-4 rounded-lg flex items-center justify-between border-l-4 border-tertiary">
<div>
<p class="text-xs font-label text-on-surface-variant uppercase mb-1">Current Score</p>
<span class="font-headline text-3xl font-bold text-tertiary">-2 <span class="text-lg text-on-surface-variant font-normal">thru 14</span></span>
</div>
<div class="text-right">
<p class="text-xs font-label text-on-surface-variant uppercase mb-1">Rank</p>
<span class="font-headline text-xl text-on-surface">P12</span>
</div>
</div>
<div class="bg-surface-container-high p-4 rounded-lg">
<p class="text-[10px] font-label text-on-surface-variant uppercase mb-1">Driving Acc.</p>
<p class="font-bold text-lg">84%</p>
</div>
<div class="bg-surface-container-high p-4 rounded-lg">
<p class="text-[10px] font-label text-on-surface-variant uppercase mb-1">Putts/Hole</p>
<p class="font-bold text-lg">1.4</p>
</div>
</div>
</div>
<!-- Feed Item: Video Content (Killer Drive) -->
<div class="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10">
<div class="p-4 flex items-center justify-between">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-lg object-cover" data-alt="Action shot of a professional golfer swinging" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrWgkgG3psmO_P4ezNeYVINlsW1j2qREMbTCSOyol453OR0VOVqsEqAedCUpHmjqBUrpTmOZ-BjwqjYrOQExS-4Z4rTtI1jl6TEnmdx0gVT5-VLsPnnCf8_523_SNN2c08yReIdPfvMuaiBGYb5Yb5qpDKkl8M3kM9q2BgQXBCnzIpOofqvKeRH1VVehbTPunhWLKwbAKFmMOEyFMDVaaYkN2OnCz4gQNj5lVzs8TGQERTGSlq7Zu-X17azItj-yi79-abDWgSw-o"/>
<div>
<h3 class="font-bold text-sm text-on-surface">PGA Highlights</h3>
<p class="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Promoted • Pro Tip</p>
</div>
</div>
<button class="text-primary font-label text-xs font-bold uppercase">Follow</button>
</div>
<div class="relative aspect-[9/16] max-h-[500px] overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Slow motion video frame of a golf driver hitting a ball on a lush green course during sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOCrFLwI9PaqbVaXyMvcaiuJOBKLLjdSv4dThXtSWVy6DhFCJ5-r1vpXAc5HvUeFDTqT36h9nafQiwcsxahrIS5VUEETMOExfrLA_WcKW_Wo5zofA7XfMczMhgYUhKKWxKBZk9xC8yJW4V9DtdIwJKnn2zlaukswjw5QtpA8-sRlmskhQHDTEf_QHjd9XiuUlKPLQNFyCxATiJ6RUImqISD2q8lJXzWXHBxxdwi9quSZSFeBAazQQNbBRyNdH1CTdHN0xTznSztBI"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent flex items-end p-6">
<div class="w-full">
<h2 class="font-headline text-2xl text-on-surface mb-2 italic">The "Killer Drive" Mechanics</h2>
<p class="text-sm text-on-surface/80 mb-4">Watch how the wrist lag creates 125mph clubhead speed.</p>
<div class="flex items-center gap-6">
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">favorite</span> <span class="text-xs">12.4k</span></span>
<span class="flex items-center gap-2"><span class="material-symbols-outlined">chat_bubble</span> <span class="text-xs">842</span></span>
<span class="flex items-center gap-2"><span class="material-symbols-outlined">share</span></span>
</div>
</div>
</div>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
<span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
</div>
</div>
<!-- Native Ad: Luxury Titleist Card -->
<div class="relative p-[1px] rounded-lg bg-gradient-to-br from-secondary via-outline-variant to-secondary-container">
<div class="bg-surface-container-lowest rounded-lg p-6 flex flex-col md:flex-row gap-6">
<div class="flex-1">
<span class="text-[10px] font-label font-bold text-secondary uppercase tracking-[0.2em] mb-4 block">Craftsmanship</span>
<h3 class="font-headline text-3xl text-on-surface mb-4">Titleist TSR4</h3>
<p class="text-on-surface-variant text-sm leading-relaxed mb-6">Designed to provide ultra-low spin for the player who needs it. Experience the ultimate in aerodynamics and aesthetic precision.</p>
<button class="bg-gradient-to-r from-primary-container to-primary text-on-primary px-6 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">Experience the Speed</button>
</div>
<div class="flex-1 relative min-h-[160px]">
<img alt="Golf Club" class="w-full h-full object-contain mix-blend-lighten" data-alt="Sleek close-up of a premium carbon fiber golf driver on a dark reflective surface with dramatic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvT9Gs4CoHk7dTU5ghlpApVIQ_mw84xTMw1McPWi4QRBbALduU77l-4V4nJwUn8EhQ_PPslwwowDH89L15DP3uElX3tkaKbC3eBzvk9tbnqyUICVDO6bH3Fh9_1IiLE7PegqXw1EXPhZfISQn0S8s_8t471wAKuSEryOonMXXjrSLyRrBe95AZm-6t9Nj_ncUZePdAn38kO-87apqlaloYmnqQhzprewe27fpJOZ_QWzm4Qq4fUxNcthQqIVZDdcj4E_3-UHfamyo"/>
</div>
</div>
</div>
<!-- Feed Item: Community Post -->
<div class="bg-surface-container-low rounded-lg p-5">
<div class="flex items-center gap-3 mb-4">
<img class="w-10 h-10 rounded-full object-cover" data-alt="Portrait of a male golfer in a white cap" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEEeVNs0QjpDrQihRgIsKy4kFPCKQv3OzNJlPF-GvvMtDbpO4rlcvEKwhESC75LgnImtMUD5cbBhyt4gkTUpLjIY4OM-efV6J3oHaVPpl5f-xMZhCE97EDVn0aLRMQKUVh0Givvcr2827_w25vbbmWk0P4zIjwtbbqsgIY-mQcIQeoIsoFshdu805DhQLEvPgOZgDkAWPQOprLzJoBtLwkRe5xuADcV91YcHiErLB2g--QMHQKsUjSUrJIKyRu10vR4Cbi_v-atG4"/>
<div>
<h3 class="font-bold text-sm text-on-surface">Marcus Chen</h3>
<p class="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">2h ago • Cypress Point</p>
</div>
</div>
<p class="text-on-surface text-sm mb-4 leading-relaxed italic">"Finally broke 80 at Cypress. The greens were playing lightning fast today, but the flat stick was on fire."</p>
<div class="grid grid-cols-2 gap-2 mb-4">
<img class="rounded-lg aspect-square object-cover" data-alt="Beautiful view of a seaside golf course at sunrise" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG786HO6cL271Y5Iy8aL0rXOkj7eeK3qnKaU_EZe2FRl-UDdU65UhHM0bGfZILpnK5hlSjcArf3f2q_OVNlWPw28ZpKm3r3XzTNAO8qJaMEJJdmdOM6S17BGe0uhKxbreIW1GO0Mz1pcU3FRgfSRuQ8tiDplzR8qeR7iEabd-P1netwugP3HN2FmcDoCrBxVna_rBt84478slcRs1flfHcLFJjB394Ck4sDkw8K83kaNy4Mc-WcSsgjQir0fPOe-Ku2MnpVDNgFwM"/>
<img class="rounded-lg aspect-square object-cover" data-alt="Close up of a golf ball and putter on a manicured green" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5BGj5FRLGGlK8yOCtXZFJuh7_2nqSYekDWUWZs8Nb_RQ9GfQ5dK5iWET0zRR3Oy1xgZHeoDq0whYpo3PcftRSTqLCoi8WafJXqg-sGmgjDy1UsrqVZueHm-X4uDUGN8KpyDmUxt4hJp5yG1IoWzjGatqcV9AYcYSVOCCVqwme1640oJJOuL_Ys38yqQNIVvvgp1HHFgcOw2Md_xojC9NqggDsBR7CV8IJlTWFId0FedtVSTY4YSOyvMxVhGNRLacUlKHo2fY6sRY"/>
</div>
<div class="flex items-center gap-4 text-on-surface-variant border-t border-surface-container-high pt-4">
<button class="flex items-center gap-1.5 hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg">thumb_up</span>
<span class="text-xs font-bold">152</span>
</button>
<button class="flex items-center gap-1.5 hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg">chat</span>
<span class="text-xs font-bold">24</span>
</button>
</div>
</div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full z-50 rounded-t-lg bg-emerald-950/80 backdrop-blur-2xl flex justify-around items-center px-4 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
<div class="flex flex-col items-center justify-center text-emerald-400 border-t-2 border-amber-600 pt-2 transition-colors hover:text-emerald-200 tap-highlight-none active:scale-90 duration-200">
<span class="material-symbols-outlined">home</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Home</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 transition-colors hover:text-emerald-200 tap-highlight-none active:scale-90 duration-200">
<span class="material-symbols-outlined">golf_course</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Play</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 transition-colors hover:text-emerald-200 tap-highlight-none active:scale-90 duration-200">
<span class="material-symbols-outlined">leaderboard</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Rank</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 transition-colors hover:text-emerald-200 tap-highlight-none active:scale-90 duration-200">
<span class="material-symbols-outlined">payments</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Bets</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 transition-colors hover:text-emerald-200 tap-highlight-none active:scale-90 duration-200">
<span class="material-symbols-outlined">person</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Profile</span>
</div>
</nav>
<!-- Contextual FAB: Only for Home Feed -->
<button class="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-primary-container to-primary rounded-full shadow-[0_8px_24px_rgba(0,56,37,0.4)] flex items-center justify-center text-on-primary-container z-40 active:scale-90 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'wght' 600;">add</span>
</button>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>STICKS - Member Profile</title>
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
                      "surface-container": "#1c211c",
                      "tertiary-fixed": "#ffe088",
                      "on-background": "#dfe4dd",
                      "on-tertiary-fixed": "#241a00",
                      "on-primary-fixed": "#002114",
                      "inverse-on-surface": "#2c322d",
                      "secondary-fixed": "#fcdeba",
                      "secondary-container": "#5a452b",
                      "on-tertiary-container": "#4e3d00",
                      "secondary": "#dfc29f",
                      "outline": "#88938c",
                      "surface-dim": "#101511",
                      "tertiary-fixed-dim": "#e9c349",
                      "on-surface-variant": "#bec9c1",
                      "surface-variant": "#313631",
                      "on-secondary-container": "#d0b492",
                      "background": "#101511",
                      "primary-fixed": "#a0f4ca",
                      "tertiary-container": "#cba72f",
                      "surface-container-lowest": "#0a0f0b",
                      "on-secondary-fixed-variant": "#574329",
                      "on-tertiary": "#3c2f00",
                      "surface-tint": "#84d7af",
                      "surface": "#101511",
                      "on-error-container": "#ffdad6",
                      "on-tertiary-fixed-variant": "#574500",
                      "surface-container-high": "#262b27",
                      "on-primary-container": "#8fe2ba",
                      "on-primary-fixed-variant": "#005137",
                      "surface-container-highest": "#313631",
                      "on-primary": "#003825",
                      "inverse-surface": "#dfe4dd",
                      "outline-variant": "#3f4943",
                      "primary": "#84d7af",
                      "on-secondary-fixed": "#281903",
                      "primary-container": "#006747",
                      "surface-bright": "#353a36",
                      "surface-container-low": "#181d19",
                      "secondary-fixed-dim": "#dfc29f",
                      "on-surface": "#dfe4dd",
                      "on-error": "#690005",
                      "inverse-primary": "#0b6c4b",
                      "error-container": "#93000a",
                      "primary-fixed-dim": "#84d7af",
                      "tertiary": "#e9c349",
                      "on-secondary": "#3f2d15",
                      "error": "#ffb4ab"
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
<body class="bg-surface text-on-surface min-h-screen pb-24">
<!-- TopAppBar -->
<header class="fixed top-0 z-50 w-full bg-[#101511]/70 backdrop-blur-3xl flex justify-between items-center px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20">
<img alt="Member Profile" class="w-full h-full object-cover" data-alt="close up professional portrait of a refined man with a confident expression in a high-end clubhouse setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRatsWq1hShtAF7u8pNKdOMFFk1GIIQczMrUnw3UUhF2PtwEp4ZV6MK2rQraSD3PGIhuz8mP7C6w4rvI3uYCW3JvxKCKQT_dERxoEYac26kasalqUKBl9vcCiJ0nTVsRKCMC-VcmUTcnxDaJh_OjvuXb2Lfo7v0jtdJAkfx-48LaLBQ-ak6mWAZDeUFLI_dViNPi9z6OB52c3RMMiGQ79yCeZMgVuUWAUYKOVNnZVQOOFQgcYR_62bOX4GTyf9Ro6yaEcj_tRC5aI"/>
</div>
<span class="text-2xl font-serif italic text-[#e9c349] tracking-tighter">STICKS</span>
</div>
<div class="flex items-center">
<span class="material-symbols-outlined text-[#84d7af] hover:text-[#84d7af] transition-colors cursor-pointer">notifications</span>
</div>
</header>
<main class="pt-24 px-6 max-w-4xl mx-auto">
<!-- Hero Profile Section -->
<section class="relative mb-12">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<p class="font-label text-[10px] font-bold tracking-[0.2em] text-on-surface-variant mb-2">ESTABLISHED MEMBER</p>
<h1 class="font-serif text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-none">Julian Vane</h1>
<p class="font-serif italic text-xl text-tertiary mt-2">Royal Lytham &amp; St Annes Golf Club</p>
</div>
<div class="flex items-baseline gap-2">
<span class="font-label text-sm font-bold tracking-widest text-on-surface-variant">HANDICAP</span>
<span class="font-serif text-6xl font-extrabold text-primary">4.2</span>
</div>
</div>
</section>
<!-- Stats Bento Grid -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
<!-- Major Stat Card -->
<div class="md:col-span-1 bg-surface-container-low p-6 rounded-lg flex flex-col justify-between h-48 border-l-2 border-primary/30">
<div class="flex justify-between items-start">
<span class="font-label text-[10px] font-bold tracking-widest text-on-surface-variant">FAIRWAYS HIT</span>
<span class="material-symbols-outlined text-primary text-xl">straighten</span>
</div>
<div>
<div class="font-serif text-4xl font-bold text-on-surface">68%</div>
<div class="font-label text-[10px] text-on-surface-variant mt-1">+2.4% FROM LAST MONTH</div>
</div>
</div>
<!-- Major Stat Card -->
<div class="md:col-span-1 bg-surface-container-low p-6 rounded-lg flex flex-col justify-between h-48 border-l-2 border-primary/30">
<div class="flex justify-between items-start">
<span class="font-label text-[10px] font-bold tracking-widest text-on-surface-variant">GIR</span>
<span class="material-symbols-outlined text-primary text-xl">golf_course</span>
</div>
<div>
<div class="font-serif text-4xl font-bold text-on-surface">54%</div>
<div class="font-label text-[10px] text-on-surface-variant mt-1">TOUR QUALITY ACCURACY</div>
</div>
</div>
<!-- Major Stat Card -->
<div class="md:col-span-1 bg-surface-container-low p-6 rounded-lg flex flex-col justify-between h-48 border-l-2 border-primary/30">
<div class="flex justify-between items-start">
<span class="font-label text-[10px] font-bold tracking-widest text-on-surface-variant">AVG PUTTS</span>
<span class="material-symbols-outlined text-primary text-xl">adjust</span>
</div>
<div>
<div class="font-serif text-4xl font-bold text-on-surface">29.4</div>
<div class="font-label text-[10px] text-on-surface-variant mt-1">LOCKED ON GREEN</div>
</div>
</div>
</section>
<!-- Recent Rounds Section -->
<section class="mb-12">
<div class="flex justify-between items-center mb-8">
<h2 class="font-serif text-3xl font-bold text-on-surface">Round History</h2>
<button class="font-label text-[10px] font-bold tracking-widest text-primary hover:text-on-primary-container transition-colors">VIEW FULL LOG</button>
</div>
<div class="space-y-4">
<!-- Round Item 1 -->
<div class="group bg-surface-container-low hover:bg-surface-container p-6 rounded-lg transition-all flex items-center justify-between border-b border-outline-variant/10">
<div class="flex items-center gap-6">
<div class="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary font-serif text-2xl font-bold">74</div>
<div>
<h3 class="font-serif text-xl font-bold text-on-surface">Muirfield Links</h3>
<p class="font-label text-[10px] text-on-surface-variant tracking-wider uppercase">OCT 24, 2023 • PAR 71 • +3</p>
</div>
</div>
<div class="text-right">
<div class="flex gap-1 justify-end mb-1">
<span class="material-symbols-outlined text-tertiary text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<span class="font-label text-[10px] font-bold text-primary tracking-widest">VERIFIED</span>
</div>
</div>
<!-- Round Item 2 -->
<div class="group bg-surface-container p-6 rounded-lg transition-all flex items-center justify-between border-b border-outline-variant/10">
<div class="flex items-center gap-6">
<div class="w-12 h-12 bg-secondary-container/30 rounded flex items-center justify-center text-secondary font-serif text-2xl font-bold">79</div>
<div>
<h3 class="font-serif text-xl font-bold text-on-surface">St Andrews (Old Course)</h3>
<p class="font-label text-[10px] text-on-surface-variant tracking-wider uppercase">OCT 18, 2023 • PAR 72 • +7</p>
</div>
</div>
<div class="text-right">
<div class="flex gap-1 justify-end mb-1">
<span class="material-symbols-outlined text-tertiary text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<span class="font-label text-[10px] font-bold text-primary tracking-widest">VERIFIED</span>
</div>
</div>
<!-- Round Item 3 (Highlight) -->
<div class="group bg-surface-container-low p-6 rounded-lg transition-all flex items-center justify-between border-2 border-tertiary/20">
<div class="flex items-center gap-6">
<div class="w-12 h-12 bg-tertiary/10 rounded flex items-center justify-center text-tertiary font-serif text-2xl font-bold">71</div>
<div>
<h3 class="font-serif text-xl font-bold text-on-surface">Carnoustie</h3>
<p class="font-label text-[10px] text-on-surface-variant tracking-wider uppercase">SEP 30, 2023 • PAR 72 • -1</p>
</div>
</div>
<div class="text-right">
<div class="font-label text-[10px] font-bold text-tertiary tracking-widest px-2 py-1 bg-tertiary/10 rounded">SEASON BEST</div>
</div>
</div>
</div>
</section>
<!-- Course Photo Gallery / Asymmetric Component -->
<section class="mb-24 grid grid-cols-2 gap-4">
<div class="relative h-64 rounded-lg overflow-hidden md:translate-y-4">
<img class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="wide panoramic shot of a misty scottish golf course at sunrise with deep bunkers and rolling hills" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaRsdwY14DyB0ebIEpEqBuFZbhvdObvA5XZ1O3OxCworUHfzzCMEfRphaYUoHxKRgqYARcummt6OJ3UbB1MzUgmxBr2FRTz757rHQdAsCBFbbXTB9cm8lBKOANETDnQWLaHXxYbDtS3bIUcGH39EhLikpwRTDzy0cRGiO0RkU3YVqKxwld-NWAn38NK4w7FUuAA94nJBWKFT4owhDdzhgRLUuNXXPq1defMzkV16D-DcFFAOjmb-4sMxtqpLo8a9YK68zdbKnI6pA"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
<p class="absolute bottom-4 left-4 font-serif text-sm italic">Home Course Vibe</p>
</div>
<div class="bg-primary-container/20 rounded-lg p-8 flex flex-col justify-center border border-primary/10">
<span class="material-symbols-outlined text-tertiary text-4xl mb-4" style="font-variation-settings: 'FILL' 1;">military_tech</span>
<h4 class="font-serif text-2xl font-bold mb-2">Club Ranking</h4>
<p class="font-body text-sm text-on-surface-variant leading-relaxed">Currently ranked #14 out of 420 active members in the Stableford season ladder.</p>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-[#101511]/80 backdrop-blur-xl z-50 rounded-t-xl shadow-[0_-8px_24px_rgba(0,56,37,0.4)]">
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">home</span>
<span class="font-label text-[10px] font-bold tracking-widest">HOME</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">golf_course</span>
<span class="font-label text-[10px] font-bold tracking-widest">PLAY</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">leaderboard</span>
<span class="font-label text-[10px] font-bold tracking-widest">RANK</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">payments</span>
<span class="font-label text-[10px] font-bold tracking-widest">BETS</span>
</div>
<!-- ACTIVE TAB -->
<div class="flex flex-col items-center justify-center text-[#84d7af] bg-[#006747]/20 rounded-lg py-1 px-3 scale-90 duration-150 cursor-pointer">
<span class="material-symbols-outlined mb-1">person</span>
<span class="font-label text-[10px] font-bold tracking-widest">PROFILE</span>
</div>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
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
                    "surface-container": "#1c211c",
                    "tertiary-fixed": "#ffe088",
                    "on-background": "#dfe4dd",
                    "on-tertiary-fixed": "#241a00",
                    "on-primary-fixed": "#002114",
                    "inverse-on-surface": "#2c322d",
                    "secondary-fixed": "#fcdeba",
                    "secondary-container": "#5a452b",
                    "on-tertiary-container": "#4e3d00",
                    "secondary": "#dfc29f",
                    "outline": "#88938c",
                    "surface-dim": "#101511",
                    "tertiary-fixed-dim": "#e9c349",
                    "on-surface-variant": "#bec9c1",
                    "surface-variant": "#313631",
                    "on-secondary-container": "#d0b492",
                    "background": "#101511",
                    "primary-fixed": "#a0f4ca",
                    "tertiary-container": "#cba72f",
                    "surface-container-lowest": "#0a0f0b",
                    "on-secondary-fixed-variant": "#574329",
                    "on-tertiary": "#3c2f00",
                    "surface-tint": "#84d7af",
                    "surface": "#101511",
                    "on-error-container": "#ffdad6",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "on-primary-container": "#8fe2ba",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-highest": "#313631",
                    "on-primary": "#003825",
                    "inverse-surface": "#dfe4dd",
                    "outline-variant": "#3f4943",
                    "primary": "#84d7af",
                    "on-secondary-fixed": "#281903",
                    "primary-container": "#006747",
                    "surface-bright": "#353a36",
                    "surface-container-low": "#181d19",
                    "secondary-fixed-dim": "#dfc29f",
                    "on-surface": "#dfe4dd",
                    "on-error": "#690005",
                    "inverse-primary": "#0b6c4b",
                    "error-container": "#93000a",
                    "primary-fixed-dim": "#84d7af",
                    "tertiary": "#e9c349",
                    "on-secondary": "#3f2d15",
                    "error": "#ffb4ab"
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
<body class="bg-background text-on-surface min-h-screen pb-24">
<!-- TopAppBar -->
<header class="bg-[#101511]/70 backdrop-blur-3xl fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4">
<div class="flex items-center gap-3">
<img alt="Profile" class="w-8 h-8 rounded-full border border-outline-variant/20" data-alt="close-up portrait of a professional golfer wearing a stylish dark cap and polo shirt with soft bokeh background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvw750V49uaXADY1qPlp2V7rLw9qV55lThenmVAEinAVTw1xjYwvZPMQ87ApEZhjj9cZYpip2_nCpj0Q07XVTDh8Tt6_pznZ9jyTKGm8wtfxaAggR2Hfscx57vderJ0HkJaOdRQ-BkFJyloo-_Fm3E8dw3OaIlPIxT33ZyoBcEdu19FEaFxntbAOMHomK_X9oJBCLeJLqQbiRLzINULcK-xygIgCO_FOunL9_1ZBLGchQxmVO24INNLntm0XWgxkxaXRkMf-uhl8"/>
</div>
<h1 class="text-2xl font-serif italic text-[#e9c349] tracking-tighter">STICKS</h1>
<div class="flex items-center">
<span class="material-symbols-outlined text-[#84d7af]" data-icon="notifications">notifications</span>
</div>
</header>
<main class="pt-24 px-6 max-w-5xl mx-auto">
<!-- Header Section -->
<section class="mb-10">
<div class="flex justify-between items-end">
<div>
<span class="font-label text-[10px] font-bold tracking-[0.2em] text-on-surface-variant block mb-2 uppercase">GENTLEMEN'S STAKES</span>
<h2 class="text-4xl font-serif font-light text-on-surface">The Locker Room</h2>
</div>
<div class="hidden md:flex gap-4">
<button class="bg-surface-container-high px-4 py-2 rounded-lg text-primary font-label text-xs tracking-widest font-bold border border-primary/10">HISTORY</button>
<button class="bg-gradient-to-br from-primary-container to-primary px-4 py-2 rounded-lg text-on-primary font-label text-xs tracking-widest font-bold">NEW WAGER</button>
</div>
</div>
</section>
<!-- Stats Bento -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
<div class="md:col-span-2 bg-surface-container-low p-6 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
<div class="z-10">
<span class="font-label text-[10px] text-secondary tracking-widest font-bold">SEASON BANKROLL</span>
<div class="text-5xl font-serif text-tertiary mt-2">$2,840.00</div>
</div>
<div class="z-10 flex gap-4 mt-4">
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-primary text-sm" data-icon="trending_up">trending_up</span>
<span class="text-xs text-on-surface-variant font-bold">+12% vs last month</span>
</div>
</div>
<!-- Abstract Texture background -->
<div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary-container/10 to-transparent opacity-40"></div>
</div>
<div class="bg-surface-container-high p-6 rounded-xl border-l-2 border-tertiary/40">
<span class="font-label text-[10px] text-on-surface-variant tracking-widest font-bold">PENDING SETTLEMENTS</span>
<div class="text-3xl font-serif text-on-surface mt-2">04</div>
<div class="mt-4 flex items-center justify-between">
<span class="text-xs text-secondary font-bold tracking-tighter">Total at risk: $450</span>
<span class="material-symbols-outlined text-secondary" data-icon="pending">pending</span>
</div>
</div>
</div>
<!-- Active Wagers Layout -->
<div class="flex flex-col gap-6">
<div class="flex items-center justify-between">
<h3 class="font-label text-[12px] font-bold tracking-[0.15em] text-on-surface-variant">ACTIVE WAGERS</h3>
<div class="h-[1px] flex-grow mx-4 bg-outline-variant/10"></div>
</div>
<!-- Bet Card 1: Active Nassau -->
<div class="bg-surface-container rounded-xl overflow-hidden group">
<div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center text-tertiary border border-tertiary/20">
<span class="material-symbols-outlined text-2xl" data-icon="golf_course">golf_course</span>
</div>
<div>
<div class="flex items-center gap-2">
<h4 class="font-serif text-xl">The Sunday Nassau</h4>
<span class="bg-primary-container/20 text-primary text-[9px] font-bold px-2 py-0.5 rounded tracking-widest">ACTIVE</span>
</div>
<p class="text-xs text-on-surface-variant font-medium mt-1">St. Andrews Links • Playing against <span class="text-on-surface">@j_mcavoy</span></p>
</div>
</div>
<div class="grid grid-cols-3 gap-8 text-center">
<div>
<div class="font-label text-[9px] text-on-surface-variant tracking-widest uppercase mb-1">FRONT 9</div>
<div class="font-serif text-lg text-on-surface">L +1</div>
</div>
<div>
<div class="font-label text-[9px] text-on-surface-variant tracking-widest uppercase mb-1">BACK 9</div>
<div class="font-serif text-lg text-tertiary">W +2</div>
</div>
<div>
<div class="font-label text-[9px] text-on-surface-variant tracking-widest uppercase mb-1">OVERALL</div>
<div class="font-serif text-lg text-primary">W +1</div>
</div>
</div>
<div class="flex flex-col items-end">
<div class="text-2xl font-serif text-tertiary">$150.00</div>
<div class="font-label text-[9px] text-secondary tracking-tighter uppercase font-bold">EST. PAYOUT</div>
</div>
</div>
<div class="bg-surface-container-low px-6 py-3 flex justify-between items-center">
<span class="text-[10px] text-on-surface-variant font-bold">Live at Hole 14</span>
<button class="text-[10px] text-primary tracking-widest font-bold uppercase hover:underline">VIEW SCORECARD</button>
</div>
</div>
<!-- Bet Card 2: Skins Game (Settled/Winner) -->
<div class="bg-surface-container-low rounded-xl overflow-hidden relative border border-tertiary/20">
<div class="absolute top-0 right-0 p-4">
<span class="material-symbols-outlined text-tertiary text-xl" data-icon="stars" style="font-variation-settings: 'FILL' 1;">stars</span>
</div>
<div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-2xl" data-icon="workspace_premium">workspace_premium</span>
</div>
<div>
<div class="flex items-center gap-2">
<h4 class="font-serif text-xl">Winter Skins Invitational</h4>
<span class="bg-surface-container-highest text-on-surface-variant text-[9px] font-bold px-2 py-0.5 rounded tracking-widest">SETTLED</span>
</div>
<p class="text-xs text-on-surface-variant font-medium mt-1">Augusta National • Competitive Group (4)</p>
</div>
</div>
<div class="flex items-center gap-4">
<div class="flex -space-x-3">
<img class="w-8 h-8 rounded-full border-2 border-surface-container-low" data-alt="blurred portrait of a male club member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgsN8NINitiddyjE34coQxVw2xFaMXNLYb-xIZDC7DWJIEzez-bTaPzuziHx6I83KSwpvqmMusmfv9d-Umjv02lVE0IeBhwVfqTGQsJpbx22cAVwOB0MhshPN-A4mhyLCFupEw5zrrRl7C_lRprhQRcPzJQsPlXJ4Th49iloGv-vLpligFvCmZQJtFr_eZMZGWCir5lHY9n3H9x1qyUJFRtSvzXcldU_AtGRwHBHddr4ap98kqQnz70jlqsqwBF4yXqMPxKqbqRR8"/>
<img class="w-8 h-8 rounded-full border-2 border-surface-container-low" data-alt="blurred portrait of a male club member in golf gear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQfLqP369-lKBOM7O-YaQQoajtiCNOpejdHR263dXs-ypbuZ9FCjMi0TuhrQ-P_niv9b_AzMoR18ut-V66RjEZbCg1fpv0DaR9O__GG8g0-5qZATBGuKdb4SO6TQBsdkE4GQRKyMV-TKYZS_xUTP3oVuPHzhp0NUMS-UgdoEOYrbm1NPwa9tyuFuDytza1tlVZsXjO_E8KWZp91Kj_U5dBht8zdp6laEwugt0IpRoszs5h9HP7gnAHJ6rNJivK2LMasZX_0HfUqzE"/>
<img class="w-8 h-8 rounded-full border-2 border-surface-container-low" data-alt="blurred portrait of a female club member in outdoor golf setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHO-8ViA8m3IeHSsWFn6_dDwa05sDmlJLrPgh6_WNhS67LsBNuxEuEuYB6Z75-bhZSTp-TFaczQtsHnyVa-oPDLFQ_5oYPkCTlVI2d_tvnVp751ZZF-w28dtJ6Mjv4mALIrEDKLrcB9Z75VoQ1krkDNRHp8diIF5045GfduZKR_yYNkcvmlZ7MDKtzZqdJWDQcBqAdxg1jWF4VXE0rd5YdCP7QIIAZr6cbDUUy-A84EXx8YD8cVJ_ELAQp3faT2E31Scj5SgGHZ4U"/>
</div>
<span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">+ YOU</span>
</div>
<div class="flex flex-col items-end">
<div class="text-2xl font-serif text-primary">+$420.00</div>
<div class="font-label text-[9px] text-on-surface-variant tracking-tighter uppercase font-bold">TOTAL WON</div>
</div>
</div>
</div>
<!-- Bet Card 3: Pending Wolf -->
<div class="bg-surface-container rounded-xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
<div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-2xl" data-icon="pets">pets</span>
</div>
<div>
<div class="flex items-center gap-2">
<h4 class="font-serif text-xl text-on-surface-variant">The Wolf Round</h4>
<span class="bg-surface-container-highest text-secondary text-[9px] font-bold px-2 py-0.5 rounded tracking-widest">PENDING</span>
</div>
<p class="text-xs text-on-surface-variant font-medium mt-1">TPC Sawgrass • Sat, Dec 14th</p>
</div>
</div>
<div class="flex gap-2">
<button class="bg-outline-variant/10 text-on-surface-variant text-[10px] font-bold px-4 py-2 rounded-lg tracking-widest uppercase hover:bg-outline-variant/20">DECLINE</button>
<button class="bg-surface-container-highest text-tertiary text-[10px] font-bold px-4 py-2 rounded-lg tracking-widest uppercase border border-tertiary/20">ACCEPT WAGER</button>
</div>
</div>
</div>
</div>
<!-- Rules & Types (Editorial Section) -->
<section class="mt-16 mb-24">
<h3 class="font-label text-[12px] font-bold tracking-[0.15em] text-on-surface-variant mb-6">POPULAR GAME FORMATS</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="bg-surface-container-low p-6 rounded-xl border-l-2 border-primary/20">
<h5 class="font-serif text-xl mb-2">The Nassau</h5>
<p class="text-sm text-on-surface-variant leading-relaxed mb-4">A three-part bet covering the front nine, back nine, and total 18 holes. Perfect for long rounds with variable performance.</p>
<a class="text-primary font-label text-[10px] tracking-widest font-bold uppercase hover:underline" href="#">Read House Rules</a>
</div>
<div class="bg-surface-container-low p-6 rounded-xl border-l-2 border-secondary/20">
<h5 class="font-serif text-xl mb-2">Skins Game</h5>
<p class="text-sm text-on-surface-variant leading-relaxed mb-4">Each hole is a "skin". If a hole is tied, the skin carries over to the next. The highest risk-reward format in the clubhouse.</p>
<a class="text-secondary font-label text-[10px] tracking-widest font-bold uppercase hover:underline" href="#">Read House Rules</a>
</div>
</div>
</section>
</main>
<!-- FAB for Mobile -->
<div class="md:hidden fixed bottom-24 right-6 z-50">
<button class="w-14 h-14 bg-gradient-to-br from-primary-container to-primary rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,56,37,0.4)] text-on-primary">
<span class="material-symbols-outlined text-3xl" data-icon="add">add</span>
</button>
</div>
<!-- BottomNavBar -->
<nav class="bg-[#101511]/80 backdrop-blur-xl fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-xl shadow-[0_-8px_24px_rgba(0,56,37,0.4)]">
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3">
<span class="material-symbols-outlined mb-1" data-icon="home">home</span>
<span class="font-label text-[10px] font-bold tracking-widest">HOME</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3">
<span class="material-symbols-outlined mb-1" data-icon="golf_course">golf_course</span>
<span class="font-label text-[10px] font-bold tracking-widest">PLAY</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3">
<span class="material-symbols-outlined mb-1" data-icon="leaderboard">leaderboard</span>
<span class="font-label text-[10px] font-bold tracking-widest">RANK</span>
</div>
<div class="flex flex-col items-center justify-center text-[#84d7af] bg-[#006747]/20 rounded-lg py-1 px-3">
<span class="material-symbols-outlined mb-1" data-icon="payments" style="font-variation-settings: 'FILL' 1;">payments</span>
<span class="font-label text-[10px] font-bold tracking-widest">BETS</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3">
<span class="material-symbols-outlined mb-1" data-icon="person">person</span>
<span class="font-label text-[10px] font-bold tracking-widest">PROFILE</span>
</div>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks | Leaderboard</title>
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
                    "surface-container": "#1c211c",
                    "tertiary-fixed": "#ffe088",
                    "on-background": "#dfe4dd",
                    "on-tertiary-fixed": "#241a00",
                    "on-primary-fixed": "#002114",
                    "inverse-on-surface": "#2c322d",
                    "secondary-fixed": "#fcdeba",
                    "secondary-container": "#5a452b",
                    "on-tertiary-container": "#4e3d00",
                    "secondary": "#dfc29f",
                    "outline": "#88938c",
                    "surface-dim": "#101511",
                    "tertiary-fixed-dim": "#e9c349",
                    "on-surface-variant": "#bec9c1",
                    "surface-variant": "#313631",
                    "on-secondary-container": "#d0b492",
                    "background": "#101511",
                    "primary-fixed": "#a0f4ca",
                    "tertiary-container": "#cba72f",
                    "surface-container-lowest": "#0a0f0b",
                    "on-secondary-fixed-variant": "#574329",
                    "on-tertiary": "#3c2f00",
                    "surface-tint": "#84d7af",
                    "surface": "#101511",
                    "on-error-container": "#ffdad6",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "on-primary-container": "#8fe2ba",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-highest": "#313631",
                    "on-primary": "#003825",
                    "inverse-surface": "#dfe4dd",
                    "outline-variant": "#3f4943",
                    "primary": "#84d7af",
                    "on-secondary-fixed": "#281903",
                    "primary-container": "#006747",
                    "surface-bright": "#353a36",
                    "surface-container-low": "#181d19",
                    "secondary-fixed-dim": "#dfc29f",
                    "on-surface": "#dfe4dd",
                    "on-error": "#690005",
                    "inverse-primary": "#0b6c4b",
                    "error-container": "#93000a",
                    "primary-fixed-dim": "#84d7af",
                    "tertiary": "#e9c349",
                    "on-secondary": "#3f2d15",
                    "error": "#ffb4ab"
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
        body { font-family: 'Manrope', sans-serif; background-color: #101511; color: #dfe4dd; }
        .serif { font-family: 'Newsreader', serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="fixed top-0 z-50 w-full bg-[#101511]/70 backdrop-blur-3xl px-6 py-4 flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30">
<img class="w-full h-full object-cover" data-alt="professional portrait of a sophisticated golfer in a private club setting, soft warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGwaaibNBD41faSdenn3RbZK6FQXvj3KNUMpnDItIyiUqY_8HQ8Tz62M7behYLJlXhkIwg6bOZzvG8v52PvgHbzj7hGkn2vXs8O3v7jZ_1HEGm2J_3_7urFoKpTK9LZzcdIwxenaNR9LZ4ktgHKC5LKKRrQW8_0b7lLYlrgexOXuKnmHlNcU-1iYys6pdPVhuDBCNx1f5ZQKkHHaTfNOz0BX-sGTVJwjmEhxUg5xG883Wc0ad5nVZ07xMcjx4fSOIh6AedntrBpD0"/>
</div>
<span class="text-2xl font-serif italic text-[#e9c349] tracking-tighter uppercase">STICKS</span>
</div>
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af]" data-icon="notifications">notifications</span>
</div>
</header>
<main class="pt-24 px-6 max-w-5xl mx-auto">
<!-- Live Ticker Style Header -->
<div class="mb-10">
<div class="flex items-baseline justify-between mb-2">
<h1 class="text-5xl font-headline italic tracking-tight text-on-surface">The Rankings</h1>
<div class="flex items-center gap-2 px-3 py-1 bg-primary-container/20 rounded-full">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span class="text-[10px] font-label font-bold tracking-widest text-primary uppercase">LIVE UPDATES</span>
</div>
</div>
<div class="h-[1px] w-full bg-gradient-to-r from-primary/50 via-outline-variant/20 to-transparent"></div>
</div>
<!-- Tier Tabs (Asymmetric Layout) -->
<div class="flex gap-4 mb-12 overflow-x-auto no-scrollbar">
<button class="flex-none px-6 py-2 bg-primary-container text-on-primary-container rounded-full text-[10px] font-bold tracking-widest font-label">GLOBAL ELITE</button>
<button class="flex-none px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold tracking-widest font-label hover:bg-surface-container-highest transition-colors">AUGUSTA CLUB</button>
<button class="flex-none px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold tracking-widest font-label hover:bg-surface-container-highest transition-colors">FRIENDS</button>
</div>
<!-- Top 3 Spotlight: The Podium (Asymmetric Cards) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end">
<!-- Rank 2 -->
<div class="order-2 md:order-1 bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="text-8xl font-headline italic">2</span>
</div>
<div class="relative z-10">
<div class="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-outline-variant/30">
<img class="w-full h-full object-cover" data-alt="close up headshot of a focused female golfer looking at camera" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaJ8iHW27wV9Rdp9KUowXMr70Ljq9Xdh1hGCeM9_V3uCjPTMW3VR8VZAU730-V7OhF_DteLw6hyDBxbgof--7NorzuWRAexXFX5v-6kwb9S3lzst8TC5dwC7ZnDuSbHd0z-2e0hzXPP-eExkz7oxE7Ka5KpvHj-gaixNxnAFDhr0Nusni2TvC15XOiM5lw_vHHtWgaUO1V1IwkFFT77bD7WJsvwnokdnWdLkkCD8TVCy84elQzE9Mxc71bjOtEWvTjQDXihJs3plc"/>
</div>
<p class="text-[10px] font-label font-bold tracking-widest text-on-surface-variant mb-1 uppercase">SILVER TIER</p>
<h3 class="text-2xl font-headline text-on-surface mb-4">Evelyn Vance</h3>
<div class="flex items-baseline gap-2">
<span class="text-3xl font-headline italic text-on-surface">2,840</span>
<span class="text-[10px] font-label text-on-surface-variant tracking-widest">PTS</span>
</div>
</div>
</div>
<!-- Rank 1 (The Winner's Edge) -->
<div class="order-1 md:order-2 bg-surface-container border border-tertiary/40 rounded-xl p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform md:-translate-y-6">
<div class="absolute -top-12 -right-12 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl"></div>
<div class="absolute top-0 right-0 p-4">
<span class="material-symbols-outlined text-tertiary text-4xl" data-icon="stars" style="font-variation-settings: 'FILL' 1;">stars</span>
</div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-tertiary ring-8 ring-tertiary/10">
<img class="w-full h-full object-cover" data-alt="portrait of an athletic man in golf attire with a confident expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdnWoj1gWmQamABWXLc-O0hhm73wRaaDOgj5LU5rysVcfyNAk9RzJhfSj9HWiPscJVn0Xssy_doB78m4ugAHwEL7xsIhRJtnRm-5HA6Ett7082QPejXiX1foQaNLJ10hBH6P9J1OKsgTSOLSvZPVb9b0ChQ-ODbraZszssoUaeGxGpr19MG8AlNu18BTUQZgIMEc1GcL54JVVTtutaBH2p0JElZGxNrJqWykuAe1IESFyFeJHGnJQ0O12tOmB4Ivb4JBNrLev6IzU"/>
</div>
<p class="text-[10px] font-label font-bold tracking-widest text-tertiary mb-1 uppercase">REIGNING CHAMPION</p>
<h3 class="text-4xl font-headline italic text-on-surface mb-4">Arthur Sterling</h3>
<div class="flex items-baseline gap-2">
<span class="text-5xl font-headline italic text-tertiary">3,120</span>
<span class="text-xs font-label text-on-surface-variant tracking-widest uppercase">POINTS</span>
</div>
</div>
</div>
<!-- Rank 3 -->
<div class="order-3 md:order-3 bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="text-8xl font-headline italic">3</span>
</div>
<div class="relative z-10">
<div class="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-outline-variant/30">
<img class="w-full h-full object-cover" data-alt="portrait of a young woman smiling in a casual sporty setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpOPsgeX_tq9gg5DLJJg0eG8JYCaOKbFWwKXztpypxwHZ9WTpcoG5CWQXj_OqmSlSF3CsRTLr9YHbsY3WSADZ52SFefmENRu7jet0J0EtsNfdnsh9gzTK0PA8X1sLls14BooWZeFQmp35xkEmnA1xNBVlz7YT67QDphUlKoaFvRlXireZ9lLofewBj17iZ23eJqt_3usCXZoJbWQKiVRftM5JtrVaKyp5LECDN2qNMqP8lGYJCzAndTkegX7gHsaPhE_Yz4SCZvTw"/>
</div>
<p class="text-[10px] font-label font-bold tracking-widest text-on-secondary-container mb-1 uppercase">BRONZE TIER</p>
<h3 class="text-2xl font-headline text-on-surface mb-4">Maya Rossi</h3>
<div class="flex items-baseline gap-2">
<span class="text-3xl font-headline italic text-on-surface">2,715</span>
<span class="text-[10px] font-label text-on-surface-variant tracking-widest">PTS</span>
</div>
</div>
</div>
</div>
<!-- Detailed Leaderboard Table -->
<div class="bg-surface-container-low rounded-xl overflow-hidden mb-12">
<!-- Table Header -->
<div class="grid grid-cols-12 gap-4 px-8 py-4 bg-surface-container-high/50">
<div class="col-span-1 text-[10px] font-label font-bold tracking-widest text-on-surface-variant uppercase">RANK</div>
<div class="col-span-6 text-[10px] font-label font-bold tracking-widest text-on-surface-variant uppercase">PLAYER</div>
<div class="col-span-3 text-[10px] font-label font-bold tracking-widest text-on-surface-variant text-right uppercase">HANDICAP</div>
<div class="col-span-2 text-[10px] font-label font-bold tracking-widest text-on-surface-variant text-right uppercase">SCORE</div>
</div>
<!-- Table Rows (Tonal Transitions) -->
<div class="divide-y divide-outline-variant/10">
<!-- Row 4 -->
<div class="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-surface-container transition-colors group">
<div class="col-span-1 font-headline italic text-xl text-on-surface-variant">4</div>
<div class="col-span-6 flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="man in golf apparel in a bright outdoor environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXCXkV9hu4zYGKcAd4EU1GEk0VAiNfDMTHPbLSCynt_zitZdZk-Az1x8BHvPgA6QOUl1R9tYGaPZcIyHu7NYlAUTRW5BFGAYYqU_glSWAuvLsM5xCkLtcSt5RjBNH2npgmW_47rOqHBcv7XFOz8ZcdGq5IQ-MGLebzPAebw3MoiiRd6oa50xUzY9EnoupVvBzJiFiLsmwU-2gadCl6ZOaC_rLfROahDCT6i7j2nb6xo9J6_xnXpHqoLEUZclricbnQfunAWebMzd4"/>
</div>
<div>
<p class="text-on-surface font-semibold">Julian Chen</p>
<p class="text-[10px] font-label text-primary uppercase">MEMBER SINCE '22</p>
</div>
</div>
<div class="col-span-3 text-right font-headline text-lg text-on-surface-variant">3.2</div>
<div class="col-span-2 text-right font-headline italic text-xl text-on-surface">2,450</div>
</div>
<!-- Row 5 -->
<div class="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-surface-container transition-colors">
<div class="col-span-1 font-headline italic text-xl text-on-surface-variant">5</div>
<div class="col-span-6 flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="woman golfer in modern sportswear laughing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7m6BVgtPSe7uF4WwZEt_zuBaMA_F7SeoDU8nU2nPh7hVPeB5mKjKbIIBg4OGuiCNQgTwkm5mCKYAwIB6A-uuEsX5TKRQ0Hz8v-KQSXjt8Vnr2MdXPAK4lsuHn7yHDfDNI3y-OfkROyR_GaOkerVmPicnGRKV7zTUbPBenbSdyJSCJAv2laRkV1KhVck-o6xdYLbELSaWmwBxFHb-0YviLbrU8EGeWoFiN3rl9kQ6KPVZb8VI-KJ2OqU6HldephG2O5Uz2AsPncRI"/>
</div>
<div>
<p class="text-on-surface font-semibold">Sophia Laurent</p>
<p class="text-[10px] font-label text-primary uppercase">MEMBER SINCE '23</p>
</div>
</div>
<div class="col-span-3 text-right font-headline text-lg text-on-surface-variant">4.5</div>
<div class="col-span-2 text-right font-headline italic text-xl text-on-surface">2,390</div>
</div>
<!-- Row 6 -->
<div class="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-surface-container transition-colors">
<div class="col-span-1 font-headline italic text-xl text-on-surface-variant">6</div>
<div class="col-span-6 flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="middle aged man in refined clothing with a professional background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD3TQBRZjbGPPJ-AHdw5lAHSyvA3XLHygXaNL8dPPwqQA0JRdo0qRetO43y4o7Npw-RMgrRHIRO3KqhZeX219M_NBL6pCddgFh339m1MZ0THiidCot44vot4Qwjxwp5i6cNPNEaBZkINKQ_7gn7-P0PuH2QYd__J-bGs_zxR4ORfpwYjYWfRaU4BfD15edKscn5l_aUYjAfbfP3LGWc7KgmgXLPPnDS2VsVSpUVWGtMJwIxNmBXGOXcThArzsKOPyygUJXxj4Vn5E"/>
</div>
<div>
<p class="text-on-surface font-semibold">Marcus Webb</p>
<p class="text-[10px] font-label text-primary uppercase">MEMBER SINCE '21</p>
</div>
</div>
<div class="col-span-3 text-right font-headline text-lg text-on-surface-variant">2.1</div>
<div class="col-span-2 text-right font-headline italic text-xl text-on-surface">2,310</div>
</div>
<!-- Personal Rank Highlight -->
<div class="grid grid-cols-12 gap-4 px-8 py-6 items-center bg-primary-container/10 border-y border-primary/20">
<div class="col-span-1 font-headline italic text-xl text-primary">12</div>
<div class="col-span-6 flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
<img class="w-full h-full object-cover" data-alt="personal user profile photo for golf app" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3pTqMx-_8vVhFgRUbd3Ne2836pDO1-tv7O4bJOAYj1EeHyCiU39639kXskviDJgp1TSvhJbJgrDw2ohE2upXvrKCs7IUJe27FJ21yXO-B8-EOtDYpxPOYXuiS8493cM6h5YtQLQCaPBQzWahXXDl3AhzgEBu0skOQx7IYL-kJo_21s8p_0luH6pj_45-PuF3r54kzG6W6kVpbPIvoqkV6aBzF4rxHQG9vCd78holME-HQNIhMzE9uQhBndPw1mf1QHHSIS_A33s"/>
</div>
<div>
<p class="text-on-surface font-bold">You (Member Profile)</p>
<p class="text-[10px] font-label text-primary uppercase">ASCENDING +4 SPOTS</p>
</div>
</div>
<div class="col-span-3 text-right font-headline text-lg text-on-surface-variant">8.9</div>
<div class="col-span-2 text-right font-headline italic text-xl text-primary">1,890</div>
</div>
</div>
</div>
<!-- Live Feed Ticker Card -->
<div class="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
<div class="flex items-center justify-between mb-6">
<h4 class="text-[10px] font-label font-bold tracking-[0.2rem] text-on-surface-variant uppercase">ROUND FEED</h4>
<span class="text-[10px] font-label text-primary uppercase">REAL-TIME</span>
</div>
<div class="space-y-6">
<div class="flex gap-4">
<div class="w-1 h-auto bg-tertiary rounded-full"></div>
<div>
<p class="text-sm text-on-surface"><span class="font-bold">Arthur Sterling</span> just sank a 20ft birdie on Hole 14.</p>
<p class="text-[10px] font-label text-on-surface-variant mt-1 uppercase">2 MINUTES AGO</p>
</div>
</div>
<div class="flex gap-4">
<div class="w-1 h-auto bg-primary rounded-full"></div>
<div>
<p class="text-sm text-on-surface"><span class="font-bold">Julian Chen</span> finished Round at <span class="text-primary">-2</span>.</p>
<p class="text-[10px] font-label text-on-surface-variant mt-1 uppercase">8 MINUTES AGO</p>
</div>
</div>
</div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full bg-[#101511]/80 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-xl shadow-[0_-8px_24px_rgba(0,56,37,0.4)]">
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="text-[10px] font-label font-bold tracking-widest mt-1">HOME</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined" data-icon="golf_course">golf_course</span>
<span class="text-[10px] font-label font-bold tracking-widest mt-1">PLAY</span>
</a>
<!-- Active Tab: RANK -->
<a class="flex flex-col items-center justify-center text-[#84d7af] bg-[#006747]/20 rounded-lg py-1 px-3 active:scale-90 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard" style="font-variation-settings: 'FILL' 1;">leaderboard</span>
<span class="text-[10px] font-label font-bold tracking-widest mt-1">RANK</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="text-[10px] font-label font-bold tracking-widest mt-1">BETS</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="text-[10px] font-label font-bold tracking-widest mt-1">PROFILE</span>
</a>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - New Round</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container": "#1c211c",
                        "tertiary-fixed": "#ffe088",
                        "on-background": "#dfe4dd",
                        "on-tertiary-fixed": "#241a00",
                        "on-primary-fixed": "#002114",
                        "inverse-on-surface": "#2c322d",
                        "secondary-fixed": "#fcdeba",
                        "secondary-container": "#5a452b",
                        "on-tertiary-container": "#4e3d00",
                        "secondary": "#dfc29f",
                        "outline": "#88938c",
                        "surface-dim": "#101511",
                        "tertiary-fixed-dim": "#e9c349",
                        "on-surface-variant": "#bec9c1",
                        "surface-variant": "#313631",
                        "on-secondary-container": "#d0b492",
                        "background": "#101511",
                        "primary-fixed": "#a0f4ca",
                        "tertiary-container": "#cba72f",
                        "surface-container-lowest": "#0a0f0b",
                        "on-secondary-fixed-variant": "#574329",
                        "on-tertiary": "#3c2f00",
                        "surface-tint": "#84d7af",
                        "surface": "#101511",
                        "on-error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#574500",
                        "surface-container-high": "#262b27",
                        "on-primary-container": "#8fe2ba",
                        "on-primary-fixed-variant": "#005137",
                        "surface-container-highest": "#313631",
                        "on-primary": "#003825",
                        "inverse-surface": "#dfe4dd",
                        "outline-variant": "#3f4943",
                        "primary": "#84d7af",
                        "on-secondary-fixed": "#281903",
                        "primary-container": "#006747",
                        "surface-bright": "#353a36",
                        "surface-container-low": "#181d19",
                        "secondary-fixed-dim": "#dfc29f",
                        "on-surface": "#dfe4dd",
                        "on-error": "#690005",
                        "inverse-primary": "#0b6c4b",
                        "error-container": "#93000a",
                        "primary-fixed-dim": "#84d7af",
                        "tertiary": "#e9c349",
                        "on-secondary": "#3f2d15",
                        "error": "#ffb4ab"
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
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #101511;
            color: #dfe4dd;
        }
        .serif-text {
            font-family: 'Newsreader', serif;
        }
        .all-caps-label {
            font-family: 'Manrope', sans-serif;
            letter-spacing: 0.05rem;
            text-transform: uppercase;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
<!-- TopAppBar -->
<header class="bg-[#101511]/70 backdrop-blur-3xl fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high ring-1 ring-outline-variant/30">
<img class="w-full h-full object-cover" data-alt="close-up portrait of a sophisticated man with a short beard in high-end golf apparel against a soft green background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGitoZ8XueI7EPVrrB71m7icaj8Er9Rpgkl9ZspZ1x_Fb_KZ83hrjDA9rJxJmonozDy5DQRjXYFPNbLYWecUsaysRCibtKV_Yvj_gUxacRAY7BfmEpXt8bkSeJjQLxKM1qm2q8fVwGiC13XJ5smckFVgTxteR810_75P4wJhUf-ZVbXU64QFgtqccb83451zVvplYH64kljK-7hgRCT_LA2mjc7eo1JnBqaal0FAU_EedN9w5R_lVXBOY5jaG0D6ZwoK1M2M0LoBo"/>
</div>
</div>
<h1 class="text-2xl font-serif italic text-[#e9c349] tracking-tighter">STICKS</h1>
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af]">notifications</span>
</div>
</header>
<main class="pt-24 pb-32 px-6 max-w-2xl mx-auto min-h-screen">
<!-- Hero Section -->
<section class="mb-10">
<h2 class="serif-text text-4xl font-bold tracking-tight mb-2">New Round</h2>
<p class="text-on-surface-variant font-body text-sm tracking-wide">Enter the arena. Record your legacy.</p>
</section>
<!-- Bento Grid for Selection -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
<!-- Course Selection Card -->
<div class="md:col-span-2 group relative overflow-hidden bg-surface-container-low rounded-lg p-6 flex flex-col justify-end min-h-[220px]">
<div class="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
<img class="w-full h-full object-cover opacity-40 mix-blend-luminosity" data-alt="dramatic aerial view of a professional golf course green with deep shadows and vibrant sunset lighting over rolling hills" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkrry0fg1dJ3tIiOf4BkYlSG11r1gU9hXEkm08-SFMicRqXGeCag74wGUhS8XSmCP4mLp6cphV7lbD9II8zrhczrqPdoup8OQCqdMOz318pUmZWk3u8YQwz04q3hKD7osgsYshueeaUcA7roVT-23tNyXGv73Szt1rQu5mCdaJ27SZbXrVAyjYSkWzNRva75f7Lz-yWBi-VJdr09_gTB109Dfyy_z61aIYSxFGfzatNeU6-s4uVqcpyTcU8KWpqFeuZVyB6Eorsz8"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
</div>
<div class="relative z-10">
<span class="all-caps-label text-[10px] text-tertiary mb-2 block">SELECTED COURSE</span>
<h3 class="serif-text text-2xl font-bold mb-1">Cypress Hollow Club</h3>
<div class="flex items-center text-on-surface-variant gap-2 text-xs">
<span class="material-symbols-outlined text-[14px]">location_on</span>
<span>Monterey Peninsula, CA</span>
</div>
</div>
<button class="absolute top-6 right-6 p-2 rounded-full bg-surface-container/60 backdrop-blur-md text-primary transition-all hover:bg-primary-container hover:text-on-primary-container">
<span class="material-symbols-outlined">swap_horiz</span>
</button>
</div>
<!-- Tee Box Selection -->
<div class="bg-surface-container rounded-lg p-6 flex flex-col gap-4">
<span class="all-caps-label text-[10px] text-on-surface-variant">TEE BOX</span>
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between p-3 rounded bg-surface-container-lowest border border-primary/20">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-surface-on-surface shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
<span class="text-sm font-bold tracking-tight">CHAMPIONSHIP</span>
</div>
<span class="text-xs text-primary font-bold">7,240 YDS</span>
</div>
<div class="flex items-center justify-between p-3 rounded bg-surface-container-low hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-primary-container ring-1 ring-primary/30"></div>
<span class="text-sm font-medium text-on-surface-variant">TOURNAMENT</span>
</div>
<span class="text-xs text-on-surface-variant">6,812 YDS</span>
</div>
</div>
</div>
<!-- Scoring Format -->
<div class="bg-surface-container rounded-lg p-6 flex flex-col gap-4">
<span class="all-caps-label text-[10px] text-on-surface-variant">FORMAT</span>
<div class="flex flex-col gap-2 h-full">
<div class="flex items-center gap-4 p-3 bg-surface-container-lowest rounded border-l-2 border-tertiary">
<span class="material-symbols-outlined text-tertiary">military_tech</span>
<div>
<p class="text-sm font-bold">STROKE PLAY</p>
<p class="text-[10px] text-on-surface-variant">Official Competition</p>
</div>
</div>
<div class="flex items-center gap-4 p-3 bg-surface-container-low rounded opacity-60">
<span class="material-symbols-outlined text-on-surface-variant">groups</span>
<div>
<p class="text-sm font-medium">MATCH PLAY</p>
<p class="text-[10px] text-on-surface-variant">Head-to-Head</p>
</div>
</div>
</div>
</div>
</div>
<!-- Player Selection -->
<section class="mb-10">
<div class="flex justify-between items-end mb-4">
<h3 class="all-caps-label text-xs font-bold text-on-surface-variant">THE ROSTER</h3>
<span class="text-[10px] text-primary">1 / 4 SLOTS FILLED</span>
</div>
<div class="space-y-3">
<div class="flex items-center justify-between p-4 bg-surface-container rounded-lg">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full overflow-hidden bg-primary-container/20 ring-2 ring-primary/40 p-0.5">
<img class="w-full h-full rounded-full object-cover" data-alt="close-up portrait of a golfer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG5_MPSzwTlqt4vBBWz9h9J8Re5JPM0Pu_lZGihJzj5qb-nKjgzhp5zv6W8jdERT3iyPsZ11bKh4BXgaQWhpc__uErgZ4Or5z4hgHnK67gpSMB1sw192siXyHkUxhWzjsVr0S0hLLK5hMDdV0M8besOKp1mSIS-iRfPiz70Ont7tDS8Rc_qOgTVQzuaoXYAc4sF9FQZ-PfGWtlkTpopUtggFwmhN1lOd-rOId_uzAqkv_b9c9zZRMuFl3A9ZkT8j5gkBhff_QF8aY"/>
</div>
<div>
<p class="font-bold text-sm">YOU</p>
<p class="text-[10px] text-tertiary">HCAP: +2.1</p>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant/40">lock</span>
</div>
<button class="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-outline-variant/30 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:border-primary/40 transition-all group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
<span class="all-caps-label text-xs font-bold">INVITE PLAYERS</span>
</button>
</div>
</section>
<!-- CTA Action -->
<div class="fixed bottom-24 left-0 w-full px-6 pointer-events-none">
<button class="pointer-events-auto w-full max-w-2xl mx-auto py-5 bg-gradient-to-r from-secondary-container to-[#5a452b] rounded-lg shadow-[0_8px_24px_rgba(0,56,37,0.4)] flex items-center justify-center gap-3 group transition-transform active:scale-95 duration-200">
<span class="material-symbols-outlined text-on-secondary-container group-hover:translate-x-1 transition-transform">golf_course</span>
<span class="all-caps-label font-extrabold text-on-secondary-container text-sm">START CHAMPIONSHIP ROUND</span>
</button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="bg-[#101511]/80 backdrop-blur-xl fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-xl shadow-[0_-8px_24px_rgba(0,56,37,0.4)]">
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">home</span>
<span class="Manrope all-caps text-[10px] font-bold tracking-widest mt-1">HOME</span>
</a>
<a class="flex flex-col items-center justify-center text-[#84d7af] bg-[#006747]/20 rounded-lg py-1 px-3 hover:text-on-surface transition-all scale-90 duration-150" href="#">
<span class="material-symbols-outlined">golf_course</span>
<span class="Manrope all-caps text-[10px] font-bold tracking-widest mt-1">PLAY</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">leaderboard</span>
<span class="Manrope all-caps text-[10px] font-bold tracking-widest mt-1">RANK</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">payments</span>
<span class="Manrope all-caps text-[10px] font-bold tracking-widest mt-1">BETS</span>
</a>
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">person</span>
<span class="Manrope all-caps text-[10px] font-bold tracking-widest mt-1">PROFILE</span>
</a>
</nav>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - The Clubhouse Feed</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400;1,6..72,700&amp;family=Manrope:wght@400;500;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-tertiary-container": "#4e3d00",
                    "secondary-container": "#5a452b",
                    "on-background": "#dfe4dd",
                    "outline": "#88938c",
                    "surface-variant": "#313631",
                    "primary": "#84d7af",
                    "background": "#101511",
                    "error": "#ffb4ab",
                    "primary-fixed-dim": "#84d7af",
                    "surface-tint": "#84d7af",
                    "primary-container": "#006747",
                    "on-surface": "#dfe4dd",
                    "on-secondary-fixed-variant": "#574329",
                    "on-secondary-fixed": "#281903",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-highest": "#313631",
                    "surface": "#101511",
                    "surface-container-high": "#262b27",
                    "on-primary-fixed": "#002114",
                    "on-error-container": "#ffdad6",
                    "tertiary-fixed-dim": "#e9c349",
                    "surface-bright": "#353a36",
                    "outline-variant": "#3f4943",
                    "on-tertiary": "#3c2f00",
                    "on-secondary": "#3f2d15",
                    "surface-container-low": "#181d19",
                    "on-tertiary-fixed-variant": "#574500",
                    "on-primary-container": "#8fe2ba",
                    "secondary-fixed-dim": "#dfc29f",
                    "error-container": "#93000a",
                    "surface-container": "#1c211c",
                    "primary-fixed": "#a0f4ca",
                    "tertiary-fixed": "#ffe088",
                    "secondary": "#dfc29f",
                    "inverse-primary": "#0b6c4b",
                    "tertiary": "#e9c349",
                    "surface-dim": "#101511",
                    "on-tertiary-fixed": "#241a00",
                    "surface-container-lowest": "#0a0f0b",
                    "on-primary": "#003825",
                    "on-error": "#690005",
                    "inverse-surface": "#dfe4dd",
                    "on-surface-variant": "#bec9c1",
                    "secondary-fixed": "#fcdeba",
                    "tertiary-container": "#cba72f",
                    "on-secondary-container": "#d0b492",
                    "inverse-on-surface": "#2c322d"
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
        body { font-family: 'Manrope', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen pb-24">
<!-- TopAppBar component -->
<header class="fixed top-0 w-full z-50 bg-[#101511]/70 backdrop-blur-2xl flex justify-between items-center px-6 h-16 w-full border-b border-outline-variant/10">
<div class="flex items-center gap-3 transition-opacity hover:opacity-80">
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
<img alt="user profile picture" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlJ9qwbW1E3OfcYHsKpU5zSNk-nvIq2fytOnrIlGBBq_3gz9u3M29nsMgLxm28fb8xu609jPMcgPbkD_k4g23WsaLWsaT18UEUxMoZqjtRN5oYz9osedOAoxCW6chZTWSepZALq_ZrqErSGZsS3Yt5U5MI2R7Dl3a8J0nKRfgjDGX3ZbDnTZ4-4M4wchd-pMUczSowEuiG5SOUDdjP36kwRUcqSi21cVKO3iJWDG4Mn1q3F_cBjHE5gcUfPBycwbS5OeZkMhfcsOw"/>
</div>
<span class="text-2xl font-bold italic text-[#dfe4dd] tracking-tighter font-headline">STICKS</span>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-[#84d7af] text-2xl hover:opacity-80 active:scale-95 transition-all">notifications</button>
</div>
</header>
<main class="pt-16 max-w-lg mx-auto">
<!-- Segmented Toggle - High-end Integrated style -->
<div class="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-outline-variant/10">
<nav class="flex px-4 h-12">
<button class="relative flex-1 text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                Following
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
</button>
<button class="flex-1 text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant hover:text-on-surface transition-colors">Local</button>
<button class="flex-1 text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant hover:text-on-surface transition-colors">Global</button>
</nav>
</div>
<!-- Feed Content -->
<div class="space-y-1">
<!-- Live Round Status Card (Twitter-style In-feed Integration) -->
<section class="px-4 py-4 border-b border-outline-variant/10 bg-surface-container-low/30">
<div class="flex items-start gap-3">
<div class="relative flex-shrink-0">
<img class="w-12 h-12 rounded-full border-2 border-primary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo5ixFrW5JopgVCSjm0zW2K1nTV4fKV4CzkV4I7dgLcxPyTNuvq1gRoUyhFXkyCewtxQZqTLt0U4bMGhzsdxT4Ew3yNBEcPrgJ0y0ZicaWU02BioA0l7k9RiCEQSJpCsyzxiphK8YzWt8yJia0B-q_EWZysED2VzdcXwpxqrm1yAaTCJrZryg_LysR-b1WYWOqUwiXIZQeQ84V6vXcxWO7TsWcIjTjo8C0ZWe2bV-bC7llrwumSqHUUMf8bW0RY0p8sr9rBvY5q2k"/>
<span class="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-tighter">Live</span>
</div>
<div class="flex-1">
<div class="flex justify-between items-start">
<div>
<div class="flex items-center gap-1">
<span class="font-bold text-sm">Rory McIlroy</span>
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">verified</span>
</div>
<p class="text-on-surface-variant text-[10px] uppercase tracking-wider">Augusta National GC</p>
</div>
<div class="text-right">
<span class="text-xl font-headline italic font-bold text-primary">-2</span>
<p class="text-[9px] uppercase font-bold text-on-surface-variant">Thru 14</p>
</div>
</div>
<div class="mt-3 bg-surface-container-highest/50 h-1 rounded-full overflow-hidden">
<div class="w-[77%] h-full bg-primary shadow-[0_0_8px_rgba(132,215,175,0.4)]"></div>
</div>
</div>
</div>
</section>
<!-- Video Post: Killer Drive (Instagram/Twitter Hybrid) -->
<article class="bg-background border-b border-outline-variant/10 pb-4">
<div class="flex items-center justify-between p-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full overflow-hidden border border-outline-variant/30">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo5ixFrW5JopgVCSjm0zW2K1nTV4fKV4CzkV4I7dgLcxPyTNuvq1gRoUyhFXkyCewtxQZqTLt0U4bMGhzsdxT4Ew3yNBEcPrgJ0y0ZicaWU02BioA0l7k9RiCEQSJpCsyzxiphK8YzWt8yJia0B-q_EWZysED2VzdcXwpxqrm1yAaTCJrZryg_LysR-b1WYWOqUwiXIZQeQ84V6vXcxWO7TsWcIjTjo8C0ZWe2bV-bC7llrwumSqHUUMf8bW0RY0p8sr9rBvY5q2k"/>
</div>
<div>
<div class="flex items-center gap-1">
<span class="font-bold text-sm">rory_mcilroy</span>
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">verified</span>
</div>
<span class="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">45m ago</span>
</div>
</div>
<button class="text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div class="relative aspect-[4/5] bg-surface-container-low">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkR56HDC8dxKTdgDEk2hROeHSzKhs3ZqKDADBXarWQdQzn2nrOen2OsPhqRvZHxgr3E6SxH0uMvFpRo5v790QFPYr9m0nP8An09AKGCtehY3W_73_1ApMDsveFXOzW8utmTbeX0ZGbO493LxU_3CCrN7koAfguLwxiUSK-fFI5LFoiXpiVgE-bdjerCR3tlhZVFgugjdHdOUSJL2rfSLd3D2U-b1bpMNf9A5xELZt63cm0YzLIirpeVtfuV4o4zR8tz-j728yR0gY"/>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-16 h-16 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
</div>
<div class="px-4 py-3">
<div class="flex items-center gap-4 mb-3">
<button class="text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">favorite</span></button>
<button class="text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">mode_comment</span></button>
<button class="text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">send</span></button>
<button class="ml-auto text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">bookmark</span></button>
</div>
<div class="text-sm font-bold mb-1">2,412 likes</div>
<p class="text-sm leading-snug">
<span class="font-bold mr-1">rory_mcilroy</span>
                    Killer Drive. The precision of a surgeon, the power of a locomotive. 342 yards down the throat. 🏌️‍♂️🔥
                </p>
<button class="text-[13px] text-on-surface-variant mt-1.5 font-medium">View all 128 comments</button>
</div>
</article>
<!-- Premium Ad Integrated -->
<section class="bg-surface-container-low/50 py-2 border-b border-outline-variant/10">
<div class="flex items-center gap-3 px-4 py-2">
<div class="w-8 h-8 rounded-sm bg-[#101511] flex items-center justify-center border border-outline-variant/20 overflow-hidden">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZiLUvRDigfEy_TT_B28_fQlwf8y-1ubscYN2j_4pC_gQvTI9PkY75-ETpv3Puq8b_N5NLwBg5CAotiZJjQcgOioa4-QhrrEoSESzBChY8H_Qa9ICvu00SVN-sXOk3ocCW7CnP337j8y38nTLcYIri26AXMbWfwgbUyoc1yGMzsvgyX_rPQnLRiaTnRrtULavob0FYixxe9ihN98flumc4YJSKQcRULrkPRkrGte-adpKt32QBRLhLml90ck9gIh3_0ue8RdAaOIU"/>
</div>
<div class="flex-1">
<p class="text-[10px] font-bold text-secondary uppercase tracking-[0.15em]">Promoted</p>
<p class="text-sm font-bold">Titleist Performance</p>
</div>
<button class="px-4 py-1.5 bg-primary text-background text-[11px] font-bold uppercase tracking-widest rounded-sm">Shop</button>
</div>
<div class="aspect-video">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZiLUvRDigfEy_TT_B28_fQlwf8y-1ubscYN2j_4pC_gQvTI9PkY75-ETpv3Puq8b_N5NLwBg5CAotiZJjQcgOioa4-QhrrEoSESzBChY8H_Qa9ICvu00SVN-sXOk3ocCW7CnP337j8y38nTLcYIri26AXMbWfwgbUyoc1yGMzsvgyX_rPQnLRiaTnRrtULavob0FYixxe9ihN98flumc4YJSKQcRULrkPRkrGte-adpKt32QBRLhLml90ck9gIh3_0ue8RdAaOIU"/>
</div>
<div class="p-4">
<h4 class="font-headline text-xl text-on-surface italic">The New Titleist GT</h4>
<p class="text-on-surface-variant text-[13px] mt-1">Experience speed beyond your imagination. Engineered for the elite player.</p>
</div>
</section>
<!-- Social Photo Post -->
<article class="bg-background border-b border-outline-variant/10 pb-4">
<div class="flex items-center justify-between p-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full overflow-hidden border border-tertiary/30 p-0.5">
<img class="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVlaJeQhq1nwIa_OYbZAaVMaVJDFYZyCMQcNs5yauJinGg97Yg-sVwwqNAMaaNVQPytpUvZiXHMsxhcFGX21TIM1qmIYMyZkgv6JCn9nN_VFoJqSZyugJkgvh32tVqJ0mG66-YnyWOIakJQJazNVLg1AlTuTm4r9sLuRLZZ_mIO_VQvmUhYjWQsTWDwvxulSsVgoa06ptQ453rXvYbI9kyQmBtcrBhn3k4p7nJAgJzQtb6Bh-xfz7VicpBHAnq3uJEJ6FDvE4EB7I"/>
</div>
<div>
<div class="flex items-center gap-1">
<span class="font-bold text-sm">tommy_fleetwood</span>
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">verified</span>
</div>
<span class="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">2h ago</span>
</div>
</div>
<button class="text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div class="bg-surface-container-low aspect-square">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwNPkP99sxTEtsiL3eQ91qKS3YkD9oIOkz2oYv0-0CZJWVd7kF7NQgFIEv_p87-w9hsBtyIuNl2OerAcbao0cQj9K13r3pBUVb9KwbP2rofbDPPzyXZfJuOTshp8WeQd4_KyJtek-47tj_UyGrqc3aQVTYMfRSkYK4MvKD77pD-u2GgumaYCc-UlqYUy3U46i8whD9m5-L15s7Ci5nrCWeJlZlFN5XBTVK-Y4JhbOTobMaWaAM9piqreuoSvUQgETFJN6BGGW8mJU"/>
</div>
<div class="px-4 py-3">
<div class="flex items-center gap-4 mb-3">
<button class="text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">favorite</span></button>
<button class="text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">mode_comment</span></button>
<button class="text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">send</span></button>
<button class="ml-auto text-on-surface hover:text-primary transition-colors"><span class="material-symbols-outlined text-[28px]">bookmark</span></button>
</div>
<div class="text-sm font-bold mb-1">413 likes</div>
<p class="text-sm leading-snug">
<span class="font-bold mr-1">tommy_fleetwood</span>
                    The greens are lightning quick today. Focus on the landing zone and let the slope do the work. Pure bliss out here. ⛳️✨
                </p>
<button class="text-[13px] text-on-surface-variant mt-1.5 font-medium">View all 24 comments</button>
</div>
</article>
</div>
</main>
<!-- BottomNavBar component -->
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe px-4 bg-[#101511]/80 backdrop-blur-3xl border-t border-[#3f4943]/20 shadow-[0_-8px_24px_rgba(0,56,37,0.2)] z-50 rounded-t-xl">
<div class="flex flex-col items-center justify-center text-[#84d7af] border-t-2 border-[#84d7af] pt-2 h-full cursor-pointer active:scale-90 transition-transform duration-200">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Home</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 h-full cursor-pointer hover:text-[#dfe4dd] active:scale-90 transition-transform duration-200">
<span class="material-symbols-outlined">golf_course</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Play</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 h-full cursor-pointer hover:text-[#dfe4dd] active:scale-90 transition-transform duration-200">
<span class="material-symbols-outlined">leaderboard</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Rank</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 h-full cursor-pointer hover:text-[#dfe4dd] active:scale-90 transition-transform duration-200">
<span class="material-symbols-outlined">payments</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Bets</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 h-full cursor-pointer hover:text-[#dfe4dd] active:scale-90 transition-transform duration-200">
<span class="material-symbols-outlined">person</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Profile</span>
</div>
</nav>
<!-- Floating Action Button -->
<button class="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#006747] to-[#84d7af] text-[#101511] rounded-full shadow-lg flex items-center justify-center group active:scale-90 transition-transform z-40">
<span class="material-symbols-outlined text-3xl font-bold" style="font-variation-settings: 'FILL' 1;">add</span>
</button>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>STICKS | The Digital Locker Room</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@400;600;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container": "#1c211c",
                    "tertiary-fixed": "#ffe088",
                    "on-background": "#dfe4dd",
                    "on-tertiary-fixed": "#241a00",
                    "on-primary-fixed": "#002114",
                    "inverse-on-surface": "#2c322d",
                    "secondary-fixed": "#fcdeba",
                    "secondary-container": "#5a452b",
                    "on-tertiary-container": "#4e3d00",
                    "secondary": "#dfc29f",
                    "outline": "#88938c",
                    "surface-dim": "#101511",
                    "tertiary-fixed-dim": "#e9c349",
                    "on-surface-variant": "#bec9c1",
                    "surface-variant": "#313631",
                    "on-secondary-container": "#d0b492",
                    "background": "#101511",
                    "primary-fixed": "#a0f4ca",
                    "tertiary-container": "#cba72f",
                    "surface-container-lowest": "#0a0f0b",
                    "on-secondary-fixed-variant": "#574329",
                    "on-tertiary": "#3c2f00",
                    "surface-tint": "#84d7af",
                    "surface": "#101511",
                    "on-error-container": "#ffdad6",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "on-primary-container": "#8fe2ba",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-highest": "#313631",
                    "on-primary": "#003825",
                    "inverse-surface": "#dfe4dd",
                    "outline-variant": "#3f4943",
                    "primary": "#84d7af",
                    "on-secondary-fixed": "#281903",
                    "primary-container": "#006747",
                    "surface-bright": "#353a36",
                    "surface-container-low": "#181d19",
                    "secondary-fixed-dim": "#dfc29f",
                    "on-surface": "#dfe4dd",
                    "on-error": "#690005",
                    "inverse-primary": "#0b6c4b",
                    "error-container": "#93000a",
                    "primary-fixed-dim": "#84d7af",
                    "tertiary": "#e9c349",
                    "on-secondary": "#3f2d15",
                    "error": "#ffb4ab"
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
        body { font-family: 'Manrope', sans-serif; background-color: #101511; color: #dfe4dd; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Newsreader', serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen pb-24">
<!-- TopAppBar -->
<header class="bg-[#101511]/70 backdrop-blur-2xl fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-gradient-to-b from-[#181d19] to-transparent">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/20">
<img alt="User profile photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY-GXBcdJAvjwX7XQ5fPvffn_2RwsqhYDXevE_ROUeY5AiQF3iunNPbm09IRylgpWWCa-JOz-LClWtGwRMvMcm6L_47A92BxNGlab4or3gs3DmGrfxC8ZiPsm7ziZQvw3qdRHBlj-mzQr0TZpot2qAgOcDtCH0-BqjBu-mk19FmpEukR1ZPBvbRlzi9UGmicoYFq5IJlNYNHLkDkbwfYN2jWWheBTlCLk-jgfcZ7egkl7nMVTxBue_z_ywZRVjP2cXMpC01igzzJk"/>
</div>
</div>
<h1 class="text-2xl font-bold italic font-['Newsreader'] tracking-tighter text-[#dfe4dd]">STICKS</h1>
<div class="text-[#84d7af] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</div>
</header>
<main class="max-w-xl mx-auto pt-16">
<!-- Live Leaderboard Ticker Section (Retained for context) -->
<section class="mt-4 mb-4">
<div class="flex items-center justify-between mb-3 px-4">
<h2 class="font-label text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">LIVE LEADERBOARD</h2>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-error animate-pulse"></span>
<span class="text-[10px] font-bold text-error tracking-wider uppercase">LIVE</span>
</div>
</div>
<div class="overflow-x-auto hide-scrollbar px-4">
<div class="flex gap-3">
<!-- Leaderboard Item 1 -->
<div class="flex-none p-4 min-w-[140px] bg-surface-container-low rounded-xl border-l-2 border-tertiary">
<div class="flex justify-between items-start">
<span class="text-tertiary font-serif italic text-lg leading-none">1st</span>
<span class="text-primary font-bold text-sm">-12</span>
</div>
<p class="font-label font-extrabold text-xs mt-1 truncate uppercase">R. MCILROY</p>
</div>
<!-- Leaderboard Item 2 -->
<div class="flex-none p-4 min-w-[140px] bg-surface-container-low rounded-xl border-l-2 border-outline-variant/30">
<div class="flex justify-between items-start">
<span class="text-on-surface-variant font-serif italic text-lg leading-none">2nd</span>
<span class="text-on-surface font-bold text-sm">-10</span>
</div>
<p class="font-label font-extrabold text-xs mt-1 truncate uppercase">S. SCHEFFLER</p>
</div>
</div>
</div>
</section>
<!-- Social Feed -->
<section class="space-y-1 divide-y divide-outline-variant/10">
<!-- Feed Item 1: Pro Highlight -->
<article class="bg-background pt-4">
<!-- Header -->
<div class="px-4 flex items-center justify-between mb-3">
<div class="flex items-center gap-3">
<img alt="Rory McIlroy" class="w-10 h-10 rounded-full object-cover border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2i4odo59qR6OKcGTl1evPstHnN2y12M_JSGPJvCAiTyLGMkiLA24eSFJTDxjlRdl4E6T_7pdDRv5xVHYrM6C2wUf8__jOUbzxCAY_CXUdse2acHcDicLyjDiPLtnOatt03pVbUqYZNMDF4lOHAM6GqNOF5PUQsaDocb6ng5uRjE6JyyvNnG9tD2VGOWzL6Y2uorUTqawxdS4C1JzwJvcivUbNvl9f3Gay8QTJO6a2Nb-nQPIr_LP0jR4LVblDCBMXDbP03gFGOLQ"/>
<div>
<div class="flex items-center gap-1">
<span class="font-bold text-sm">rorymcilroy</span>
<span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
</div>
<span class="text-[10px] text-on-surface-variant uppercase tracking-wider">Augusta National • 2h</span>
</div>
</div>
<button class="text-on-surface-variant">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<!-- Media -->
<div class="aspect-square w-full bg-surface-container relative">
<img alt="Highlight Reel" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR2hWblZcQqSH6cYctZOwrVAsk6MQ21p2dbAr7NUxJ29gqFD2C2e9PBr66qLheeIqEmhFb_J7d_zJUIccXrSPNrtwcf2n778KsH52OvmpJyC6MQUEmfbEEIZJLgQw4F7lYuqDMba2aJQktg2swHxRJgKEQBcIpJ-nnsqmeRWaLrxJjQWZZ6J-rk8NmJMHP8_Dw9i1ImrBtgL4iVA-hfQb9fRI4WwzOx3I1Pkjli_6IbYPzzOV7dfwALWLeLaaBlruxdtbWHAZf1Xk"/>
<div class="absolute bottom-4 right-4 bg-background/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">1:04</div>
</div>
<!-- Actions -->
<div class="px-4 py-3">
<div class="flex items-center justify-between mb-3">
<div class="flex items-center gap-5">
<span class="material-symbols-outlined cursor-pointer hover:text-error transition-colors">favorite</span>
<span class="material-symbols-outlined cursor-pointer">chat_bubble</span>
<span class="material-symbols-outlined cursor-pointer">send</span>
</div>
<span class="material-symbols-outlined cursor-pointer">bookmark</span>
</div>
<div class="space-y-1">
<p class="text-sm font-bold">42,891 likes</p>
<p class="text-sm leading-relaxed"><span class="font-bold mr-1">rorymcilroy</span> Morning mist at the 12th. Feeling good for the weekend. #TheFoundersCup #Augusta</p>
<button class="text-on-surface-variant text-sm pt-1">View all 842 comments</button>
</div>
</div>
</article>
<!-- Feed Item 2: Friend Live Status -->
<article class="bg-background pt-4">
<div class="px-4 flex items-center justify-between mb-3">
<div class="flex items-center gap-3">
<img alt="Julian Vance" class="w-10 h-10 rounded-full object-cover border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAANO7qC-UGSYwuB8MlhiS0l_YloXx3hVl--nJc50UfNczDcSiO84IjnbDdYg2OinyXavN7N0zZL9NPozmtg1Hsc0lq7d18GVYx_8OJkTNXrpY7hr6oR7iWBQXFE6kV_7f7kzk0_h6io2xdv7zr5mBCBraI4aTtXQMn9djuB4mg_VTyT6lT4-gSR1GVbxdfeQOTA_D7N3XXgHOXSX6kVJfSUrVHyiLh_L8NQbVNtb5N82uJTacyJPcXxt01JdmWUErCGxf44Bayt0c"/>
<div>
<span class="font-bold text-sm block">julian_vance_pro</span>
<div class="flex items-center gap-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
<span class="text-[10px] text-error font-bold uppercase tracking-wider">Playing Now • Pebble Beach</span>
</div>
</div>
</div>
<span class="text-[10px] text-on-surface-variant uppercase font-bold px-2 py-1 bg-surface-container rounded-lg">LIVE SCORE: -2</span>
</div>
<div class="aspect-video w-full bg-surface-container relative">
<img alt="Pebble Beach" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAE2A68VhIB_aA0W3NA_eqvKnpTQMPnoNlpecB3uDTSpCYtprc-Mk7yjSJ5J2n_R5qDIycEg686prAuca0wr46ypjqLPmCUIJQjrFTHgsamuPVcS_znn5V6h0VMlB0ztcFumgrsubFTAF0IU3Gn_BOkXoeiP3kb1S8zB_TmVJtyHwPH6RtbazyAGolkkKAxBLgGG2o0xE-kaV9i-VcN6O0DLWPpAqUuibEerT7qNlFDGEGXaGtOdKzmaU9sdPVl5I_6NVKVAEIQPQ"/>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-12 h-12 rounded-full bg-background/40 backdrop-blur-xl flex items-center justify-center border border-white/20">
<span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
</div>
<div class="px-4 py-3">
<div class="flex items-center gap-5 mb-3">
<span class="material-symbols-outlined cursor-pointer">favorite</span>
<span class="material-symbols-outlined cursor-pointer">chat_bubble</span>
<span class="material-symbols-outlined cursor-pointer">send</span>
</div>
<p class="text-sm leading-relaxed"><span class="font-bold mr-1">julian_vance_pro</span> Testing the new blades at Pebble today. Greens are running fast! 🔥</p>
</div>
</article>
<!-- Feed Item 3: Native Ad -->
<article class="bg-surface-container-low/30 pt-4 border-y border-outline-variant/10">
<div class="px-4 flex items-center justify-between mb-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2">
<span class="text-black font-black text-[10px] leading-tight text-center">TAYLOR<br/>MADE</span>
</div>
<div>
<span class="font-bold text-sm block">TaylorMade Golf</span>
<span class="text-[10px] text-on-surface-variant uppercase tracking-wider">Sponsored</span>
</div>
</div>
<button class="bg-primary text-on-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Shop Now</button>
</div>
<div class="aspect-square w-full bg-black">
<img alt="TaylorMade Stealth" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA1VEP-CxBdMWcGRtfJ5UNmudlaKmElzt8qyRCsXrMvnWTBFWtNOYmQ8i0AmmLID-91HKKNYju2WNQkg2fCRWMC8e03TgMrX_5ycPg80aXKbAI-gT4TY5Aovaz_Fb5MNB-X7DUvDKCI3OOMvRtpTfF282-jcJFIBbcxpib_E1fz56rZA0ZzjunTA4jGKrwtLqzTVjQmVkgz3fm3iF3jvknubF88uncwk6zrggnGKU1EvLue3Tguwuea3CvUDKSECTchMCMe4h5c8k"/>
</div>
<div class="px-4 py-4 bg-surface-container-low flex justify-between items-center">
<div>
<p class="font-serif text-lg italic">Beyond Precision.</p>
<p class="text-xs text-on-surface-variant">The all-new Stealth Carbonwood Series.</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant">arrow_forward_ios</span>
</div>
</article>
</section>
<!-- CTA Section -->
<section class="my-16 bg-surface-container-high/50 rounded-2xl mx-4 p-8 text-center border border-outline-variant/10">
<h2 class="font-serif text-2xl mb-4 italic">Ready for the Back Nine?</h2>
<div class="flex flex-col gap-3">
<button class="bg-primary text-on-primary py-4 rounded-xl font-bold text-xs tracking-widest uppercase active:scale-95 transition-all">
                    BOOK TEE TIME
                </button>
<button class="bg-surface-container py-4 rounded-xl font-bold text-xs tracking-widest uppercase active:scale-95 transition-all">
                    FIND MATCH
                </button>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="bg-[#101511]/80 backdrop-blur-3xl fixed bottom-0 w-full z-50 rounded-t-xl border-t border-[#3f4943]/20 shadow-[0_-8px_24px_rgba(0,56,37,0.2)] left-0 flex justify-around items-center pb-safe px-4 h-20">
<!-- HOME (Active) -->
<a class="flex flex-col items-center justify-center text-[#84d7af] border-t-2 border-[#84d7af] pt-2" href="#">
<span class="material-symbols-outlined mb-1" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Home</span>
</a>
<!-- PLAY -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 hover:text-[#dfe4dd] transition-colors" href="#">
<span class="material-symbols-outlined mb-1" data-icon="golf_course">golf_course</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Play</span>
</a>
<!-- RANK -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 hover:text-[#dfe4dd] transition-colors" href="#">
<span class="material-symbols-outlined mb-1" data-icon="leaderboard">leaderboard</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Rank</span>
</a>
<!-- BETS -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 hover:text-[#dfe4dd] transition-colors" href="#">
<span class="material-symbols-outlined mb-1" data-icon="payments">payments</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Bets</span>
</a>
<!-- PROFILE -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] pt-2 hover:text-[#dfe4dd] transition-colors" href="#">
<span class="material-symbols-outlined mb-1" data-icon="person">person</span>
<span class="font-['Manrope'] uppercase text-[10px] tracking-widest font-bold">Profile</span>
</a>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - The Clubhouse Feed</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,700&amp;family=Manrope:wght@400;500;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-tertiary-container": "#4e3d00",
                    "secondary-container": "#5a452b",
                    "on-background": "#dfe4dd",
                    "outline": "#88938c",
                    "surface-variant": "#313631",
                    "primary": "#84d7af",
                    "background": "#101511",
                    "error": "#ffb4ab",
                    "primary-fixed-dim": "#84d7af",
                    "surface-tint": "#84d7af",
                    "primary-container": "#006747",
                    "on-surface": "#dfe4dd",
                    "on-secondary-fixed-variant": "#574329",
                    "on-secondary-fixed": "#281903",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-highest": "#313631",
                    "surface": "#101511",
                    "surface-container-high": "#262b27",
                    "on-primary-fixed": "#002114",
                    "on-error-container": "#ffdad6",
                    "tertiary-fixed-dim": "#e9c349",
                    "surface-bright": "#353a36",
                    "outline-variant": "#3f4943",
                    "on-tertiary": "#3c2f00",
                    "on-secondary": "#3f2d15",
                    "surface-container-low": "#181d19",
                    "on-tertiary-fixed-variant": "#574500",
                    "on-primary-container": "#8fe2ba",
                    "secondary-fixed-dim": "#dfc29f",
                    "error-container": "#93000a",
                    "surface-container": "#1c211c",
                    "primary-fixed": "#a0f4ca",
                    "tertiary-fixed": "#ffe088",
                    "secondary": "#dfc29f",
                    "inverse-primary": "#0b6c4b",
                    "tertiary": "#e9c349",
                    "surface-dim": "#101511",
                    "on-tertiary-fixed": "#241a00",
                    "surface-container-lowest": "#0a0f0b",
                    "on-primary": "#003825",
                    "on-error": "#690005",
                    "inverse-surface": "#dfe4dd",
                    "on-surface-variant": "#bec9c1",
                    "secondary-fixed": "#fcdeba",
                    "tertiary-container": "#cba72f",
                    "on-secondary-container": "#d0b492",
                    "inverse-on-surface": "#2c322d"
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
        body { font-family: 'Manrope', sans-serif; }
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
<body class="bg-background text-on-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-[#101511]/70 backdrop-blur-3xl flex justify-between items-center px-6 h-16 w-full">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
<img alt="user profile picture" class="w-full h-full object-cover" data-alt="close up professional headshot of a refined gentleman in a luxury polo shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlJ9qwbW1E3OfcYHsKpU5zSNk-nvIq2fytOnrIlGBBq_3gz9u3M29nsMgLxm28fb8xu609jPMcgPbkD_k4g23WsaLWsaT18UEUxMoZqjtRN5oYz9osedOAoxCW6chZTWSepZALq_ZrqErSGZsS3Yt5U5MI2R7Dl3a8J0nKRfgjDGX3ZbDnTZ4-4M4wchd-pMUczSowEuiG5SOUDdjP36kwRUcqSi21cVKO3iJWDG4Mn1q3F_cBjHE5gcUfPBycwbS5OeZkMhfcsOw"/>
</div>
<span class="font-serif text-2xl font-bold tracking-widest text-[#dfe4dd]">STICKS</span>
</div>
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#84d7af] text-2xl" data-icon="settings">settings</span>
</div>
</header>
<main class="pt-20 px-4 max-w-2xl mx-auto space-y-8">
<!-- Segmented Toggle -->
<div class="flex justify-center mt-4">
<nav class="flex bg-surface-container-low p-1 rounded-lg w-full">
<button class="flex-1 py-2 text-xs font-bold tracking-widest uppercase transition-colors text-primary bg-surface-container-high rounded-md">Friends</button>
<button class="flex-1 py-2 text-xs font-bold tracking-widest uppercase transition-colors text-on-surface-variant hover:text-on-surface">Local</button>
<button class="flex-1 py-2 text-xs font-bold tracking-widest uppercase transition-colors text-on-surface-variant hover:text-on-surface">Global</button>
</nav>
</div>
<!-- Live Round Status Card -->
<section class="relative group">
<div class="absolute -inset-0.5 bg-gradient-to-r from-primary-container to-primary rounded-xl opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
<div class="relative bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden shadow-2xl">
<div class="p-6 flex items-start gap-4">
<div class="relative">
<img class="w-16 h-16 rounded-full border-2 border-primary object-cover" data-alt="professional golfer portrait in high-end athletic apparel with a confident expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo5ixFrW5JopgVCSjm0zW2K1nTV4fKV4CzkV4I7dgLcxPyTNuvq1gRoUyhFXkyCewtxQZqTLt0U4bMGhzsdxT4Ew3yNBEcPrgJ0y0ZicaWU02BioA0l7k9RiCEQSJpCsyzxiphK8YzWt8yJia0B-q_EWZysED2VzdcXwpxqrm1yAaTCJrZryg_LysR-b1WYWOqUwiXIZQeQ84V6vXcxWO7TsWcIjTjo8C0ZWe2bV-bC7llrwumSqHUUMf8bW0RY0p8sr9rBvY5q2k"/>
<div class="absolute -bottom-1 -right-1 bg-red-600 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-tighter">Live</div>
</div>
<div class="flex-1">
<div class="flex justify-between items-start">
<div>
<h3 class="font-headline text-xl text-on-surface leading-none">Rory McIlroy</h3>
<p class="text-secondary text-[10px] uppercase tracking-widest font-bold mt-1">Augusta National GC</p>
</div>
<div class="text-right">
<span class="text-2xl font-headline text-primary font-bold">-2</span>
<p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Thru 14</p>
</div>
</div>
<div class="mt-4 flex items-center gap-1">
<div class="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
<div class="w-[77%] h-full bg-primary"></div>
</div>
<span class="text-[9px] font-bold text-on-surface-variant">77%</span>
</div>
</div>
</div>
</div>
</section>
<!-- Video Post: Killer Drive -->
<section class="bg-surface-container-low rounded-xl overflow-hidden">
<div class="relative aspect-[9/16] max-h-[600px] w-full group">
<img class="w-full h-full object-cover" data-alt="dramatic wide shot of a professional golfer swinging a driver on a lush green fairway at dawn with mist" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkR56HDC8dxKTdgDEk2hROeHSzKhs3ZqKDADBXarWQdQzn2nrOen2OsPhqRvZHxgr3E6SxH0uMvFpRo5v790QFPYr9m0nP8An09AKGCtehY3W_73_1ApMDsveFXOzW8utmTbeX0ZGbO493LxU_3CCrN7koAfguLwxiUSK-fFI5LFoiXpiVgE-bdjerCR3tlhZVFgugjdHdOUSJL2rfSLd3D2U-b1bpMNf9A5xELZt63cm0YzLIirpeVtfuV4o4zR8tz-j728yR0gY"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
<div class="absolute bottom-0 left-0 p-8 w-full">
<h2 class="font-headline text-4xl text-on-surface tracking-tight leading-tight italic">
                        Killer Drive
                    </h2>
<p class="text-on-surface-variant text-sm mt-2 max-w-xs">The precision of a surgeon, the power of a locomotive. 342 yards down the throat.</p>
<div class="flex items-center gap-6 mt-6">
<button class="flex items-center gap-2 group/btn">
<span class="material-symbols-outlined text-on-surface-variant group-hover/btn:text-primary transition-colors">favorite</span>
<span class="text-xs font-bold text-on-surface-variant">2.4k</span>
</button>
<button class="flex items-center gap-2 group/btn">
<span class="material-symbols-outlined text-on-surface-variant group-hover/btn:text-primary transition-colors">mode_comment</span>
<span class="text-xs font-bold text-on-surface-variant">128</span>
</button>
<button class="flex items-center gap-2 group/btn">
<span class="material-symbols-outlined text-on-surface-variant group-hover/btn:text-primary transition-colors">share</span>
</button>
</div>
</div>
</div>
</section>
<!-- Premium Golf Ad -->
<section class="bg-surface-container border border-outline-variant/10 rounded-xl overflow-hidden p-1">
<div class="relative bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col md:flex-row h-full">
<div class="w-full md:w-1/3 aspect-square md:aspect-auto">
<img class="w-full h-full object-cover" data-alt="luxury close up of a high performance golf driver head showing titanium texture and aerodynamic design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZiLUvRDigfEy_TT_B28_fQlwf8y-1ubscYN2j_4pC_gQvTI9PkY75-ETpv3Puq8b_N5NLwBg5CAotiZJjQcgOioa4-QhrrEoSESzBChY8H_Qa9ICvu00SVN-sXOk3ocCW7CnP337j8y38nTLcYIri26AXMbWfwgbUyoc1yGMzsvgyX_rPQnLRiaTnRrtULavob0FYixxe9ihN98flumc4YJSKQcRULrkPRkrGte-adpKt32QBRLhLml90ck9gIh3_0ue8RdAaOIU"/>
</div>
<div class="flex-1 p-6 flex flex-col justify-center">
<span class="text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Promoted / Titleist</span>
<h4 class="font-headline text-2xl text-on-surface">The New Titleist GT</h4>
<p class="text-on-surface-variant text-sm mt-2 mb-6">Experience speed beyond your imagination. Engineered for the elite player.</p>
<button class="w-full md:w-fit px-8 py-3 bg-gradient-to-br from-[#006747] to-[#84d7af] text-[#101511] font-bold text-xs uppercase tracking-widest rounded-sm hover:scale-[1.02] transition-transform">
                        Explore GT
                    </button>
</div>
</div>
</section>
<!-- Social Post -->
<article class="bg-surface-container-low rounded-xl p-6 space-y-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden border border-tertiary/30 p-0.5">
<img class="w-full h-full object-cover rounded-full" data-alt="athlete in golf attire wearing a high-end white visor and green polo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVlaJeQhq1nwIa_OYbZAaVMaVJDFYZyCMQcNs5yauJinGg97Yg-sVwwqNAMaaNVQPytpUvZiXHMsxhcFGX21TIM1qmIYMyZkgv6JCn9nN_VFoJqSZyugJkgvh32tVqJ0mG66-YnyWOIakJQJazNVLg1AlTuTm4r9sLuRLZZ_mIO_VQvmUhYjWQsTWDwvxulSsVgoa06ptQ453rXvYbI9kyQmBtcrBhn3k4p7nJAgJzQtb6Bh-xfz7VicpBHAnq3uJEJ6FDvE4EB7I"/>
</div>
<div>
<div class="flex items-center gap-1">
<span class="font-bold text-sm">Tommy Fleetwood</span>
<span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
</div>
<span class="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">2 hours ago</span>
</div>
</div>
<button class="text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<p class="text-sm leading-relaxed text-on-surface/90 font-medium">
                The greens are lightning quick today. Focus on the landing zone and let the slope do the work. Pure bliss out here. ⛳️
            </p>
<div class="rounded-lg overflow-hidden border border-outline-variant/10">
<img class="w-full h-auto object-cover aspect-video" data-alt="panoramic view of a pristine golf green with a flag fluttering in the wind and deep bunkers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwNPkP99sxTEtsiL3eQ91qKS3YkD9oIOkz2oYv0-0CZJWVd7kF7NQgFIEv_p87-w9hsBtyIuNl2OerAcbao0cQj9K13r3pBUVb9KwbP2rofbDPPzyXZfJuOTshp8WeQd4_KyJtek-47tj_UyGrqc3aQVTYMfRSkYK4MvKD77pD-u2GgumaYCc-UlqYUy3U46i8whD9m5-L15s7Ci5nrCWeJlZlFN5XBTVK-Y4JhbOTobMaWaAM9piqreuoSvUQgETFJN6BGGW8mJU"/>
</div>
<div class="flex items-center justify-between pt-2">
<div class="flex items-center -space-x-2">
<div class="w-6 h-6 rounded-full bg-primary-container border-2 border-surface-container-low flex items-center justify-center">
<span class="material-symbols-outlined text-[12px] text-white" style="font-variation-settings: 'FILL' 1;">thumb_up</span>
</div>
<div class="w-6 h-6 rounded-full bg-secondary-container border-2 border-surface-container-low flex items-center justify-center">
<span class="material-symbols-outlined text-[12px] text-white" style="font-variation-settings: 'FILL' 1;">favorite</span>
</div>
<span class="pl-4 text-[11px] font-bold text-on-surface-variant">Liked by Tiger and 412 others</span>
</div>
<span class="text-[11px] font-bold text-on-surface-variant">24 comments</span>
</div>
</article>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center pt-3 pb-8 px-4 bg-[#101511]/80 backdrop-blur-2xl border-t border-[#3f4943]/20 shadow-[0_-8px_24px_rgba(0,56,37,0.4)] z-50 rounded-t-xl">
<!-- Home Active -->
<div class="flex flex-col items-center justify-center bg-gradient-to-br from-[#006747] to-[#84d7af] text-[#101511] rounded-sm px-3 py-1 active:scale-90 transition-transform cursor-pointer">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-sans uppercase text-[10px] tracking-widest font-bold">Home</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] px-3 py-1 active:scale-90 transition-transform cursor-pointer hover:bg-[#1c211c]">
<span class="material-symbols-outlined">sports_golf</span>
<span class="font-sans uppercase text-[10px] tracking-widest font-bold">Play</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] px-3 py-1 active:scale-90 transition-transform cursor-pointer hover:bg-[#1c211c]">
<span class="material-symbols-outlined">leaderboard</span>
<span class="font-sans uppercase text-[10px] tracking-widest font-bold">Ranks</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] px-3 py-1 active:scale-90 transition-transform cursor-pointer hover:bg-[#1c211c]">
<span class="material-symbols-outlined">payments</span>
<span class="font-sans uppercase text-[10px] tracking-widest font-bold">Bets</span>
</div>
<div class="flex flex-col items-center justify-center text-[#bec9c1] px-3 py-1 active:scale-90 transition-transform cursor-pointer hover:bg-[#1c211c]">
<span class="material-symbols-outlined">person</span>
<span class="font-sans uppercase text-[10px] tracking-widest font-bold">Profile</span>
</div>
</nav>
<!-- Floating Action Button -->
<button class="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#006747] to-[#84d7af] text-[#101511] rounded-full shadow-[0_8px_24px_rgba(0,56,37,0.4)] flex items-center justify-center group active:scale-90 transition-transform z-40">
<span class="material-symbols-outlined text-3xl font-bold" style="font-variation-settings: 'FILL' 1;">add</span>
</button>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>STICKS | The Digital Locker Room</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@400;600;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container": "#1c211c",
                    "tertiary-fixed": "#ffe088",
                    "on-background": "#dfe4dd",
                    "on-tertiary-fixed": "#241a00",
                    "on-primary-fixed": "#002114",
                    "inverse-on-surface": "#2c322d",
                    "secondary-fixed": "#fcdeba",
                    "secondary-container": "#5a452b",
                    "on-tertiary-container": "#4e3d00",
                    "secondary": "#dfc29f",
                    "outline": "#88938c",
                    "surface-dim": "#101511",
                    "tertiary-fixed-dim": "#e9c349",
                    "on-surface-variant": "#bec9c1",
                    "surface-variant": "#313631",
                    "on-secondary-container": "#d0b492",
                    "background": "#101511",
                    "primary-fixed": "#a0f4ca",
                    "tertiary-container": "#cba72f",
                    "surface-container-lowest": "#0a0f0b",
                    "on-secondary-fixed-variant": "#574329",
                    "on-tertiary": "#3c2f00",
                    "surface-tint": "#84d7af",
                    "surface": "#101511",
                    "on-error-container": "#ffdad6",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#262b27",
                    "on-primary-container": "#8fe2ba",
                    "on-primary-fixed-variant": "#005137",
                    "surface-container-highest": "#313631",
                    "on-primary": "#003825",
                    "inverse-surface": "#dfe4dd",
                    "outline-variant": "#3f4943",
                    "primary": "#84d7af",
                    "on-secondary-fixed": "#281903",
                    "primary-container": "#006747",
                    "surface-bright": "#353a36",
                    "surface-container-low": "#181d19",
                    "secondary-fixed-dim": "#dfc29f",
                    "on-surface": "#dfe4dd",
                    "on-error": "#690005",
                    "inverse-primary": "#0b6c4b",
                    "error-container": "#93000a",
                    "primary-fixed-dim": "#84d7af",
                    "tertiary": "#e9c349",
                    "on-secondary": "#3f2d15",
                    "error": "#ffb4ab"
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
        body { font-family: 'Manrope', sans-serif; background-color: #101511; color: #dfe4dd; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Newsreader', serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface min-h-screen pb-24">
<!-- TopAppBar -->
<header class="bg-[#101511]/70 backdrop-blur-3xl docked full-width top-0 z-50 flex justify-between items-center w-full px-6 py-4 sticky">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/20">
<img alt="Member Profile" class="w-full h-full object-cover" data-alt="Close up portrait of a sophisticated man in a polo shirt with a golf course background in soft focus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY-GXBcdJAvjwX7XQ5fPvffn_2RwsqhYDXevE_ROUeY5AiQF3iunNPbm09IRylgpWWCa-JOz-LClWtGwRMvMcm6L_47A92BxNGlab4or3gs3DmGrfxC8ZiPsm7ziZQvw3qdRHBlj-mzQr0TZpot2qAgOcDtCH0-BqjBu-mk19FmpEukR1ZPBvbRlzi9UGmicoYFq5IJlNYNHLkDkbwfYN2jWWheBTlCLk-jgfcZ7egkl7nMVTxBue_z_ywZRVjP2cXMpC01igzzJk"/>
</div>
</div>
<h1 class="text-2xl font-serif italic text-[#e9c349] tracking-tighter">STICKS</h1>
<div class="text-[#84d7af] flex items-center justify-center">
<span class="material-symbols-outlined cursor-pointer hover:text-[#84d7af] transition-colors" data-icon="notifications">notifications</span>
</div>
</header>
<main class="max-w-5xl mx-auto px-4 sm:px-6">
<!-- Live Leaderboard Ticker Section -->
<section class="mt-4 mb-8">
<div class="flex items-center justify-between mb-3 px-2">
<h2 class="font-label text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">LIVE LEADERBOARD</h2>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-error animate-pulse"></span>
<span class="text-[10px] font-bold text-error tracking-wider uppercase">LIVE</span>
</div>
</div>
<div class="bg-surface-container-low rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-l-4 border-tertiary">
<div class="flex overflow-x-auto hide-scrollbar divide-x divide-outline-variant/10">
<!-- Leaderboard Item 1 -->
<div class="flex-none p-4 min-w-[180px] bg-gradient-to-br from-surface-container-low to-surface-container">
<div class="flex justify-between items-start">
<span class="text-tertiary font-serif italic text-lg leading-none">1st</span>
<span class="text-primary font-bold text-sm">-12</span>
</div>
<p class="font-label font-extrabold text-xs mt-1 truncate">R. MCILROY</p>
<p class="text-[10px] text-on-surface-variant tracking-tight uppercase">Thru 14</p>
</div>
<!-- Leaderboard Item 2 -->
<div class="flex-none p-4 min-w-[180px]">
<div class="flex justify-between items-start">
<span class="text-on-surface-variant font-serif italic text-lg leading-none">2nd</span>
<span class="text-on-surface font-bold text-sm">-10</span>
</div>
<p class="font-label font-extrabold text-xs mt-1 truncate">S. SCHEFFLER</p>
<p class="text-[10px] text-on-surface-variant tracking-tight uppercase">Thru 16</p>
</div>
<!-- Leaderboard Item 3 -->
<div class="flex-none p-4 min-w-[180px]">
<div class="flex justify-between items-start">
<span class="text-on-surface-variant font-serif italic text-lg leading-none">3rd</span>
<span class="text-on-surface font-bold text-sm">-9</span>
</div>
<p class="font-label font-extrabold text-xs mt-1 truncate">V. HOVLAND</p>
<p class="text-[10px] text-on-surface-variant tracking-tight uppercase">F</p>
</div>
<!-- Leaderboard Item 4 -->
<div class="flex-none p-4 min-w-[180px]">
<div class="flex justify-between items-start">
<span class="text-on-surface-variant font-serif italic text-lg leading-none">4th</span>
<span class="text-on-surface font-bold text-sm">-7</span>
</div>
<p class="font-label font-extrabold text-xs mt-1 truncate">J. RAHM</p>
<p class="text-[10px] text-on-surface-variant tracking-tight uppercase">Thru 12</p>
</div>
</div>
</div>
</section>
<!-- Featured Club Activity (Feed) -->
<section class="space-y-12">
<header>
<h3 class="font-serif text-3xl md:text-5xl tracking-tight text-on-surface">Club Activity</h3>
<p class="font-label text-xs tracking-[0.2em] text-on-surface-variant mt-2 uppercase">LATEST UPDATES FROM THE GREENS</p>
</header>
<!-- Bento Feed Item 1 (Full Width Feature) -->
<article class="group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:shadow-2xl">
<div class="aspect-[16/9] w-full overflow-hidden">
<img alt="Augusta style golf course" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Wide cinematic shot of a pristine golf fairway at sunrise, morning mist rising from the emerald green grass and pine trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR2hWblZcQqSH6cYctZOwrVAsk6MQ21p2dbAr7NUxJ29gqFD2C2e9PBr66qLheeIqEmhFb_J7d_zJUIccXrSPNrtwcf2n778KsH52OvmpJyC6MQUEmfbEEIZJLgQw4F7lYuqDMba2aJQktg2swHxRJgKEQBcIpJ-nnsqmeRWaLrxJjQWZZ6J-rk8NmJMHP8_Dw9i1ImrBtgL4iVA-hfQb9fRI4WwzOx3I1Pkjli_6IbYPzzOV7dfwALWLeLaaBlruxdtbWHAZf1Xk"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
</div>
<div class="absolute bottom-0 left-0 p-6 md:p-10 w-full">
<div class="flex items-center gap-3 mb-4">
<span class="px-3 py-1 rounded-full bg-primary-container/30 border border-primary/20 text-primary font-label text-[10px] font-bold tracking-widest uppercase">TOURNAMENT</span>
<span class="text-on-surface-variant text-xs font-label">2 HOURS AGO</span>
</div>
<h4 class="font-serif text-2xl md:text-4xl text-on-surface max-w-2xl leading-tight">The Founders Cup: Day One Highlights from the 18th Hole</h4>
<div class="mt-6 flex items-center justify-between">
<div class="flex -space-x-3">
<img alt="Member" class="w-8 h-8 rounded-full border-2 border-surface" data-alt="Portrait of a male golfer smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2i4odo59qR6OKcGTl1evPstHnN2y12M_JSGPJvCAiTyLGMkiLA24eSFJTDxjlRdl4E6T_7pdDRv5xVHYrM6C2wUf8__jOUbzxCAY_CXUdse2acHcDicLyjDiPLtnOatt03pVbUqYZNMDF4lOHAM6GqNOF5PUQsaDocb6ng5uRjE6JyyvNnG9tD2VGOWzL6Y2uorUTqawxdS4C1JzwJvcivUbNvl9f3Gay8QTJO6a2Nb-nQPIr_LP0jR4LVblDCBMXDbP03gFGOLQ"/>
<img alt="Member" class="w-8 h-8 rounded-full border-2 border-surface" data-alt="Portrait of a female golfer wearing a visor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAANO7qC-UGSYwuB8MlhiS0l_YloXx3hVl--nJc50UfNczDcSiO84IjnbDdYg2OinyXavN7N0zZL9NPozmtg1Hsc0lq7d18GVYx_8OJkTNXrpY7hr6oR7iWBQXFE6kV_7f7kzk0_h6io2xdv7zr5mBCBraI4aTtXQMn9djuB4mg_VTyT6lT4-gSR1GVbxdfeQOTA_D7N3XXgHOXSX6kVJfSUrVHyiLh_L8NQbVNtb5N82uJTacyJPcXxt01JdmWUErCGxf44Bayt0c"/>
<div class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold">+12</div>
</div>
<button class="bg-gradient-to-r from-primary-container to-primary text-on-primary px-6 py-2 rounded-lg font-label text-xs font-extrabold tracking-widest uppercase shadow-lg shadow-primary-container/20 active:scale-95 transition-all">
                            VIEW GALLERY
                        </button>
</div>
</div>
</article>
<!-- Asymmetric Feed Items -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Item 2 -->
<article class="bg-surface-container-low rounded-xl overflow-hidden flex flex-col">
<div class="aspect-square relative overflow-hidden">
<img alt="Luxury Clubhouse" class="w-full h-full object-cover" data-alt="Interior of a luxury golf clubhouse with dark wood panels, leather armchairs, and golden trophy case highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA1VEP-CxBdMWcGRtfJ5UNmudlaKmElzt8qyRCsXrMvnWTBFWtNOYmQ8i0AmmLID-91HKKNYju2WNQkg2fCRWMC8e03TgMrX_5ycPg80aXKbAI-gT4TY5Aovaz_Fb5MNB-X7DUvDKCI3OOMvRtpTfF282-jcJFIBbcxpib_E1fz56rZA0ZzjunTA4jGKrwtLqzTVjQmVkgz3fm3iF3jvknubF88uncwk6zrggnGKU1EvLue3Tguwuea3CvUDKSECTchMCMe4h5c8k"/>
<div class="absolute top-4 right-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-bold font-label tracking-widest uppercase">PREMIUM</div>
</div>
<div class="p-6">
<h5 class="font-serif text-xl mb-2">Member Exclusive: Single Malt Tasting in the Trophy Room</h5>
<p class="text-on-surface-variant text-sm line-clamp-2">Join us this Friday for a curated selection of Speyside classics, exclusively for Platinum members.</p>
</div>
</article>
<!-- Item 3 -->
<article class="bg-surface-container-low rounded-xl overflow-hidden flex flex-col md:mt-12">
<div class="aspect-square relative overflow-hidden">
<img alt="Putting green" class="w-full h-full object-cover" data-alt="Macro shot of a golf ball resting on a putting green with perfectly manicured grass textures and morning dew" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAE2A68VhIB_aA0W3NA_eqvKnpTQMPnoNlpecB3uDTSpCYtprc-Mk7yjSJ5J2n_R5qDIycEg686prAuca0wr46ypjqLPmCUIJQjrFTHgsamuPVcS_znn5V6h0VMlB0ztcFumgrsubFTAF0IU3Gn_BOkXoeiP3kb1S8zB_TmVJtyHwPH6RtbazyAGolkkKAxBLgGG2o0xE-kaV9i-VcN6O0DLWPpAqUuibEerT7qNlFDGEGXaGtOdKzmaU9sdPVl5I_6NVKVAEIQPQ"/>
</div>
<div class="p-6">
<h5 class="font-serif text-xl mb-2">Mastering the Green: Pro-Tips for Fast Bermudagrass</h5>
<p class="text-on-surface-variant text-sm line-clamp-2">Head Pro Julian Vance breaks down the technical approach to navigating our fastest greens yet.</p>
</div>
</article>
</div>
</section>
<!-- CTA Section -->
<section class="my-16 bg-surface-container-high rounded-xl p-8 text-center relative overflow-hidden border border-outline-variant/10">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
<div class="relative z-10">
<h2 class="font-serif text-3xl mb-4 italic">Ready for the Back Nine?</h2>
<p class="text-on-surface-variant mb-8 max-w-md mx-auto">Book your preferred tee time or join an active match with fellow members.</p>
<div class="flex flex-col sm:flex-row gap-4 justify-center">
<button class="bg-gradient-to-r from-primary-container to-primary text-on-primary px-8 py-4 rounded-lg font-label text-sm font-extrabold tracking-widest uppercase shadow-xl shadow-primary-container/30 active:scale-95 transition-all">
                        BOOK TEE TIME
                    </button>
<button class="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-label text-sm font-extrabold tracking-widest uppercase active:scale-95 transition-all">
                        FIND MATCH
                    </button>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="bg-[#101511]/80 backdrop-blur-xl fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-xl shadow-[0_-8px_24px_rgba(0,56,37,0.4)]">
<!-- HOME (Active) -->
<a class="flex flex-col items-center justify-center text-[#84d7af] bg-[#006747]/20 rounded-lg py-1 px-3 scale-90 duration-150" href="#">
<span class="material-symbols-outlined mb-1" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-label all-caps text-[10px] font-bold tracking-widest">HOME</span>
</a>
<!-- PLAY -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined mb-1" data-icon="golf_course">golf_course</span>
<span class="font-label all-caps text-[10px] font-bold tracking-widest">PLAY</span>
</a>
<!-- RANK -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined mb-1" data-icon="leaderboard">leaderboard</span>
<span class="font-label all-caps text-[10px] font-bold tracking-widest">RANK</span>
</a>
<!-- BETS -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined mb-1" data-icon="payments">payments</span>
<span class="font-label all-caps text-[10px] font-bold tracking-widest">BETS</span>
</a>
<!-- PROFILE -->
<a class="flex flex-col items-center justify-center text-[#bec9c1] py-1 px-3 hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined mb-1" data-icon="person">person</span>
<span class="font-label all-caps text-[10px] font-bold tracking-widest">PROFILE</span>
</a>
</nav>
</body></html>

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
