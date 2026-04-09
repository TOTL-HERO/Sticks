<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Golf with Stakes</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
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
<body class="bg-surface text-on-surface font-body min-h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- Main Container -->
<main class="relative flex flex-col items-center justify-between min-h-screen w-full px-8 py-16 topo-bg">
<!-- Subtle radial glow -->
<div class="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(0,103,71,0.05)_0%,transparent_70%)] pointer-events-none"></div>
<!-- Top Header Placeholder -->
<header class="fixed top-0 w-full flex justify-center items-center px-6 py-8 pointer-events-none">
<span class="font-headline text-2xl font-bold text-on-surface tracking-tighter opacity-0">STICKS</span>
</header>
<!-- Center Branding Content -->
<div class="flex-1 flex flex-col items-center justify-center text-center z-10">
<h1 class="font-headline text-8xl md:text-9xl text-[#006747] tracking-[0.05em] font-black italic mb-6">
                STICKS
            </h1>
<p class="font-label text-xs md:text-sm text-on-surface tracking-[0.4em] uppercase font-medium">
                Golf is more fun with stakes.
            </p>
<div class="h-1 w-12 bg-[#006747] mt-8 rounded-full"></div>
</div>
<!-- Bottom Navigation Actions -->
<div class="w-full max-w-sm flex flex-col space-y-3 z-10">
<!-- Primary Action -->
<button class="group relative overflow-hidden bg-[#006747] text-white font-label font-bold py-5 rounded-lg transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-[#006747]/20">
<span class="relative z-10 uppercase tracking-[0.2em] text-xs">Get Started</span>
<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</button>
<!-- Secondary Action -->
<button class="font-label font-bold py-5 rounded-lg border border-outline-variant/20 text-on-surface bg-surface/40 backdrop-blur-sm transition-all active:scale-[0.98] hover:bg-surface-container-low">
<span class="uppercase tracking-[0.2em] text-xs">Sign In</span>
</button>
</div>
<!-- Branding Icon -->
<div class="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none">
<span class="material-symbols-outlined text-on-surface text-xl">sports_golf</span>
</div>
</main>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Sign Up</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "augusta-green": "#003825",
                    "augusta-light": "#84d7af",
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
                    "primary-container": "#003825",
                    "surface-container-lowest": "#0a0f0b",
                    "primary": "#003825",
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
                    "background": "#050806",
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
                    "DEFAULT": "0rem",
                    "lg": "0.125rem",
                    "xl": "0.25rem",
                    "full": "0.5rem"
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
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24
    }
.premium-blur {
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px)
    }
.topographic-bg {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuCD2_9yD8V1N3W96qjzJW09sPx1XgQ-YV6jBk1SoERw5hOsglQ-yznBwrLvtpdpyZtLRmBsym1z35Qg0yWGQ9aAIgBDAljGONQOeoqxuALJPiIp35Kxua2-wO--WZA3ftXfA0UfEqTpnZPoqWigvlySUp0mn4xkWME5UFqdIU_VP_e-mzfiZUTJgcVYzWXqjsvaBXwDXDr6wSPues6weGIHYhnPdkmzxMXcDK8ToAZwWLzQAugjqC8gztm5vc9jR-yv50W9J2CQ3gs);
    background-repeat: repeat;
    opacity: 0.05
    }</style>
</head>
<body class="bg-background text-on-background font-body antialiased min-h-screen flex flex-col relative">
<!-- Topographic Overlay -->
<div class="fixed inset-0 topographic-bg pointer-events-none z-0"></div>
<!-- Top Navigation Anchor -->
<header class="bg-background/80 premium-blur flex items-center justify-between px-6 py-4 w-full fixed top-0 z-50">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-on-surface cursor-pointer">close</span>
</div>
<div class="text-sm font-headline italic tracking-[0.25em] text-[#dfe4dd] uppercase">Join The Club</div>
<div class="w-6"></div>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col items-center justify-center px-8 pt-32 pb-12 w-full max-w-md mx-auto relative z-10">
<!-- Hero Branding Section -->
<div class="text-center mb-16 relative">
<h1 class="text-7xl font-headline italic tracking-tighter text-on-surface mb-3">Sticks</h1>
<p class="text-on-surface-variant font-label text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">The Private Reserve</p>
</div>
<!-- Auth Action Container -->
<div class="w-full space-y-3">
<!-- Apple Auth -->
<button class="w-full h-[56px] bg-black text-white flex items-center justify-center gap-3 rounded-sm hover:opacity-90 transition-all border border-white/10">
<svg class="w-5 h-5 fill-current" viewbox="0 0 384 512">
<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
</svg>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Apple</span>
</button>
<!-- Google Auth (Primary Style) -->
<button class="w-full h-[56px] bg-white text-background flex items-center justify-center gap-3 rounded-sm hover:bg-white/95 transition-all">
<svg class="w-5 h-5" viewbox="0 0 48 48">
<path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"></path>
<path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"></path>
<path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" fill="#FBBC05"></path>
<path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"></path>
<path d="M0 0h48v48H0z" fill="none"></path>
</svg>
<span class="font-label text-sm font-bold tracking-wide">Continue with Google</span>
</button>
<!-- Separator -->
<div class="flex items-center gap-4 py-6">
<div class="h-[1px] flex-grow bg-outline-variant opacity-20"></div>
<span class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant opacity-50">or</span>
<div class="h-[1px] flex-grow bg-outline-variant opacity-20"></div>
</div>
<!-- Phone Auth -->
<button class="w-full h-[56px] bg-augusta-green/20 text-on-surface flex items-center justify-center gap-3 rounded-sm hover:bg-augusta-green/30 transition-all border border-augusta-green/40">
<span class="material-symbols-outlined text-xl opacity-70">smartphone</span>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Phone</span>
</button>
<!-- Email Auth -->
<button class="w-full h-[56px] bg-augusta-green/20 text-on-surface flex items-center justify-center gap-3 rounded-sm hover:bg-augusta-green/30 transition-all border border-augusta-green/40">
<span class="material-symbols-outlined text-xl opacity-70">mail</span>
<span class="font-label text-sm font-semibold tracking-wide">Continue with Email</span>
</button>
</div>
<!-- Footer / Policy -->
<footer class="mt-auto pt-16 text-center w-full relative">
<p class="text-[11px] text-on-surface-variant font-body leading-relaxed max-w-[280px] mx-auto opacity-50">
                By creating an account, you agree to our 
                <a class="text-on-surface underline underline-offset-4 decoration-augusta-light/20 hover:decoration-augusta-light transition-all" href="#">Terms of Service</a> 
                and 
                <a class="text-on-surface underline underline-offset-4 decoration-augusta-light/20 hover:decoration-augusta-light transition-all" href="#">Privacy Policy</a>.
            </p>
</footer>
</main>
<!-- Decorative Corner Elements -->
<div class="fixed bottom-0 left-0 w-40 h-40 opacity-10 pointer-events-none grayscale mix-blend-lighten">
<img class="w-full h-full object-cover" data-alt="close-up of a premium leather golf bag with intricate stitching" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEnU8L2WBo6Kc1OgdnFfM-4i4A1VCcOpT9699e6P3918A9glJZWZ1gvBbOuESTktBVV_JIbD2qGEPSTre8Cf06Gy4wgQ2y1VlZK8sCrYnpgASHlhvvvN8iSf2BzZHAtY4wUp00QCf0uguNM1NMjonEsnzZ5fV2_PHrvNoJgAU2XBkk8WiBzSPORSVr1XwLH2zJ43Ldj-zRmdIsS09D0lgY2bc7ryi-J96Tv4X7tRwOK-T1QNcQ-fNv4HUgsEczwf2taO8mFUmwrTE"/>
</div>
<div class="fixed top-0 right-0 w-64 h-64 opacity-5 pointer-events-none mix-blend-screen">
<img class="w-full h-full object-cover" data-alt="macro shot of freshly mown golf green grass" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAExdafRUpd1gem-JGKN1ZcUdQBh3EU8ZWdVFWqhyrI8aPtkEfEBSOcCuzRQT06FqcLKZRIS9Z-TcGV7GYFHqqKQ_owDEBWPmRpJN6SaS7wId9n7i56NvTdtx0oxkF6n-ctmcG9Wkmp9v1bTdZF5EEsjytiN8QWzouyRv18ErsLDMn0nWff2-CUCydWBo3bKEeA3I_xLOFfMoe0SeOjCEHlEoZBriT7uFGkWz_AFcMvux1XNOLLk3i1eKYdDnD6IhBRfv7Y-CKgz40"/>
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
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "augusta-green": "#006747",
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
                        "background": "#0a0f0b",
                        "on-primary-container": "#8fe2ba",
                        "on-error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#574500",
                        "surface-container-high": "#1c211c",
                        "secondary-fixed-dim": "#dfc29f",
                        "secondary": "#dfc29f",
                        "primary": "#84d7af",
                        "tertiary-container": "#cba72f",
                        "on-secondary-fixed": "#281903",
                        "inverse-primary": "#0b6c4b",
                        "surface-container-low": "#121712",
                        "surface-dim": "#101511",
                        "surface": "#101511",
                        "surface-container-highest": "#313631",
                        "on-secondary-fixed-variant": "#574329",
                        "tertiary-fixed": "#ffe088",
                        "tertiary": "#e9c349",
                        "on-surface-variant": "#88938c",
                        "on-surface": "#dfe4dd",
                        "outline-variant": "#3f4943",
                        "on-primary-fixed": "#002114",
                        "inverse-on-surface": "#2c322d",
                        "tertiary-fixed-dim": "#e9c349",
                        "on-secondary": "#3f2d15",
                        "surface-tint": "#84d7af",
                        "on-tertiary": "#3c2f00",
                        "inverse-surface": "#dfe4dd",
                        "outline": "#3f4943",
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
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #0a0f0b;
        }
        .serif-heading {
            font-family: 'Playfair Display', serif;
            font-style: italic;
        }
        .topographic-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100C100 100 100 0 200 0C300 0 300 100 400 100M0 200C100 200 100 100 200 100C300 100 300 200 400 200M0 300C100 300 100 200 200 200C300 200 300 300 400 300' fill='none' stroke='%23006747' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E");
            background-size: cover;
        }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen flex flex-col items-center topographic-bg">
<!-- TopAppBar Section -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-5 bg-background/80 backdrop-blur-md">
<div class="flex items-center">
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">close</span>
</div>
<div class="absolute left-1/2 -translate-x-1/2">
<h1 class="text-2xl font-bold serif-heading text-on-surface tracking-tight">Profile Basics</h1>
</div>
<div class="w-6"></div>
</header>
<main class="w-full max-w-md px-6 pt-28 pb-32 flex-grow flex flex-col">
<!-- Progress Indicator -->
<div class="mb-12">
<div class="flex justify-between items-end mb-3">
<span class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Step 1 of 5</span>
<span class="text-[10px] font-medium uppercase tracking-[0.1em] text-on-surface-variant">Personal Identity</span>
</div>
<div class="h-[2px] w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary w-1/5 shadow-[0_0_8px_rgba(132,215,175,0.4)]"></div>
</div>
</div>
<!-- Avatar Upload Section -->
<div class="flex flex-col items-center mb-12">
<div class="relative group">
<div class="w-36 h-36 rounded-2xl bg-surface-container-low flex items-center justify-center border border-outline/10 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl">
<div class="flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors duration-300">
<span class="material-symbols-outlined text-4xl mb-2">photo_camera</span>
<span class="text-[9px] font-bold uppercase tracking-[0.2em]">Upload</span>
</div>
</div>
<!-- Action Button Overlay -->
<div class="absolute -bottom-2 -right-2 bg-primary text-on-primary w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">add</span>
</div>
</div>
<p class="mt-6 text-sm text-on-surface-variant font-body italic text-center">Add a profile photo for the clubhouse</p>
</div>
<!-- Form Section -->
<div class="space-y-8">
<div class="relative">
<label class="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 ml-1">First Name</label>
<input class="w-full bg-surface-container-low border-none ring-1 ring-outline/20 focus:ring-2 focus:ring-primary/40 rounded-xl py-4.5 px-5 text-on-surface placeholder:text-on-surface-variant/30 transition-all font-body text-base" placeholder="e.g. Alister" type="text"/>
</div>
<div class="relative">
<label class="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 ml-1">Last Name</label>
<input class="w-full bg-surface-container-low border-none ring-1 ring-outline/20 focus:ring-2 focus:ring-primary/40 rounded-xl py-4.5 px-5 text-on-surface placeholder:text-on-surface-variant/30 transition-all font-body text-base" placeholder="e.g. Mackenzie" type="text"/>
</div>
<div class="pt-2 px-1">
<p class="text-xs text-on-surface-variant/60 leading-relaxed italic">
                    Your name will be visible to other members during match booking and on the live leaderboards.
                </p>
</div>
</div>
</main>
<!-- Bottom Action Area -->
<div class="fixed bottom-0 w-full max-w-md px-6 pb-12 pt-8 bg-gradient-to-t from-background via-background to-transparent">
<button class="w-full py-4.5 bg-gradient-to-r from-augusta-green to-primary text-on-primary font-bold rounded-xl shadow-xl shadow-augusta-green/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
<span class="font-bold uppercase tracking-[0.2em] text-[13px]">Continue</span>
<span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
<!-- Background Decorative Gradients -->
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
<div class="absolute -top-[15%] -right-[10%] w-[80%] h-[50%] bg-augusta-green/10 blur-[140px] rounded-full"></div>
<div class="absolute -bottom-[10%] -left-[10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
</div>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Select Home Course</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "augusta-green": "#006747",
                    "augusta-light": "#84d7af",
                    "inverse-on-surface": "#2c322d",
                    "on-primary-fixed-variant": "#005137",
                    "secondary-fixed-dim": "#dfc29f",
                    "outline": "#88938c",
                    "tertiary-container": "#cba72f",
                    "background": "#0a0f0b",
                    "on-primary-fixed": "#002114",
                    "surface-dim": "#101511",
                    "surface": "#101511",
                    "on-primary": "#003825",
                    "on-background": "#dfe4dd",
                    "surface-container": "#151a16",
                    "error": "#ffb4ab",
                    "primary-container": "#006747",
                    "outline-variant": "#3f4943",
                    "surface-tint": "#84d7af",
                    "on-secondary-fixed-variant": "#574329",
                    "tertiary-fixed": "#ffe088",
                    "on-secondary-fixed": "#281903",
                    "surface-container-low": "#111612",
                    "surface-container-highest": "#1c221d",
                    "secondary": "#dfc29f",
                    "primary": "#84d7af",
                    "on-tertiary-container": "#4e3d00",
                    "on-secondary-container": "#d0b492",
                    "on-primary-container": "#8fe2ba",
                    "on-error-container": "#ffdad6",
                    "secondary-container": "#5a452b",
                    "on-surface": "#dfe4dd",
                    "surface-bright": "#353a36",
                    "on-surface-variant": "#9ca3af",
                    "on-secondary": "#3f2d15",
                    "surface-container-lowest": "#070c08",
                    "surface-variant": "#313631",
                    "inverse-primary": "#0b6c4b",
                    "primary-fixed-dim": "#84d7af",
                    "on-tertiary": "#3c2f00",
                    "on-error": "#690005",
                    "on-tertiary-fixed-variant": "#574500",
                    "surface-container-high": "#1c211c",
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
                    "headline": ["Playfair Display", "serif"],
                    "body": ["Manrope", "sans-serif"],
                    "label": ["Manrope", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
    }
.topo-bg {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBSVmm8h6YwLKPWbwK4XZ1Sgfh1pn__MnQg7DmYot7IvG7kwUxP22J_h4Gh4fLSAFF6LQZgt429bwOyb7shxcGS2OAxAhOlhDOelwL_d2mkBl8LYZPzGeGtwaScnRykZqjU9u5becnk0ENEvIcCWLQyZGeAww5aV9oY2Kg5LI84vreZd4zsbcS1tiWi-fAbc2fBO9BsO-oo5CLtDXZc6g4xy_3j7l-xpt0VpAwSsHbrHhVZbfFBB-ZMwV7UrUKjxdunNAI0MlsZIao);
    background-repeat: repeat;
    opacity: 0.03;
    pointer-events: none
    }
.augusta-gradient {
    background: linear-gradient(90deg, #006747 0%, #84d7af 100%)
    }
body {
    min-height: 100dvh;
    background-color: #0a0f0b
    }</style>
</head>
<body class="bg-background text-on-surface font-body min-h-screen flex flex-col relative overflow-x-hidden">
<!-- Topographic Background Layer -->
<div class="fixed inset-0 topo-bg z-0"></div>
<!-- TopAppBar -->
<nav class="w-full sticky top-0 bg-background/80 backdrop-blur-md z-40">
<div class="flex items-center px-6 h-16 w-full justify-between max-w-2xl mx-auto">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-all active:scale-90">arrow_back</span>
<span class="text-lg font-headline italic tracking-tight text-on-surface">Select Home Course</span>
</div>
<div class="flex items-center gap-1">
<span class="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">Step 3</span>
<span class="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/40">of 5</span>
</div>
</div>
</nav>
<!-- Main Content -->
<main class="relative z-10 flex-1 px-6 pt-4 pb-40 max-w-2xl mx-auto w-full">
<!-- Progress Bar -->
<div class="w-full h-[3px] bg-white/5 rounded-full mb-10 flex overflow-hidden">
<div class="h-full w-3/5 augusta-gradient rounded-full shadow-[0_0_8px_rgba(132,215,175,0.4)]"></div>
</div>
<header class="mb-10">
<h1 class="font-headline text-5xl italic tracking-tight text-on-surface mb-3 leading-tight">Find your clubhouse.</h1>
<p class="text-on-surface-variant text-base font-light leading-relaxed max-w-md">Select the course you play most often to tailor your experience and find local matches.</p>
</header>
<!-- Search Bar -->
<div class="relative mb-14">
<div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline-variant text-xl">search</span>
</div>
<input class="w-full bg-surface-container-lowest border border-white/5 rounded-lg py-4.5 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-label placeholder:text-on-surface-variant/40" placeholder="Search courses near you" type="text"/>
</div>
<!-- Course Suggestions -->
<div class="space-y-4">
<div class="flex items-center justify-between mb-4">
<h3 class="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant/60">Nearby Suggestions</h3>
<button class="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:brightness-125 transition-all">View Map</button>
</div>
<!-- Selected Card: Cypress Hollow -->
<div class="group relative overflow-hidden bg-surface-container border border-primary/40 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-surface-container-high ring-1 ring-primary/20">
<div class="flex items-center gap-5">
<div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Cypress Hollow" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmwr0Jf1V22u8P3NeSqWml0jveQwE03TRsfm3z8OMrzBpjIO1rSO0-YBfe_aKRt-x8t9q4SfFYt-y8rNBZE8s8an6VpEKVpAvwfkHcVAvh-D_wTrpITbXUzRWtlMMAV86BssEwTNYoVI_oT_bRN9ShCXxMlkLAjIymx_xfiZapjATQ7x9QScsM12bPm3H-AnpYY1qiKigYr8jo-g0qBrDTR0NFj2HCKZBrtiOkMcZb0NX8CsY2L8lrIOLZD9adYXTvHY7VIA1ItlM"/>
</div>
<div>
<h4 class="font-headline text-2xl text-on-surface italic leading-none mb-1">Cypress Hollow</h4>
<p class="text-on-surface-variant text-[10px] uppercase tracking-[0.15em] font-medium">Pebble Beach, CA</p>
</div>
</div>
<div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
</div>
<!-- Card: Oakmont Country Club -->
<div class="group relative overflow-hidden bg-surface-container-low border border-white/5 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-surface-container hover:border-white/10 active:scale-[0.98]">
<div class="flex items-center gap-5">
<div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Oakmont" class="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoF9vFSwJ7iJpM3UMQ7i5OcbkOZD6THvM7N2Dw-ekqWOqm-EZe8TcYABYICuji8ycAoibCiwDrBZ2qYAXPAySQE6oVzAuQfHM3tgJzew7qs09Q2ArRDwoOQb8AdOSm8-Ud9KpJOhUKJbQqvW7eMpXoAeEFqQ6X8-jbCZ6IlRibTxTpgodSkUaEZae2B_MzYH4bVznx7TDXbyR1kQNZinPN3xD6xb9GNzo4Rvs7f1YfR5nkr6rIQKu2y10E5h8JbcJQhXDe67z2Yn8"/>
</div>
<div>
<h4 class="font-headline text-2xl text-on-surface italic leading-none mb-1">Oakmont Country Club</h4>
<p class="text-on-surface-variant text-[10px] uppercase tracking-[0.15em] font-medium">Oakmont, PA</p>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">add_circle</span>
</div>
<!-- Card: Pine Valley -->
<div class="group relative overflow-hidden bg-surface-container-low border border-white/5 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-surface-container hover:border-white/10 active:scale-[0.98]">
<div class="flex items-center gap-5">
<div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Pine Valley" class="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwf9kT5Ni5vL21pZuC_Ee9TnnJaWQznB_qQm7QvsbFR5YMwa8cRcS2FYWT1PxBrtICKL6qubMLAuMtRtN3XDMPEYY6Cpdh-xUZuzca7DP5hFVcgKVKS2Wrs4eIF4WiaB4D5z4nFlViD4hrzMkGP5MWjlpY2dR0JAtOv-KgLNpexlvhJXgc8Q7_aoNQx-HSHwlWkTMkH3l8OwAwl4IJ0Z0GWM9nTRJdwUhAQpMY5XeCQUodSzWKsfZ-sxMDDCPCJjlnfU5pr_upSaI"/>
</div>
<div>
<h4 class="font-headline text-2xl text-on-surface italic leading-none mb-1">Pine Valley</h4>
<p class="text-on-surface-variant text-[10px] uppercase tracking-[0.15em] font-medium">Pine Hill, NJ</p>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">add_circle</span>
</div>
<!-- Card: Winged Foot -->
<div class="group relative overflow-hidden bg-surface-container-low border border-white/5 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-surface-container hover:border-white/10 active:scale-[0.98]">
<div class="flex items-center gap-5">
<div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest">
<img alt="Winged Foot" class="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBezlNou9pW-74KP8Eo-trfmNFy0pssSDfzWQikauDZoFB-M1GLjVDcSpitKL-sEdD15fhrIdSJz1In--iZAbbGfswvG4cPwEDUs5NHiG5jt2ER9jz9bJafQGAwfffwpBlXdBiFXFdwtn_v6bzOKMUrLlWEvAEnweZPFOzQEs6eBirbExHNEEpvUtFxT_gWL84NK66Owa_LynRNMQBPuRGIyRWxHTJtFIeDy8lnpuC2Hi6aOlopUJJuH6_S-LZ8KO6V8MB7pVeB7tY"/>
</div>
<div>
<h4 class="font-headline text-2xl text-on-surface italic leading-none mb-1">Winged Foot</h4>
<p class="text-on-surface-variant text-[10px] uppercase tracking-[0.15em] font-medium">Mamaroneck, NY</p>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">add_circle</span>
</div>
</div>
<!-- Empty state/Browse link -->
<div class="mt-12 text-center">
<button class="text-on-surface-variant text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-2 hover:border-primary/50 transition-all hover:text-primary">
                Don't see your course? Browse All
            </button>
</div>
</main>
<!-- Bottom Action Bar -->
<footer class="fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-2xl z-50 border-t border-white/5 pb-8 pt-6">
<div class="max-w-2xl mx-auto flex justify-between items-center px-8">
<div class="flex-1">
<p class="text-[9px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/60 mb-0.5">Selected</p>
<p class="text-lg font-headline italic text-primary leading-tight">Cypress Hollow</p>
</div>
<div class="flex items-center gap-6">
<button class="text-on-surface-variant/80 hover:text-on-surface transition-all text-[11px] uppercase tracking-[0.2em] font-bold">
                    Skip
                </button>
<button class="augusta-gradient text-background rounded-xl px-10 py-4 font-bold flex items-center gap-3 shadow-[0_8px_20px_rgba(0,103,71,0.3)] hover:shadow-[0_10px_25px_rgba(0,103,71,0.5)] hover:scale-[1.02] transition-all group">
<span class="text-sm tracking-tight">Continue</span>
<span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</footer>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks | Handicap Onboarding</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "augusta-green": "#006747",
                      "augusta-green-light": "#1B8C67",
                      "brass": "#cba72f",
                      "brass-dim": "#8e7521",
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
                      "background": "#0A0F0B",
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
                      "headline": ["Playfair Display", "serif"],
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
            border: 1px solid rgba(203, 167, 47, 0.4);
        }
        .ghost-border {
            border: 1px solid rgba(63, 73, 67, 0.4);
        }
        .topo-bg {
            background-color: #0A0F0B;
            background-image: url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 50 80 100 100 T 200 100 T 300 100 T 400 100 M0 200 Q 50 180 100 200 T 200 200 T 300 200 T 400 200 M0 300 Q 50 280 100 300 T 200 300 T 300 300 T 400 300' stroke='rgba(255,255,255,0.02)' fill='transparent'/%3E%3C/svg%3E");
            background-repeat: repeat;
        }
    </style>
</head>
<body class="topo-bg text-on-surface font-body min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex items-center px-4 bg-background/80 backdrop-blur-md h-16">
<div class="w-full h-16 flex items-center justify-between px-2">
<button class="text-primary hover:bg-surface-container-high transition-colors duration-300 p-2 rounded-lg">
<span class="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
</button>
<div class="text-on-surface font-headline italic font-black text-2xl tracking-tighter">STICKS</div>
<button class="text-primary hover:bg-surface-container-high transition-colors duration-300 p-2 rounded-lg">
<span class="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 mt-16 px-6 pb-40 max-w-2xl mx-auto w-full flex flex-col">
<!-- Progress Indicator -->
<div class="mt-8 mb-12">
<div class="flex items-center justify-between mb-3">
<span class="font-label uppercase text-[10px] tracking-[0.2em] text-on-surface-variant font-bold">Step 2 of 5</span>
<span class="font-label uppercase text-[10px] tracking-[0.2em] text-primary/80">Onboarding</span>
</div>
<div class="h-[1px] w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary w-2/5"></div>
</div>
</div>
<!-- Hero Section -->
<div class="mb-10">
<h1 class="font-headline italic text-4xl md:text-5xl text-on-surface leading-[1.1] mb-6">
                Establish Your Standing
            </h1>
<p class="text-on-surface-variant text-lg font-body leading-relaxed max-w-md opacity-80">
                A verified handicap is the currency of the clubhouse. Choose how you’d like to track your game.
            </p>
</div>
<!-- Selection Grid -->
<div class="space-y-4">
<!-- Premium Option: GHIN Sync -->
<div class="group relative overflow-hidden bg-surface-container-low/50 premium-border rounded-lg p-6 transition-all duration-300 hover:bg-surface-container cursor-pointer">
<div class="flex items-start justify-between">
<div class="flex-1">
<div class="flex items-center gap-3 mb-2">
<span class="material-symbols-outlined text-brass" data-icon="verified" style="font-variation-settings: 'FILL' 1;">verified</span>
<h3 class="font-headline font-bold text-2xl text-on-surface">Link my GHIN Handicap</h3>
</div>
<p class="text-on-surface-variant text-sm leading-relaxed mb-6 pr-12 opacity-80">
                            Auto-sync your official USGA index for verified competitive play and elite clubhouse access.
                        </p>
<!-- GHIN Placeholder Badge -->
<div class="inline-flex items-center justify-center bg-surface-container-highest/50 border border-brass/20 rounded px-6 py-2">
<span class="font-headline font-black text-on-surface tracking-tighter italic text-lg">GHIN</span>
</div>
</div>
<div class="h-7 w-7 rounded-full border-2 border-brass flex items-center justify-center mt-1">
<div class="h-3.5 w-3.5 bg-brass rounded-full"></div>
</div>
</div>
<!-- Decorative Gold Accent -->
<div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brass/10 to-transparent pointer-events-none"></div>
</div>
<!-- Manual Option -->
<div class="bg-surface-container-lowest/30 ghost-border rounded-lg p-6 transition-all duration-300 hover:bg-surface-container/50 cursor-pointer">
<div class="flex items-start justify-between mb-6">
<div class="flex-1">
<div class="flex items-center gap-3 mb-2">
<span class="material-symbols-outlined text-on-surface-variant/60" data-icon="edit_note">edit_note</span>
<h3 class="font-headline font-bold text-2xl text-on-surface">Enter Manually</h3>
</div>
<p class="text-on-surface-variant text-sm leading-relaxed opacity-80">
                            Provide your current estimated index. Note: Unverified handicaps may limit tournament eligibility.
                        </p>
</div>
<div class="h-7 w-7 rounded-full border-2 border-outline-variant/40 mt-1"></div>
</div>
<div class="relative">
<label class="absolute -top-2 left-3 px-1 bg-background text-primary font-label text-[10px] uppercase tracking-widest font-bold">Handicap Index</label>
<input class="w-full bg-transparent border border-outline-variant/20 rounded-lg py-5 px-5 text-3xl font-headline text-on-surface focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-on-surface-variant/20 transition-all outline-none" placeholder="e.g. 12.4" step="0.1" type="number"/>
</div>
</div>
<!-- No Handicap Link -->
<div class="pt-6 flex justify-center">
<button class="text-on-surface-variant/60 font-label text-[10px] uppercase tracking-[0.25em] hover:text-primary transition-colors py-2 px-4 border-b border-outline-variant/10">
                    No handicap yet
                </button>
</div>
</div>
</main>
<!-- Bottom Action Bar -->
<div class="fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-xl z-50 px-6 py-8 border-t border-white/5">
<button class="w-full py-5 rounded-lg bg-gradient-to-tr from-augusta-green to-augusta-green-light text-white font-label font-bold uppercase tracking-[0.2em] text-xs shadow-xl active:scale-[0.98] transition-all duration-150">
            Continue
        </button>
<div class="flex justify-center items-center gap-2 mt-4 text-on-surface-variant/40">
<span class="material-symbols-outlined text-[14px]" data-icon="lock" style="font-variation-settings: 'FILL' 1;">lock</span>
<span class="font-label text-[9px] uppercase tracking-widest">Secure USGA verification</span>
</div>
</div>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "augusta-green": "#06392c",
                    "augusta-light": "#84d7af",
                    "tertiary": "#e9c349",
                    "background": "#0a0f0b",
                    "inverse-on-surface": "#2c322d",
                    "error": "#ffb4ab",
                    "outline-variant": "#3f4943",
                    "on-tertiary-container": "#4e3d00",
                    "surface-dim": "#101511",
                    "on-secondary": "#3f2d15",
                    "surface-container-low": "#111612",
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
                    "surface-container-lowest": "#070a08",
                    "primary-fixed-dim": "#84d7af",
                    "on-secondary-container": "#d0b492",
                    "primary-container": "#06392c",
                    "surface-container": "#181d19",
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
                    "surface-container-high": "#222723",
                    "secondary-fixed": "#fcdeba",
                    "surface-container-highest": "#313631",
                    "secondary-fixed-dim": "#dfc29f",
                    "on-surface-variant": "#9ba69e",
                    "surface": "#0a0f0b",
                    "on-tertiary-fixed-variant": "#574500"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
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
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .topo-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100' stroke='%23121814' fill='transparent'/%3E%3Cpath d='M0 150 Q 50 100, 100 150 T 200 150 T 300 150 T 400 150' stroke='%230e1310' fill='transparent'/%3E%3Cpath d='M0 200 Q 50 150, 100 200 T 200 200 T 300 200 T 400 200' stroke='%23121814' fill='transparent'/%3E%3Cpath d='M0 250 Q 50 200, 100 250 T 200 250 T 300 250 T 400 250' stroke='%230e1310' fill='transparent'/%3E%3C/svg%3E");
            background-repeat: repeat;
        }
    </style>
<style>
        body {
            min-height: 100dvh;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col overflow-x-hidden topo-bg">
<!-- TopAppBar -->
<header class="fixed top-0 w-full flex justify-between items-center px-6 h-16 z-50">
<div class="flex items-center gap-4">
<button class="text-primary hover:opacity-80 transition-opacity active:scale-95">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<span class="font-body font-medium text-sm tracking-wide text-on-surface">Step 5 of 5</span>
</div>
<div class="flex items-center">
<button class="text-primary font-bold hover:opacity-80 transition-opacity active:scale-95 uppercase text-xs tracking-[0.15em]">
                Skip
            </button>
</div>
</header>
<main class="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-32 relative">
<!-- Content Canvas -->
<div class="w-full max-w-md mx-auto relative z-10 text-center">
<div class="mb-12">
<h1 class="font-headline text-[2.75rem] md:text-5xl text-on-surface font-medium leading-[1.1] mb-6 tracking-tight">
                    Find your crew.
                </h1>
<p class="text-on-surface-variant font-body text-lg max-w-[300px] mx-auto leading-relaxed">
                    Connect your accounts to see which members are already on the green.
                </p>
</div>
<div class="space-y-4">
<!-- Button 1: Sync Contacts -->
<button class="group w-full flex items-center p-4 bg-surface-container-low border border-outline-variant/10 rounded-xl hover:bg-surface-container transition-all duration-300 active:scale-[0.99] text-left">
<div class="w-14 h-14 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary mr-4">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">account_box</span>
</div>
<div class="flex-grow">
<h3 class="text-on-surface font-bold text-base group-hover:text-primary transition-colors">Sync Contacts</h3>
<p class="text-on-surface-variant text-xs font-medium">12 of your contacts are on Sticks</p>
</div>
<div class="text-primary/40 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">chevron_right</span>
</div>
</button>
<!-- Button 2: Connect Instagram -->
<button class="group w-full flex items-center p-4 bg-surface-container-low border border-outline-variant/10 rounded-xl hover:bg-surface-container transition-all duration-300 active:scale-[0.99] text-left">
<div class="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary/80 mr-4">
<span class="material-symbols-outlined text-2xl">photo_camera</span>
</div>
<div class="flex-grow">
<h3 class="text-on-surface font-bold text-base group-hover:text-primary transition-colors">Connect Instagram</h3>
<p class="text-on-surface-variant text-xs font-medium">34 people you follow are on Sticks</p>
</div>
<div class="text-primary/40 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">chevron_right</span>
</div>
</button>
<!-- Button 3: Connect X / Twitter -->
<button class="group w-full flex items-center p-4 bg-surface-container-low border border-outline-variant/10 rounded-xl hover:bg-surface-container transition-all duration-300 active:scale-[0.99] text-left">
<div class="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface/70 mr-4">
<span class="material-symbols-outlined text-2xl">alternate_email</span>
</div>
<div class="flex-grow">
<h3 class="text-on-surface font-bold text-base group-hover:text-primary transition-colors">Connect X / Twitter</h3>
<p class="text-on-surface-variant text-xs font-medium">8 people you follow are on Sticks</p>
</div>
<div class="text-primary/40 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">chevron_right</span>
</div>
</button>
</div>
<!-- Bottom Link -->
<div class="mt-16">
<button class="text-on-surface-variant hover:text-primary transition-colors font-label uppercase text-[11px] tracking-[0.25em] font-bold">
                    Skip for now
                </button>
</div>
</div>
</main>
<!-- Suppressed Bottom Nav -->
<div class="hidden">
<img alt="" data-alt="abstract close up of professional golf club textures with dark greens and metallic highlights in a moody studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFbwykCThq3cr0MkyGtk2z3hWfoRMF9oIy4002vB-WgbCg4KDvag3cWbz2mDeIMvl8tnpXBEh69MZaFzmaUjhS2fmsluNyNNJjvsyHBfb1_NTAL7IZU9s0eBReQOTInCviyh5-KU0UQBGntKomIzYB1GvcpyDx1q1hD8X-OMTIQuA1hEVmQZvwtjMG8Z6uKB0ZaTX07eUhR3roqo89ZaIyQTEvGD_-xbwmWAxfCkI_3xyZ4gEyRPszUuZ8oZW4_r-1OlDf1MTezyk"/>
</div>
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
                  "augusta-green": "#006747",
                  "augusta-gold": "#CBA72F",
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
                  "background": "#080C09",
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
                  "surface-container-low": "#111612",
                  "on-secondary-container": "#d0b492",
                  "tertiary-fixed": "#ffe088",
                  "surface-container-high": "#262b27",
                  "inverse-surface": "#dfe4dd",
                  "surface-dim": "#080C09",
                  "secondary-container": "#5a452b",
                  "surface-container-highest": "#313631",
                  "tertiary-fixed-dim": "#e9c349",
                  "surface": "#080C09",
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
                  "headline": ["Playfair Display", "serif"],
                  "body": ["Manrope", "sans-serif"],
                  "label": ["Manrope", "sans-serif"]
          }
        },
      },
    }
  </script>
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
    }
.selected-glow {
    box-shadow: 0 0 20px rgba(0, 103, 71, 0.4);
    border-color: #006747 !important
    }
.topo-bg {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuDhfEGN6DLWDy3RvJzKrA8SZDKB7UBdEF1XUfqWaf0OxXoDV8vU2yc1c-aTjFDSSGX2n9NKWyNOcNBQ37uDChO8HmGURrRQR-j1kubMe0sqytO59rE-FgdtqvJ_UN6RKaBzW-5Lo7yr7yJ1NQWiPnYncCpwgsBz3CGuLSoAvRFhlRy-AELFZWNIAyqEoDQKC2M9ur16uQ2ODeSn34NtrIpfcwtXXX0F8W5-36F7d-9LY-J0TE70AUs3lJ5945_195PcSUo_lghhrPg);
    background-repeat: repeat;
    opacity: 0.05
    }</style>
</head>
<body class="bg-background text-on-background font-body min-h-screen flex flex-col relative overflow-x-hidden">
<!-- Topographic Overlay -->
<div class="fixed inset-0 topo-bg pointer-events-none z-0"></div>
<!-- TopAppBar -->
<header class="relative z-10 flex justify-between items-center px-6 py-6 w-full">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-opacity" data-icon="arrow_back">arrow_back</span>
<span class="text-sm font-medium tracking-wide uppercase text-on-surface/60">Step 4 of 5</span>
</div>
<h1 class="font-headline italic text-primary text-xl">Step 4 of 5</h1>
<div class="w-6"></div>
</header>
<main class="relative z-10 flex-grow flex flex-col px-6 pt-8 pb-32 max-w-2xl mx-auto w-full">
<!-- Hero Headline -->
<section class="mb-10">
<h2 class="font-headline text-5xl md:text-6xl text-on-background leading-tight mb-6 italic font-medium">
        How do you play?
      </h2>
<p class="text-on-surface-variant text-lg leading-relaxed max-w-md">
        Select all that apply to your game style. This helps us match you with the right foursomes and tournaments.
      </p>
</section>
<!-- Selection Tiles -->
<div class="flex flex-col gap-4">
<!-- Competitive Tile (Selected) -->
<button class="group relative flex items-center p-5 bg-surface-container-low rounded-xl border-2 border-augusta-green selected-glow transition-all duration-300 text-left">
<div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-augusta-green/20 rounded-lg text-primary mr-5">
<span class="material-symbols-outlined text-3xl" data-icon="trophy" style="font-variation-settings: 'FILL' 1;">trophy</span>
</div>
<div class="flex-grow">
<h3 class="font-headline text-2xl text-on-surface mb-0.5">Competitive</h3>
<p class="text-on-surface-variant text-sm">I play to win. Every stroke counts.</p>
</div>
<div class="flex-shrink-0 ml-4">
<div class="w-6 h-6 rounded-full border-2 border-augusta-green bg-augusta-green flex items-center justify-center">
<span class="material-symbols-outlined text-sm text-on-primary-container font-bold" data-icon="check">check</span>
</div>
</div>
</button>
<!-- Casual Tile -->
<button class="group relative flex items-center p-5 bg-surface-container-low rounded-xl border border-white/5 transition-all duration-300 text-left hover:border-augusta-green/40">
<div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white/5 rounded-lg text-on-surface-variant mr-5 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-3xl" data-icon="flag">flag</span>
</div>
<div class="flex-grow">
<h3 class="font-headline text-2xl text-on-surface mb-0.5">Casual</h3>
<p class="text-on-surface-variant text-sm">I play for fun. Bets optional.</p>
</div>
<div class="flex-shrink-0 ml-4">
<div class="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-augusta-green/50 transition-colors"></div>
</div>
</button>
<!-- Social Tile -->
<button class="group relative flex items-center p-5 bg-surface-container-low rounded-xl border border-white/5 transition-all duration-300 text-left hover:border-augusta-green/40">
<div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white/5 rounded-lg text-on-surface-variant mr-5 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-3xl" data-icon="group">group</span>
</div>
<div class="flex-grow">
<h3 class="font-headline text-2xl text-on-surface mb-0.5">Social</h3>
<p class="text-on-surface-variant text-sm">It's about the crew. Golf is the excuse.</p>
</div>
<div class="flex-shrink-0 ml-4">
<div class="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-augusta-green/50 transition-colors"></div>
</div>
</button>
</div>
<!-- Background Decorative Element -->
<div class="fixed -bottom-20 -right-20 -z-0 opacity-[0.15] pointer-events-none">
<img alt="" class="w-[500px] grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT0vqYhdWchJDSyAqvl3uvr93uRMfsew3IE6toKIYMkWnY2OKV4oGcgo_v-HYRWDUn1bBHgjRsukRJqo3JLJmYWt6Vs7zpSvsYwyA4hN7UML3favQMR4mULZC3YbOCPGeyCYlAzohXU1IWdThCMsHCY10-IO9e4eNI-loD87bOCsjEIvuTYQVhtffRNDiWgjj1_vkMNhsrVLPTz7x-NWzDqDQaAYdZQ0B9o5oOz1oV5RY7kPUR9aTNcoGlyGjZikBWHReADXHhZ1A"/>
</div>
</main>
<!-- Bottom CTA Section -->
<footer class="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-20">
<div class="max-w-2xl mx-auto flex flex-col gap-6">
<button class="w-full py-4 bg-gradient-to-r from-augusta-green to-[#008f62] rounded-lg shadow-xl shadow-augusta-green/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]">
<span class="font-label font-bold text-on-primary text-xs tracking-[0.2em] uppercase">Continue</span>
<span class="material-symbols-outlined text-on-primary text-sm group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</button>
<!-- Progress Indicator Step 4 of 5 -->
<div class="flex justify-center items-center gap-2">
<div class="h-1 flex-1 bg-augusta-green/40 rounded-full"></div>
<div class="h-1 flex-1 bg-augusta-green/40 rounded-full"></div>
<div class="h-1 flex-1 bg-augusta-green/40 rounded-full"></div>
<div class="h-1.5 flex-1 bg-augusta-green rounded-full"></div>
<div class="h-1 flex-1 bg-white/10 rounded-full"></div>
</div>
</div>
</footer>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Notification Permissions</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#107e54",
                        "on-primary": "#ffffff",
                        "primary-container": "#006747",
                        "background": "#0a110d",
                        "surface": "#0a110d",
                        "on-surface": "#dfe4dd",
                        "on-surface-variant": "#bec9c1",
                        "outline": "#88938c",
                        "outline-variant": "#3f4943",
                        "surface-container-low": "#0d140f",
                        "surface-container": "#121a14",
                        "surface-container-high": "#18211a",
                        "surface-container-highest": "#1c261e",
                        "secondary": "#dfc29f",
                        "tertiary": "#e9c349"
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
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .topo-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23121a14' stroke-width='1'%3E%3Cpath d='M800 562.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 462.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 362.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 262.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3Cpath d='M800 162.5c-40-20-80-10-120 0s-80 50-120 50-80-30-120-30-80 20-120 20-80-40-120-40-80 30-120 30-40-5-80-15'/%3E%3C/g%3E%3C/svg%3E");
            background-size: cover;
        }
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col overflow-x-hidden topo-bg">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-8 bg-gradient-to-b from-surface to-transparent">
<div class="flex items-center">
<span class="material-symbols-outlined text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">close</span>
</div>
<h1 class="font-headline text-2xl font-bold tracking-tighter text-on-surface">STICKS</h1>
<div class="w-6"></div>
</header>
<!-- Main Content -->
<main class="flex-grow flex flex-col items-center justify-center px-8 relative overflow-hidden pt-20">
<div class="max-w-md w-full flex flex-col items-center text-center space-y-12 z-10">
<!-- Hero Illustration -->
<div class="relative w-64 h-64 flex items-center justify-center">
<div class="absolute inset-0 bg-primary/5 blur-[60px] rounded-full"></div>
<div class="relative bg-surface-container-high rounded-xl p-8 border border-outline-variant/20 shadow-2xl">
<div class="flex flex-col items-center gap-4">
<span class="material-symbols-outlined text-tertiary text-7xl" style="font-variation-settings: 'FILL' 1;">trophy</span>
<div class="flex flex-col gap-2 w-full">
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full w-3/4 bg-primary rounded-full"></div>
</div>
<div class="flex justify-between items-center text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">
<span>Leaderboard Live</span>
<span class="text-primary">Updated</span>
</div>
</div>
</div>
<!-- Floating Notification Pill -->
<div class="absolute -top-4 -right-4 bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-lg" style="font-variation-settings: 'FILL' 1;">notifications</span>
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
<!-- Features -->
<div class="grid grid-cols-2 gap-3 w-full">
<div class="bg-surface-container-low p-4 rounded-lg flex flex-col items-start text-left gap-2 border border-outline-variant/10">
<span class="material-symbols-outlined text-primary text-xl">payments</span>
<p class="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">Settlements</p>
</div>
<div class="bg-surface-container-low p-4 rounded-lg flex flex-col items-start text-left gap-2 border border-outline-variant/10">
<span class="material-symbols-outlined text-secondary text-xl">schedule</span>
<p class="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">Tee Times</p>
</div>
</div>
<!-- Actions -->
<div class="w-full space-y-6">
<button class="w-full bg-[#006747] text-white py-5 rounded-lg shadow-lg shadow-[#006747]/10 active:scale-[0.98] transition-all group overflow-hidden relative">
<span class="relative z-10 text-xs font-label font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                    Turn On Notifications
                    <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">chevron_right</span>
</span>
<div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</button>
<button class="w-full text-on-surface-variant hover:text-on-surface font-label text-[10px] uppercase tracking-[0.3em] font-bold transition-colors">
                Not now
            </button>
</div>
</div>
</main>
<!-- Bottom Branding -->
<footer class="py-6 flex justify-center opacity-30">
<span class="material-symbols-outlined text-on-surface text-xl">sports_golf</span>
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
      body {
        font-family: 'Manrope', sans-serif;
      }
      .serif-display {
        font-family: 'Newsreader', serif;
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="bg-emerald-950/70 backdrop-blur-3xl fixed top-0 w-full z-50 shadow-[0_8px_24px_rgba(0,56,37,0.4)]">
<div class="flex items-center justify-between px-6 h-16 w-full">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="Close-up portrait of a professional golfer in a deep green locker room with soft directional lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBABkEdnf5lsx19BDwena2kQayZTHWLQsHropoifBJq0j0oY3a_gyi2ismxtYPgnINZ1AfdIha5Hbe-VXYrz2tTIfAFOfzxyT4lLkFR9fX_X-vDQ0XQ0yCG_o90veVzpeWWRXPTzB1psZFsr1uMGhQ7Msx4jC_rwbkf-JxXMSSzTtVINwxNpv7rIfVLwhIQveHFR49Zgb_JqJVv84Y-M3j-wjzc5B8WuG614XufoVjCl0Bes3CkvreAfVcPFOO8hffuCP9Jb6ZlNIw"/>
</div>
</div>
<h1 class="font-['Newsreader'] tracking-[0.2em] uppercase text-2xl font-bold text-emerald-50">STICKS</h1>
<div class="hover:opacity-80 transition-opacity scale-95 active:duration-150 cursor-pointer">
<span class="material-symbols-outlined text-emerald-400">notifications</span>
</div>
</div>
</header>
<main class="pt-24 px-4 max-w-2xl mx-auto">
<!-- Section Header & Toggles -->
<div class="flex flex-col gap-6 mb-8">
<div class="flex items-end justify-between">
<h2 class="serif-display text-4xl font-light italic leading-none">The Rankings</h2>
<div class="flex gap-1 bg-surface-container-low p-1 rounded-lg">
<button class="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded bg-primary-container text-on-primary-container">Season</button>
<button class="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:bg-surface-container transition-colors">Monthly</button>
<button class="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:bg-surface-container transition-colors">Daily</button>
</div>
</div>
</div>
<!-- Podium Section (Asymmetric Grid) -->
<div class="grid grid-cols-12 gap-4 mb-10 items-end">
<!-- Silver (2nd) -->
<div class="col-span-4 flex flex-col gap-3">
<div class="relative bg-surface-container-high p-4 rounded-lg border-b-2 border-outline/30 flex flex-col items-center text-center">
<div class="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-outline-variant flex items-center justify-center text-on-surface font-bold text-xs shadow-lg">2</div>
<div class="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-outline-variant/50">
<img alt="Player avatar" class="w-full h-full object-cover" data-alt="Athletic man in premium golf attire smiling subtly on a moody golf course background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7i8gVYNJUahXMam528t0ypqMnZah0DweVFpUnkKUm26zSaQ05WRpNwhoIcaBjXdH7YyuQsaAE1JPGtSiWmUyurzZSEB4wtiaFPaAsOxnOgNd7orAJdKKM1ebJ71COVxmQXBy8puRoZiRd7xEfbaNjJGDHucBi2oKhXB4OVXtYR4lsB-YJfkQYfvMpiv6kVTab11cKNwaI8fYxK8sjYSb8I3um3tZJSG72t1TCw0NQbkyX13GEWfuZwdqL9kcfhmnQ-M_mwHCWIo4"/>
</div>
<span class="text-[10px] uppercase tracking-tighter font-bold text-on-surface-variant">J. VANCE</span>
<span class="serif-display text-xl text-on-surface">2,840</span>
</div>
</div>
<!-- Gold (1st) -->
<div class="col-span-4 flex flex-col gap-4">
<div class="relative bg-surface-container-highest p-5 rounded-lg border-t-2 border-tertiary/40 flex flex-col items-center text-center shadow-[0_12px_40px_rgba(233,195,73,0.15)]">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary font-extrabold text-sm shadow-[0_4px_10px_rgba(233,195,73,0.5)]">1</div>
<div class="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-tertiary">
<img alt="Player avatar" class="w-full h-full object-cover" data-alt="Sophisticated woman in modern sports jacket against a dark lush green forest background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvqnEhkP-7fOFBt8MlhUHevxKgjpw3HluftWbdOzX7wdRbskpvZ-QmuTMBZQcyM_ParlSZGJyzTv8tQgak40_jSx1f49GTudoNftQfZmYvlcBDOB9xqTgM5hbXQSs0m7_gHgPX2zMcqR-nSx4Y1JQsuV5OcQVe095zCCQ2xRFUXt3xE-mi4uBe9rWb3cQ-7_l5ly8LNi7IBYdtJ2jgpShSR-Pr4viIidwDVRHA8_wAsmM1Vil8Xs0J77lwbG3t_oJZ-Mv8vJNVV1I"/>
</div>
<span class="text-[11px] uppercase tracking-widest font-black text-tertiary">E. WHITTAKER</span>
<span class="serif-display text-3xl font-bold text-on-surface">3,120</span>
</div>
</div>
<!-- Brass (3rd) -->
<div class="col-span-4 flex flex-col gap-3">
<div class="relative bg-surface-container-high p-4 rounded-lg border-b-2 border-secondary-container/30 flex flex-col items-center text-center">
<div class="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-bold text-xs shadow-lg">3</div>
<div class="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-secondary-container/50">
<img alt="Player avatar" class="w-full h-full object-cover" data-alt="Portrait of a young competitive athlete in high-performance sportswear with dramatic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq3Rp4oCtggfCgS1V07n2XRjMXFQ3mYZBy8oAU6lSJGayfYUG15DnUwOSR6-MGBBkFYSAJMobZMIMOMWLJPD8gOHeEV8qkRI1HOi2ZV5VvdcJSfZgoIo07USI90kuX1Xmj2WI6NhQf0heb2JDpmhzmY81Kvu3v0w-6C58aVyBy0tiSdTMN5RHVPjWoExzOA_mvh3kl2W_T_pcohMcLoHeCRUiU5V35ZE-EReu5RPQGGrrHE8YOurcV-oTeJMhnVL-xr-kDApL4rDQ"/>
</div>
<span class="text-[10px] uppercase tracking-tighter font-bold text-on-surface-variant">M. CHEN</span>
<span class="serif-display text-xl text-on-surface">2,710</span>
</div>
</div>
</div>
<!-- Leaderboard List -->
<div class="space-y-1">
<!-- List Header -->
<div class="grid grid-cols-12 px-4 py-2 text-[9px] uppercase tracking-widest font-black text-on-surface-variant/50">
<div class="col-span-1">RK</div>
<div class="col-span-6">Player / HCP</div>
<div class="col-span-2 text-center">Trend</div>
<div class="col-span-3 text-right">Points</div>
</div>
<!-- Rank Items -->
<div class="bg-surface-container-low rounded-lg p-4 grid grid-cols-12 items-center hover:bg-surface-container transition-colors group">
<div class="col-span-1 serif-display text-lg text-on-surface-variant">4</div>
<div class="col-span-6 flex items-center gap-3">
<div class="w-10 h-10 rounded overflow-hidden bg-surface-container-highest">
<img alt="Player" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Close up of a professional golfer adjusting their glove, moody lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMCM4R5Ztm5qhedCD57G9CqmGDBAKPivYXmGgXmZECU6RfArvjh6twLkt-MKQAFynHfQYmxm4rcSd4tDUmoRJeQVaH2aZrYq7I-70r6GX8wZkHgT0eU8tDPv4waUMasVF9MCx_Lh6DK1_DO03cjK3bHIA3_9UHc-fQp7Lcl1aRYSHSRlLKlyboVwdbGq2DAnSFZAM-Ox56KDOw5SW7e_ukgWC_fhUvs_VgVnq2qG2SQ7ULTmu0lswL3dE7XJ0TiRGoKBlkJdaI0jA"/>
</div>
<div>
<div class="text-[12px] font-bold uppercase tracking-tight text-on-surface">Marcus Sterling</div>
<div class="text-[10px] font-medium text-primary">HCP 4.2</div>
</div>
</div>
<div class="col-span-2 flex justify-center">
<span class="material-symbols-outlined text-emerald-400 text-sm">keyboard_double_arrow_up</span>
</div>
<div class="col-span-3 text-right serif-display text-lg">2,455</div>
</div>
<div class="bg-surface-container-low/50 rounded-lg p-4 grid grid-cols-12 items-center hover:bg-surface-container transition-colors group">
<div class="col-span-1 serif-display text-lg text-on-surface-variant">5</div>
<div class="col-span-6 flex items-center gap-3">
<div class="w-10 h-10 rounded overflow-hidden bg-surface-container-highest">
<img alt="Player" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Athlete in focused golf swing silhouette at sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Pg22a-lhB0o81hCCcx7MeQT2fDJixJQJ1n1Y6vqBOkUKiY_BXzeVUquKZefBtVGZbF_0Khjyeqd7ulNyWBynzzgGHRBv4RgEtcfSDPscET-N0PgWrZMsfscRWPFyDIPmUgGw5_xUyvt4GL6OvX1UMHw2e6Ou5fj5jRSzKEQYS-KQKu7XFgT1W5MBn5IIca4e_M-n674xkJwzAXQ-ldYqdu23DqyA5X5YXbFoRUC9O5nCkBhOCAiDg7O0cJAN2jIsu8_Y90hwYX0"/>
</div>
<div>
<div class="text-[12px] font-bold uppercase tracking-tight text-on-surface">Sarah Thorne</div>
<div class="text-[10px] font-medium text-primary">HCP 2.1</div>
</div>
</div>
<div class="col-span-2 flex justify-center">
<span class="material-symbols-outlined text-on-surface-variant/30 text-sm">remove</span>
</div>
<div class="col-span-3 text-right serif-display text-lg">2,390</div>
</div>
<div class="bg-surface-container-low rounded-lg p-4 grid grid-cols-12 items-center hover:bg-surface-container transition-colors group">
<div class="col-span-1 serif-display text-lg text-on-surface-variant">6</div>
<div class="col-span-6 flex items-center gap-3">
<div class="w-10 h-10 rounded overflow-hidden bg-surface-container-highest">
<img alt="Player" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Person putting on a green with deep shadows and soft backlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSLNtE1cPD3-60_0-nwFvpNMvCDzLVhqf-xnq5A8_JuB7Ac9MG910zOicJMTRGiDCBcFsrcrwvqebuTUjua_tHYb6I5UprcSoZRSHg1vffexVhLiATXPgObpj6W9O0lFkcuWyouZw06QIQr_4PsLWaay-b0JcbdQy8TIAPl2i5GMGTu2lF8Kv0151B7r_Fb1rIwsEUXxE0ngdRsDZ71Nbv53vRkQsUDkS46ZrQcrLgLy_MvfJeBAULQHFzJXDY7ldbstW4Hjyvm0"/>
</div>
<div>
<div class="text-[12px] font-bold uppercase tracking-tight text-on-surface">David Loft</div>
<div class="text-[10px] font-medium text-primary">HCP 8.5</div>
</div>
</div>
<div class="col-span-2 flex justify-center">
<span class="material-symbols-outlined text-error text-sm">keyboard_double_arrow_down</span>
</div>
<div class="col-span-3 text-right serif-display text-lg">2,210</div>
</div>
<div class="bg-surface-container-low/50 rounded-lg p-4 grid grid-cols-12 items-center hover:bg-surface-container transition-colors group">
<div class="col-span-1 serif-display text-lg text-on-surface-variant">7</div>
<div class="col-span-6 flex items-center gap-3">
<div class="w-10 h-10 rounded overflow-hidden bg-surface-container-highest">
<img alt="Player" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Sports enthusiast looking at club selection in locker room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWYf_A6AAYWH5McPyetHjtylOqa1sC-qDVQ9By6eUFoeQtJ62vA18Ay5HT5J6tr1bdwxcG_6OBG9ORe_JVoo82laU4EISdTR-M9bRKjzzwnVUw3fTj0Pat82pE6CFbchnUA-Eqkkp5ZUEOvmHyIWsNEwot4RXCJdyOYPSTfAN_zLfcYijq1miX5WN2HLmXiDqaU733ydIAT3RBRlfh-_rIBREIQSSN6jR3eXJ3fkS-FZGaQRPShOblTvYs02LgbsmxBBLniOFTgyE"/>
</div>
<div>
<div class="text-[12px] font-bold uppercase tracking-tight text-on-surface">Leo Gregory</div>
<div class="text-[10px] font-medium text-primary">HCP 5.0</div>
</div>
</div>
<div class="col-span-2 flex justify-center">
<span class="material-symbols-outlined text-emerald-400 text-sm">keyboard_arrow_up</span>
</div>
<div class="col-span-3 text-right serif-display text-lg">2,150</div>
</div>
</div>
</main>
<!-- Sticky 'My Rank' Card -->
<div class="fixed bottom-[88px] left-0 w-full px-4 z-40 pointer-events-none">
<div class="max-w-2xl mx-auto pointer-events-auto">
<div class="bg-primary-container/95 backdrop-blur-xl p-4 rounded-lg shadow-[0_-10px_30px_rgba(0,0,0,0.4)] border border-primary/20 grid grid-cols-12 items-center">
<div class="col-span-2 flex flex-col items-center">
<span class="text-[10px] uppercase font-bold text-on-primary-container/60">Pos</span>
<span class="serif-display text-2xl font-bold text-on-primary-container">12</span>
</div>
<div class="col-span-7 pl-4">
<div class="text-[13px] font-black uppercase tracking-wider text-on-primary-container">Alex Mercer (You)</div>
<div class="flex items-center gap-2">
<span class="text-[10px] font-bold text-on-primary-container/80 bg-black/20 px-2 rounded">HCP 11.2</span>
<div class="h-1 w-24 bg-black/20 rounded-full overflow-hidden">
<div class="h-full bg-primary w-3/4"></div>
</div>
</div>
</div>
<div class="col-span-3 text-right">
<div class="text-[9px] uppercase font-bold text-on-primary-container/60">Points</div>
<div class="serif-display text-xl text-on-primary-container">1,820</div>
</div>
</div>
</div>
</div>
<!-- BottomNavBar -->
<nav class="bg-emerald-950/80 backdrop-blur-2xl fixed bottom-0 w-full z-50 rounded-t-lg shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
<div class="flex justify-around items-center px-4 pb-6 pt-2 w-full">
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200 cursor-pointer">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Home</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200 cursor-pointer">
<span class="material-symbols-outlined" data-icon="golf_course">golf_course</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Play</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-400 border-t-2 border-amber-600 pt-2 tap-highlight-none active:scale-90 duration-200 cursor-pointer">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Rank</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200 cursor-pointer">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Bets</span>
</div>
<div class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200 cursor-pointer">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Profile</span>
</div>
</div>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,700&amp;family=Manrope:wght@400;500;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
      .glass-card {
        background: rgba(28, 33, 28, 0.7);
        backdrop-filter: blur(20px);
      }
      .newsreader-numbers {
        font-family: 'Newsreader', serif;
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body min-h-screen pb-24">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-emerald-950/70 backdrop-blur-3xl flex items-center justify-between px-6 h-16 w-full shadow-[0_8px_24px_rgba(0,56,37,0.4)]">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
<img class="w-full h-full object-cover" data-alt="User profile avatar in the locker room, athletic male in premium golf attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WVLeIQWhiABBK5qI1zUY2s9XEuz8Jdw_w3zjAaCly5tz2g9lg7JmG3DEYox9WvUzopi8B5pMoUuK8HqTJ2ovHGcqmFZtW4QowDjV6GTZ6O2wBqK5k9PR4UMR-TomWMZNcCc8DGKYlr_dXx_cxb1ro4RaMDlMdGO7jxUU10f2c2oGxcOoB9yyM583nRIffihZjev3Z4CJSsPVBXsIg1oxAljMzyNq8exVt1S__CQZlIJZmBjE7Rtk1MdEivUAY0WTvCFmIJgQ38w"/>
</div>
<span class="text-2xl font-bold tracking-[0.2em] text-emerald-50 font-headline uppercase">STICKS</span>
</div>
<button class="text-emerald-100/60 hover:opacity-80 transition-opacity active:duration-150 active:scale-95">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</header>
<main class="pt-24 px-4 max-w-4xl mx-auto space-y-8">
<!-- Header: Identity Section -->
<section class="relative">
<div class="flex flex-col md:flex-row items-end gap-6 pb-8">
<div class="relative -mb-4">
<div class="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-2xl border-4 border-surface-container">
<img class="w-full h-full object-cover" data-alt="Close up portrait of a golfer in a professional green polo, sunlight hitting face, golf course background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpYNry-kG56zNaJhjn8MJmVbtaAUWRsIK3Dc2-Fg_RV3r6yGTcjDgSXM7JbXzTWIdgOwGoi5NoqeJ-1rs8RpFzSUZLMmNEiGnFpMI9Cvcsnhbu1z8a4AN49YCO_kwYFhGgyaRWqSW99yEbTJIXr59ByOqEHZRPiJW1yp3XpBH_19qG7F0k-E47nIt-AKHPpZN0mXtD2Gx5zsJ9DlBiLdf-wZLTUJWvuuxoVe0aGMgTySZyaSEgXIUQlMouM5-WnL6tJDKfSiHkfaM"/>
</div>
<div class="absolute -bottom-3 -right-3 bg-tertiary text-on-tertiary px-3 py-1 rounded-sm font-bold text-xs tracking-tighter uppercase shadow-lg">
                        MEMBER
                    </div>
</div>
<div class="flex-1 flex flex-col items-start gap-1">
<h1 class="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight">Marcus Sterling</h1>
<div class="flex items-center gap-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="location_on">location_on</span>
<span class="text-on-surface-variant font-label text-sm uppercase tracking-widest">Pine Valley</span>
</div>
<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-sm" data-icon="verified">verified</span>
<span class="text-on-surface-variant font-label text-sm uppercase tracking-widest">Pro Certified</span>
</div>
</div>
</div>
<div class="w-full md:w-auto flex flex-col items-end gap-1">
<span class="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">HCP Index</span>
<span class="text-6xl md:text-7xl font-headline font-bold text-primary leading-none">4.2</span>
</div>
</div>
</section>
<!-- Stats Grid: 4-up -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-4">
<div class="bg-surface-container-low p-6 flex flex-col gap-2 relative overflow-hidden group">
<div class="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
<span class="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Avg Score</span>
<span class="text-3xl font-headline font-bold newsreader-numbers">76.4</span>
</div>
<div class="bg-surface-container-low p-6 flex flex-col gap-2 relative overflow-hidden group">
<div class="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
<span class="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">GIR %</span>
<span class="text-3xl font-headline font-bold newsreader-numbers">58.2</span>
</div>
<div class="bg-surface-container-low p-6 flex flex-col gap-2 relative overflow-hidden group">
<div class="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
<span class="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Scrambling</span>
<span class="text-3xl font-headline font-bold newsreader-numbers">41%</span>
</div>
<div class="bg-surface-container-low p-6 flex flex-col gap-2 relative overflow-hidden group">
<div class="absolute top-0 left-0 w-1 h-full bg-tertiary/20 group-hover:bg-tertiary transition-colors"></div>
<span class="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Tournaments Won</span>
<span class="text-3xl font-headline font-bold newsreader-numbers">04</span>
</div>
</section>
<!-- Rivalry Module -->
<section class="bg-surface-container-low rounded-lg p-6">
<div class="flex justify-between items-center mb-8">
<h2 class="text-xl font-headline font-bold tracking-tight uppercase">Rivalry</h2>
<span class="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Head-to-Head Record</span>
</div>
<div class="space-y-6">
<!-- Rival 1 -->
<div class="flex items-center gap-4 group">
<div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
<img class="w-full h-full object-cover" data-alt="Portrait of a competitive golfer, intense expression, wearing a navy cap and white polo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjVIpayZLACt-hW_-7_aJdpCqkH7KlSrIZjW5z_f8wz-WdeBgQC409kw_1FSfaO1r5ZMHufPSYs8sDGHKWpDiww9Lk8BKQAfGTZB1KQMC1gIhvGtwGFTF5_hzwcybZtUepSyL0uwewSI7y2aDCd3chplXbj6vCjc3x9NIHmUCpS5LBH_k8h-aUn8_YWPkjV4e-wJtuFzw_lYW6gPk4o1l0o6P8RXgZ7VLoLElOcUKD1zPJYtUhVpYhdUVe5yMnJv1DA1_VKTfiUQw"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-end mb-1">
<span class="font-bold text-on-surface">Dominic V.</span>
<span class="text-tertiary font-headline font-bold">12 - 8</span>
</div>
<div class="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary" style="width: 60%"></div>
</div>
</div>
</div>
<!-- Rival 2 -->
<div class="flex items-center gap-4 group">
<div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
<img class="w-full h-full object-cover" data-alt="Female golfer profile picture, confident smile, outdoor sunlight with greenery background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUD8lB92daHIsCbBI2ngULFbcHyrKi1VWqXjLNhH5uOezsp9JLsujCSnxRkB7oi4xKO9uS4Wg_vbPCEIhmPjh-cZJgXS7AgKOH4Gc4T26UxdTkxcwiN-ketiR865Uqwbmqzjl1Yrtx0qWP5nRMMLho6oZ8iwTxc8vP_e7HWjS7HTJCpxyV7LsLV9ujlj24MJhqXoFB4_58sKeSFwCazPRExQCZyIPebw7_T8v8rjbRCBLyBsE9-AiVFTh9Im0XsTeArEvo8AyMX3c"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-end mb-1">
<span class="font-bold text-on-surface">Sarah Thorne</span>
<span class="text-primary font-headline font-bold">9 - 9</span>
</div>
<div class="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-on-surface-variant" style="width: 50%"></div>
</div>
</div>
</div>
<!-- Rival 3 -->
<div class="flex items-center gap-4 group">
<div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
<img class="w-full h-full object-cover" data-alt="Middle aged male golfer with glasses, classic sporting look, pine trees in background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD67au7RZ7EiW1akiFCdIzHk8in3Zado6dXeZ1LWxsgofSokf1bTmzIPKB8kXwRBht_YWO5huUW0KFwOUb1aN6uMb8cMz-0FFmFgHEdawraWbf6t7XTnXvwJSZM_GsuOHDoXnPcS0JE8tCxLDH8U0gmiL_6NBc39uiFNh0nsy1BxjCC_GsB7mKG5P4ElM4HrIKawIa5WBEhBS5evER4d5_Xxag2vueM82rrC7QjrZJqWFa_fGDAv6xXptehHIFuC3iXgCO_3j9UkgU"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-end mb-1">
<span class="font-bold text-on-surface">Jameson K.</span>
<span class="text-error font-headline font-bold">4 - 11</span>
</div>
<div class="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-error-container" style="width: 27%"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Activity Timeline -->
<section class="space-y-6 pb-12">
<div class="flex justify-between items-center">
<h2 class="text-xl font-headline font-bold tracking-tight uppercase">Recent Rounds</h2>
<button class="text-xs font-label text-primary uppercase tracking-widest hover:opacity-80 transition-opacity">View All</button>
</div>
<div class="space-y-4">
<!-- Activity Item 1 -->
<div class="flex gap-4">
<div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden group relative">
<img class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" data-alt="Lush green fairway of a premium golf course at dawn with long shadows and morning dew" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUE3TPJea1j-1ryJH2StSkRiG_WhmI5YHH61_XaNNYjMuqCd7KPWBru6AJ3ZMMJA2fsVHh4DgqrHyJbO911z2A9ctWTcf6cwXJT_gptsLFD-VhMgeIS5MQBdS3OLpbZf_sM-mLs08nml7mhLiZ8COao24G6cuFelSnQq0s-iBh5EkMe66cERenl6Wv3AckjYxVBLmmaWErjPdXSgrSaSSekeHWMqRYqn_MOMZ1u9RNQvWJpScpJ45wMRlxNkuo7Nglva80sORZyKI"/>
<div class="absolute inset-0 bg-emerald-950/20"></div>
</div>
<div class="flex-1 flex flex-col justify-center gap-1 border-b border-outline-variant/20 pb-4">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg">Augusta National</h3>
<span class="text-primary font-headline text-2xl font-bold">72</span>
</div>
<p class="text-on-surface-variant text-sm line-clamp-1">Invitational Round · Yesterday</p>
<div class="flex gap-2 mt-1">
<span class="px-2 py-0.5 bg-surface-container text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Par 72</span>
<span class="px-2 py-0.5 bg-surface-container text-[10px] font-label uppercase tracking-widest text-tertiary">New PR</span>
</div>
</div>
</div>
<!-- Activity Item 2 -->
<div class="flex gap-4">
<div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden group relative">
<img class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" data-alt="Coastal golf course with bunker and ocean views at sunset, golden hour lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPKw6psTqpAFPsI33rAP7FBP_DvN8j3PDGnXJp_GnGBWyyxgYQMLRKtvEWo2poDWJWyQTsv2u2acjOLi96xb2jUb5HAOQBgExcWrPjTwc8QYZ7JrZZYMMBJQzAjztfIa05gfL-zSWA_k_tYbeqol6v3r2AIH2e1khIhHCG_UGtPGdkxI0G-BpOFk3c9LLLaOgKbUEOu3rxgR9zvNAgddR0-oNTANFUb1AuRhCyDWwsfF87YfvqgN0E_5BaMCdGi37lT6KIAnf8iqU"/>
<div class="absolute inset-0 bg-emerald-950/20"></div>
</div>
<div class="flex-1 flex flex-col justify-center gap-1 border-b border-outline-variant/20 pb-4">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg">Pebble Beach GL</h3>
<span class="text-on-surface font-headline text-2xl font-bold">79</span>
</div>
<p class="text-on-surface-variant text-sm line-clamp-1">Casual Match vs Dominic · 4d ago</p>
<div class="flex gap-2 mt-1">
<span class="px-2 py-0.5 bg-surface-container text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Par 72</span>
</div>
</div>
</div>
<!-- Activity Item 3 -->
<div class="flex gap-4">
<div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden group relative">
<img class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" data-alt="Densely wooded golf course fairway with tall pines and perfectly manicured grass" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh-5JWm0pS_bSXWBlmLTcqHlFx2UrNsPLvFq2WKl5Vmp85M9RjwZKugNLBaD7WwYw3BD13zRFejiigX2pSV6Trr0EKp_Iv9HTLzaT8GHS2PviD_izFWWgraTSaIwD_UBVshxnrBdQt0GUvszs4oxFCtpkkk4gcvcVG2RRGCVX5W4MEGH7hLXWTMOIGDWPPSeLU8bUxQACyUs7jV5n__1ptiEKX7Glsry7A37xAVX5JnABeTOf3MAc3j1VS2IKruvwzEkPNrco_-2E"/>
<div class="absolute inset-0 bg-emerald-950/20"></div>
</div>
<div class="flex-1 flex flex-col justify-center gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg">Pine Valley</h3>
<span class="text-on-surface font-headline text-2xl font-bold">75</span>
</div>
<p class="text-on-surface-variant text-sm line-clamp-1">Club Championship · Oct 12</p>
<div class="flex gap-2 mt-1">
<span class="px-2 py-0.5 bg-surface-container text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Par 70</span>
<span class="px-2 py-0.5 bg-secondary-container text-[10px] font-label uppercase tracking-widest text-on-secondary-container">1st Place</span>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-emerald-950/80 backdrop-blur-2xl rounded-t-lg shadow-[0_-4px_20px_rgba(0,0,0,0.5)] z-50">
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="home">home</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="golf_course">golf_course</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Play</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="leaderboard">leaderboard</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Rank</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="payments">payments</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Bets</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-400 border-t-2 border-amber-600 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="person" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Profile</span>
</a>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,700&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
        .serif-text { font-family: 'Newsreader', serif; }
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
<body class="bg-surface text-on-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-emerald-950/70 backdrop-blur-3xl shadow-[0_8px_24px_rgba(0,56,37,0.4)] flex items-center justify-between px-6 h-16 w-full">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/20">
<img class="w-full h-full object-cover" data-alt="User profile avatar close up in a moody high-end locker room setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8xyjV2mWdAWA5lFy8LW15uC0_QiaS0Us3ocub1IehY8AAautmcA89B1OeDdIEmA71c8Ed6iSOIpG8GN6aYOiQrHzbmdhb7_7mLaf30i8u7WTtVgyyhQEUYLNh32mgcWTP7E0cVdAZ4TuYl_PZRxHK7DCXD1ZkARUKBgV29sd_eamVoJikybmr_hAmESMoGIi2l7QFYKxlxfHFe693UwspXQYOr6CdijK6yocDE70SWjcWenRdPixADEmq2Uc0FKdZAwcuR1b5G98"/>
</div>
</div>
<h1 class="text-2xl font-bold tracking-[0.2em] text-emerald-50 dark:text-emerald-50 font-['Newsreader'] uppercase">STICKS</h1>
<button class="text-emerald-400 hover:opacity-80 transition-opacity active:duration-150 scale-95">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</header>
<main class="pt-24 px-6 max-w-2xl mx-auto space-y-8">
<!-- Season Bankroll: High-end Display -->
<section class="relative overflow-hidden rounded-lg bg-surface-container-low p-8 border-l-4 border-secondary shadow-lg">
<div class="absolute top-0 right-0 p-4 opacity-10">
<span class="material-symbols-outlined text-8xl" data-icon="account_balance_wallet">account_balance_wallet</span>
</div>
<div class="relative z-10">
<p class="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-1">Season Bankroll</p>
<div class="flex items-baseline gap-2">
<span class="serif-text text-5xl font-bold text-on-surface">$14,850</span>
<span class="text-primary text-sm font-bold">+12%</span>
</div>
<div class="mt-4 flex gap-4">
<div class="bg-surface-container p-3 rounded-sm flex-1">
<p class="text-[10px] uppercase text-on-surface-variant">Active Risk</p>
<p class="font-bold text-on-surface">$2,400</p>
</div>
<div class="bg-surface-container p-3 rounded-sm flex-1">
<p class="text-[10px] uppercase text-on-surface-variant">Avg. Payout</p>
<p class="font-bold text-on-surface">$850</p>
</div>
</div>
</div>
</section>
<!-- Quick Actions -->
<div class="grid grid-cols-2 gap-4">
<button class="bg-gradient-to-br from-primary-container to-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,56,37,0.4)] transition-transform active:scale-95">
<span class="material-symbols-outlined text-xl" data-icon="add_circle">add_circle</span>
<span class="text-sm uppercase tracking-wider">Post Challenge</span>
</button>
<button class="bg-secondary-container text-on-secondary-container font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
<span class="material-symbols-outlined text-xl" data-icon="menu_book">menu_book</span>
<span class="text-sm uppercase tracking-wider">View Rules</span>
</button>
</div>
<!-- Active Wagers: Bento Style Cards -->
<section>
<div class="flex justify-between items-end mb-4">
<h2 class="serif-text text-2xl font-bold text-on-surface">Active Rounds</h2>
<p class="text-primary text-[10px] font-bold uppercase tracking-widest">3 Live matches</p>
</div>
<div class="space-y-4">
<!-- Nassau Card -->
<div class="bg-surface-container-high rounded-lg p-5 relative overflow-hidden group">
<div class="flex justify-between mb-4">
<div>
<span class="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Nassau</span>
<h3 class="serif-text text-xl font-bold mt-2">Cypress Point GC</h3>
</div>
<div class="text-right">
<p class="text-[10px] text-on-surface-variant uppercase">Potential Win</p>
<p class="text-xl font-bold text-primary">$1,200</p>
</div>
</div>
<div class="grid grid-cols-3 gap-2 py-3 border-t border-outline-variant/10">
<div class="text-center">
<p class="text-[10px] text-on-surface-variant uppercase">Front 9</p>
<p class="font-bold text-on-surface">2 UP</p>
</div>
<div class="text-center border-x border-outline-variant/10">
<p class="text-[10px] text-on-surface-variant uppercase">Back 9</p>
<p class="font-bold text-on-surface">E</p>
</div>
<div class="text-center">
<p class="text-[10px] text-on-surface-variant uppercase">Overall</p>
<p class="font-bold text-tertiary">3 UP</p>
</div>
</div>
<div class="flex items-center justify-between mt-4">
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-surface-container-high bg-surface-variant overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Portrait of a professional golfer in high-end athletic wear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAWmox-K-GyxgxvEnOZaaqmj1dIA2ZgPbFJ4IAtJcWljLJ9xYNm5qNSyAtTXSyW0KhDW_llT1cgMv43iClQXZzK5tNkSd8GkGLgkDUm6qTdpvngAUlx8guN422chZiH8bkftA6v7jzD1xBB98lfzG8aSQgzYgHn6MlJp4ciAxAYekch3yFA7aaNi7FL84SImVVF5j6fgB-Ylk0ZkjcJw4LmeTnZ3iHIdTK-84pxd8ux98ysxNZW45TdRsN9TJOEYuSFJt8DwDd23w"/>
</div>
<div class="w-8 h-8 rounded-full border-2 border-surface-container-high bg-surface-variant overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Portrait of a male golf club member in a private club atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDrWwj1uLcbVm_I_rMXo24bNmPvyuxnabTkVDvWrVI-JqmsKjx94i9LsMXX7NtnULKfv3-thkRDN4nDTBGNSc7hB1Dmw1JBsqtyGFX6WslcdvCL3qTlJId9nHngRwnZwfwF1-CR3X9r6mo6gYNMKbGptPE9H3QUzvJ8ViXsUZPgLrWcAeh2XGXP_LHi7W7NESS-4kMMOOtPoiTwHtRz-WlAVD511_pz983m-q_eFMKcuELfJGcRFwtq-QGPn9Doj_D2W9mfXLH9jY"/>
</div>
</div>
<p class="text-[10px] uppercase tracking-widest text-on-surface-variant">Thru Hole 14</p>
</div>
</div>
<!-- Skins Card -->
<div class="bg-surface-container-high rounded-lg p-5 border-l-2 border-tertiary/40">
<div class="flex justify-between items-start">
<div>
<span class="bg-tertiary/20 text-tertiary text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Skins Game</span>
<h3 class="serif-text text-xl font-bold mt-2">The Rivieria CC</h3>
</div>
<div class="bg-surface-container-lowest p-2 rounded text-center min-w-[80px]">
<p class="text-[10px] text-on-surface-variant uppercase">Carry Over</p>
<p class="text-lg font-bold text-tertiary">$450</p>
</div>
</div>
<div class="mt-4 flex items-center gap-2">
<div class="h-1 flex-1 bg-outline-variant/20 rounded-full overflow-hidden">
<div class="h-full bg-tertiary w-3/4"></div>
</div>
<p class="text-[10px] text-on-surface-variant">HOLE 17</p>
</div>
</div>
</div>
</section>
<!-- Settlement Ledger -->
<section class="pb-12">
<h2 class="serif-text text-2xl font-bold text-on-surface mb-4">Recent Ledger</h2>
<div class="bg-surface-container-low rounded-lg overflow-hidden">
<!-- Transaction Item 1 -->
<div class="flex items-center justify-between p-4 bg-surface-container/30">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="keyboard_double_arrow_up">keyboard_double_arrow_up</span>
</div>
<div>
<p class="font-bold text-sm">Settled: Wolf Round</p>
<p class="text-[10px] text-on-surface-variant uppercase">Oct 12 • vs Thompson, Miller</p>
</div>
</div>
<div class="text-right">
<p class="font-bold text-primary">+$850.00</p>
<p class="text-[8px] uppercase tracking-widest text-primary/60">Cleared</p>
</div>
</div>
<!-- Transaction Item 2 -->
<div class="flex items-center justify-between p-4">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded bg-error-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-error" data-icon="keyboard_double_arrow_down">keyboard_double_arrow_down</span>
</div>
<div>
<p class="font-bold text-sm">Settled: Skins</p>
<p class="text-[10px] text-on-surface-variant uppercase">Oct 10 • Pine Valley</p>
</div>
</div>
<div class="text-right">
<p class="font-bold text-error">-$200.00</p>
<p class="text-[8px] uppercase tracking-widest text-on-surface-variant">Cleared</p>
</div>
</div>
<!-- Transaction Item 3 -->
<div class="flex items-center justify-between p-4 bg-surface-container/30">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="keyboard_double_arrow_up">keyboard_double_arrow_up</span>
</div>
<div>
<p class="font-bold text-sm">Settled: Side Bet</p>
<p class="text-[10px] text-on-surface-variant uppercase">Oct 08 • Longest Drive</p>
</div>
</div>
<div class="text-right">
<p class="font-bold text-primary">+$50.00</p>
<p class="text-[8px] uppercase tracking-widest text-primary/60">Cleared</p>
</div>
</div>
</div>
<button class="w-full text-center py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant hover:text-primary transition-colors">
                View Full Statement
            </button>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full bg-emerald-950/80 backdrop-blur-2xl z-50 rounded-t-lg shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex justify-around items-center px-4 pb-6 pt-2">
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="golf_course">golf_course</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Play</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Rank</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-400 border-t-2 border-amber-600 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="payments" style="font-variation-settings: 'FILL' 1;">payments</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Bets</span>
</a>
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors tap-highlight-none active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold">Profile</span>
</a>
</nav>
</body></html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sticks - Play</title>
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
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #101511;
        }
        .serif-hero { font-family: 'Newsreader', serif; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface antialiased min-h-screen pb-32">
<!-- TopAppBar -->
<header class="bg-emerald-950/70 backdrop-blur-3xl fixed top-0 w-full z-50 shadow-[0_8px_24px_rgba(0,56,37,0.4)]">
<div class="flex items-center justify-between px-6 h-16 w-full">
<div class="flex items-center gap-3">
<img alt="User Avatar" class="w-8 h-8 rounded-full bg-surface-container-high object-cover" data-alt="Close-up profile avatar of a sophisticated golfer in a high-end locker room setting with warm wood textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZQWSSwGBrVnEGafB2fzowtljFtY_XMyfQHR1Pej2TZXriPYKiS371uo8ITGujnoZTb6gPQDRaiEWiUqjDiwyxOt2KEEt8QYr138FU3lqDXEKVI5MZm4uxjqMpa6JuAXk6niGoL7cCCKuvz6GjuMIXJ4Okeonbg1YILwrc3DiTvbauICwD6lVQScCJyyWDD5tYHaz60J_4VN325HXo-nNP3jpcfq-Z20FrZroGw4UsQhLArQWFJJbeVUykG6200naTqbHVVnaowEQ"/>
</div>
<h1 class="font-['Newsreader'] tracking-[0.2em] uppercase text-2xl font-bold text-emerald-50">STICKS</h1>
<div class="flex items-center text-emerald-400">
<span class="material-symbols-outlined hover:opacity-80 transition-opacity cursor-pointer" data-icon="notifications">notifications</span>
</div>
</div>
</header>
<main class="pt-24 px-6 max-w-5xl mx-auto space-y-8">
<!-- Hero Section: Featured Recommendation -->
<section class="relative rounded-lg overflow-hidden h-[400px] flex items-end p-8 group shadow-2xl">
<div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
<img alt="Course View" class="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105" data-alt="Lush green golf fairway winding through ancient oak trees at sunrise with misty atmospheric morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJtc__EnNMRMvY-2pHVIRevRW2FeTTeZxp9ZKWrVnNSTbbCbLpp12GdyBp2O5JKxcL6rIMiql3LPRtgxVdnGLiv3v8WQrhkNmSAwdrbM-2gK8zZi-zG24KbuP3bIIL1ehytHFQzUxVh7vdjkhiXmcNzaKGa9PRgR9gpi29Gpig3PbFD2ZYH20i8Ug45cz1rf7-JgyMRRWfjk3_s_kE-27lIfAJxPaao_ds29-mtA2ghNpCY7DZ-qO51wXWpLurHO0PD5hV9in5KvA"/>
<div class="relative z-20 w-full">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div class="space-y-2">
<span class="text-secondary font-label text-xs tracking-widest uppercase flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Near your current location
                        </span>
<h2 class="serif-hero text-4xl md:text-5xl font-bold text-on-surface leading-tight max-w-xl">The Reserve at Cypress Point</h2>
<p class="text-on-surface-variant max-w-sm">Championship layout • 12 miles away • 4.9 rating</p>
</div>
<button class="bg-gradient-to-tr from-primary-container to-primary text-on-primary px-8 py-4 rounded-lg font-label font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-all active:scale-95 shadow-lg">
                        Start a New Round
                    </button>
</div>
</div>
</section>
<!-- Quick-Start Bento Grid -->
<section>
<div class="flex items-baseline justify-between mb-6">
<h3 class="serif-hero text-2xl font-semibold">Game Modes</h3>
<span class="text-on-surface-variant font-label text-xs uppercase tracking-widest">Select Format</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<!-- Stroke Play -->
<div class="bg-surface-container-low p-8 rounded-lg flex flex-col justify-between h-48 hover:bg-surface-container transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-secondary text-3xl" data-icon="score">score</span>
<div>
<h4 class="font-headline text-xl mb-1">Stroke Play</h4>
<p class="text-on-surface-variant text-sm">Classic individual score tracking</p>
</div>
</div>
<!-- Match Play -->
<div class="bg-surface-container-low p-8 rounded-lg flex flex-col justify-between h-48 hover:bg-surface-container transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-secondary text-3xl" data-icon="swords">swords</span>
<div>
<h4 class="font-headline text-xl mb-1">Match Play</h4>
<p class="text-on-surface-variant text-sm">Hole-by-hole competitive faceoff</p>
</div>
</div>
<!-- Tournament Search -->
<div class="bg-surface-container-low p-8 rounded-lg flex flex-col justify-between h-48 border-2 border-primary/10 hover:border-primary/30 transition-all cursor-pointer group">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="trophy">trophy</span>
<div>
<h4 class="font-headline text-xl mb-1">Tournament Search</h4>
<p class="text-on-surface-variant text-sm">Find local events &amp; club opens</p>
</div>
</div>
</div>
</section>
<!-- Booked Tee Times -->
<section class="pb-12">
<div class="flex items-baseline justify-between mb-6">
<h3 class="serif-hero text-2xl font-semibold">Upcoming Tee Times</h3>
<button class="text-primary font-label text-xs uppercase tracking-widest hover:underline transition-all">View All</button>
</div>
<div class="space-y-4">
<!-- Tee Time Card 1 -->
<div class="flex items-center gap-6 p-6 bg-surface-container-low rounded-lg relative overflow-hidden">
<div class="flex flex-col items-center justify-center bg-surface-container-high w-20 h-20 rounded-lg shrink-0">
<span class="text-secondary font-label text-xs uppercase font-bold">Oct</span>
<span class="text-on-surface text-2xl font-headline font-bold">24</span>
</div>
<div class="flex-grow">
<h4 class="font-headline text-lg font-bold">Oakmont Country Club</h4>
<div class="flex gap-4 mt-1 text-on-surface-variant text-sm">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-xs" data-icon="schedule">schedule</span> 08:30 AM
                            </span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-xs" data-icon="group">group</span> 4 Players
                            </span>
</div>
</div>
<div class="flex flex-col items-end gap-2">
<span class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
<span class="text-on-surface-variant text-xs">Carts Reserved</span>
</div>
</div>
<!-- Tee Time Card 2 (Secondary Style) -->
<div class="flex items-center gap-6 p-6 bg-surface-container-low rounded-lg opacity-70">
<div class="flex flex-col items-center justify-center bg-surface-container-high w-20 h-20 rounded-lg shrink-0">
<span class="text-secondary font-label text-xs uppercase font-bold">Oct</span>
<span class="text-on-surface text-2xl font-headline font-bold">28</span>
</div>
<div class="flex-grow">
<h4 class="font-headline text-lg font-bold">Spyglass Hill Golf Course</h4>
<div class="flex gap-4 mt-1 text-on-surface-variant text-sm">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-xs" data-icon="schedule">schedule</span> 11:15 AM
                            </span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-xs" data-icon="group">group</span> 2 Players
                            </span>
</div>
</div>
<div class="flex flex-col items-end gap-2">
<span class="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full bg-emerald-950/80 backdrop-blur-2xl z-50 rounded-t-lg shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
<div class="flex justify-around items-center px-4 pb-6 pt-2 h-16 md:h-20">
<!-- Home -->
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors group" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold mt-1">Home</span>
</a>
<!-- Play (ACTIVE) -->
<a class="flex flex-col items-center justify-center text-emerald-400 border-t-2 border-amber-600 pt-2 active:scale-90 duration-200 group" href="#">
<span class="material-symbols-outlined" data-icon="golf_course">golf_course</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold mt-1">Play</span>
</a>
<!-- Rank -->
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors group" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold mt-1">Rank</span>
</a>
<!-- Bets -->
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors group" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold mt-1">Bets</span>
</a>
<!-- Profile -->
<a class="flex flex-col items-center justify-center text-emerald-100/40 pt-2 hover:text-emerald-200 transition-colors group" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-['Manrope'] text-[10px] uppercase tracking-wider font-bold mt-1">Profile</span>
</a>
</div>
</nav>
</body></html>